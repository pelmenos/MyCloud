from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Recipe, Folders, Files

User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token


class UserSerializer(ModelSerializer):
    password2 = serializers.CharField(max_length=100)

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('Password must be more than 8')
        return value

    def validate_username(self, value):
        if len(value) < 6:
            raise serializers.ValidationError('Username must be more than 6')
        return value

    class Meta:
        model = User
        fields = '__all__'


class FolderSerializer(ModelSerializer):
    class Meta:
        model = Folders
        fields = '__all__'
    

class FileSerializer(ModelSerializer):
    name = serializers.CharField(source='filename', read_only=True)
    size = serializers.CharField(source='file.size', read_only=True)

    def create(self, validated_data):
        files_data = self.context.get('view').request.FILES.getlist('files')
        user = self.context.get('view').request.user
        parent = self.context.get('view').request.query_params.get('parent') or None
        files = []

        for file_data in files_data:
            file = Files.objects.create(file=file_data, user=user, parent_id=parent)
            if parent:
                file.parent.size += file.file.size
                file.parent.save()
            files.append(file)
        return file


    class Meta:
        model = Files
        fields = '__all__'



class RecipeSerializer(ModelSerializer):

    class Meta:
        model = Recipe
        fields = '__all__'


