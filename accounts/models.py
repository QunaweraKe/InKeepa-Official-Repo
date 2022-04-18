from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.functional import cached_property

from phonenumber_field.modelfields import PhoneNumberField

from accounts.managers import CustomUserManager

# Create your models here.


class User(AbstractUser):
    is_nursery = models.BooleanField(default=False)

    email = models.EmailField(unique=True)

    # Optional fields
    full_name = models.CharField(max_length=100, null=True, blank=True)
    username = models.CharField(max_length=100, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    first_name = None
    last_name = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name", "username"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "ADMIN"
