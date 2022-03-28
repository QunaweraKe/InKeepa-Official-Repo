from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from accounts.models import User_Address

User = get_user_model()
# Register your models here.


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ("email", "username", "full_name", "is_nursery", "created_on")
    list_display_links = ("email", "username")
    fields = (
        "email",
        "username",
        "full_name",
        "is_nursery",
        "is_active",
        "is_staff",
        "user_permissions",
    )
    fieldsets = None


@admin.register(User_Address)
class AddressAdmin(admin.ModelAdmin):
    model = User_Address
