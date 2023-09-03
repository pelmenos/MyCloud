import os
from tokenize import TokenError

from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import Http404
from rest_framework import status, viewsets
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.parsers import MultiPartParser, FileUploadParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .exceptions import InvalidUser
from .models import Files, Folders, user_directory_path
from .serializers import UserSerializer, MyTokenObtainPairSerializer, FolderSerializer, FileSerializer


User = get_user_model()


def get_tokens_for_user(user):
    refresh = MyTokenObtainPairSerializer.get_token(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except AuthenticationFailed as e:
            raise InvalidUser()
        except TokenError as e:
            raise InvalidToken()

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class GetUser(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class RegisterUser(APIView):
    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response(tokens, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


class FolderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        parent = request.query_params.get('parent') or None
        folders = user.folders_set.filter(parent_id=parent).all()
        serializer = FolderSerializer(folders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = FolderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FolderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Folders.objects.get(pk=pk)
        except Folders.DoesNotExist:
            raise Http404

    def patch(self, request, pk, format=None):
        folder = self.get_object(pk)
        serializer = FolderSerializer(folder, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        folder = self.get_object(pk)

        files_in = folder.files_set.all()
        for file in files_in:
            file.delete()

        folders_in = folder.folders_set.all()
        for folder_in in folders_in:
            self.delete(request, folder_in.id)

        try:
            os.rmdir(settings.MEDIA_ROOT + '/' + user_directory_path(folder, folder.name))
        except FileNotFoundError:
            pass
        folder.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FilesViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]
    serializer_class = FileSerializer
    queryset = Files.objects.all()

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(user=self.request.user, parent_id=self.request.query_params.get('parent') or None)
        return query_set

