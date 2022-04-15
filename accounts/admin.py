from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin


User = get_user_model()
# Register your models here.


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    def get_queryset(self, request):
        qs = super(CustomUserAdmin, self).get_queryset(request)
        return qs.filter(is_superuser=True, is_active=True)

    # list_filter = (("is_superuser", admin.EmptyFieldListFilter),)
    exclude = ("is_superuser", "is_staff")
    list_display = (
        "email",
        "username",
        "full_name",
        "created_on",
        "last_login",
    )
    list_display_links = ("email", "username")
    fields = (
        "email",
        "username",
        "full_name",
        "is_active",
        "is_staff",
        "user_permissions",
    )
    fieldsets = None


class Staff(User):
    class Meta:
        proxy = True
        verbose_name_plural = "STAFF"


class StaffAdmin(CustomUserAdmin):
    def get_queryset(self, request):
        qs = super(CustomUserAdmin, self).get_queryset(request)
        return qs.filter(is_active=True, is_superuser=False, is_staff=True)

    def has_add_permission(self, request, obj=None):
        return False


admin.site.register(Staff, StaffAdmin)


class Customer(User):
    class Meta:
        proxy = True
        verbose_name_plural = "CUSTOMERS"


class CustomerAdmin(CustomUserAdmin):
    def get_queryset(self, request):
        qs = super(CustomUserAdmin, self).get_queryset(request)
        return qs.filter(is_active=True, is_superuser=False, is_staff=False)

    def has_add_permission(self, request, obj=None):
        return False


admin.site.register(Customer, CustomerAdmin)
