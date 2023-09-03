from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
from api.exceptions import SamePassword


class CustomUserManager(BaseUserManager):
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError(_("The username must be set"))
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):
        return self.create_user(username, password, **extra_fields)

    def create(self, username, password, password2, **extra_fields):
        if password != password2:
            raise SamePassword()
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

