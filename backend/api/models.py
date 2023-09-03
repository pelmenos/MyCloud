import os

from django.contrib.auth import get_user_model
from django.db import models
from django.dispatch import receiver

User = get_user_model()


def user_directory_path(instance, filename):
    url = [f'{filename}']

    if instance.parent:
        folder = instance.parent
        url.insert(0, f'{folder.name}')
        while folder.parent:
            folder = folder.parent
            url.insert(0, f'{folder.name}')

    url.insert(0, f'user_{instance.user.id}')
    url = '/'.join(url)

    return url


class Files(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    file = models.FileField(upload_to=user_directory_path, blank=True)
    created_at = models.DateField(auto_now_add=True)
    parent = models.ForeignKey('Folders', on_delete=models.CASCADE, null=True)

    def filename(self):
        return os.path.basename(self.file.name)

    def __str__(self):
        return self.filename()


@receiver(models.signals.post_delete, sender=Files)
def auto_delete_file_on_delete(sender, instance, **kwargs):

    if instance.file:
        if instance.parent:
            instance.parent.size -= instance.file.size
            instance.parent.save()
        if os.path.isfile(instance.file.path):
            os.remove(instance.file.path)


class Folders(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('Folders', on_delete=models.CASCADE, null=True)
    created_at = models.DateField(auto_now_add=True)
    size = models.IntegerField(default=0)


class Recipe(models.Model):
    name = models.CharField(max_length=100)
