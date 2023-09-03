from rest_framework import status
from rest_framework.exceptions import APIException, AuthenticationFailed


class SamePassword(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = 'Passwords are not the same'
    default_code = 'Unauthorized'


class InvalidUser(AuthenticationFailed):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "Credentials is invalid or didn't match"
    default_code = 'user_credentials_not_valid'
