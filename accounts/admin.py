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

    def delete_selected_account(modeladmin, request, queryset):
        queryset.update(is_active=False)

    delete_selected_account.short_description = "Delete Account"

    def get_actions(self, request):
        actions = super(CustomUserAdmin, self).get_actions(request)
        if request.user.is_superuser != False:
            del actions["delete_selected"]
        return actions

    # list_filter = (("is_superuser", admin.EmptyFieldListFilter),)

    list_display = (
        "email",
        "username",
        "full_name",
        "is_active",
        "created_on",
        "last_login",
    )
    actions = ["delete_selected_account"]
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

    readonly_fields = (
        "email",
        "username",
        "full_name",
        "created_on",
        "last_login",
    )


admin.site.register(Customer, CustomerAdmin)


class DeletedAccounts(User):
    class Meta:
        proxy = True
        verbose_name_plural = "INACTIVE/DELETED"


class DeletedAdmin(CustomUserAdmin):
    def get_queryset(self, request):
        qs = super(CustomUserAdmin, self).get_queryset(request)
        return qs.filter(is_active=False)

    def has_add_permission(self, request, obj=None):
        return False

    readonly_fields = (
        "email",
        "username",
        "full_name",
        "created_on",
        "last_login",
    )
    list_display = (
        "email",
        "username",
        "full_name",
        "is_active",
        "created_on",
        "last_login",
        "is_staff",
        "is_superuser",
    )


admin.site.register(DeletedAccounts, DeletedAdmin)
