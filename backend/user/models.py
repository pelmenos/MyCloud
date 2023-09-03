from django.contrib.auth.base_user import AbstractBaseUser
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import capfirst, get_text_list
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=100, unique=True, error_messages={"unique": "User with this username is already exist"})
    disk_space = models.IntegerField(default=1024*3*10)
    used_space = models.IntegerField(default=0)
    avatar = models.ImageField(upload_to='avatars/', null=True)

    USERNAME_FIELD = 'username'

    objects = CustomUserManager()

    def __str__(self):
        return self.username


class Note(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    body = models.TextField()
