from tabnanny import verbose
from django.contrib.auth import get_user_model
from django.db import models
from django.core.validators import RegexValidator

User = get_user_model()


class Sales(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField(max_length=240)
    description = models.CharField(max_length=1500, editable=False)
    regex_val = RegexValidator(regex=r"^\+?1?\d{9,15}$")
    phone_number = models.CharField(validators=[regex_val], max_length=17, blank=False)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Sales"


class Help(models.Model):
    sender = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    subject = models.CharField(max_length=150)
    description = models.CharField(max_length=1500)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Help"
