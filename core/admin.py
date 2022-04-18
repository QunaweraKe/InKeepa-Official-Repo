from django.contrib import admin
import datetime
from django.db import models
from django.forms import TextInput, Textarea
from core.models import Shop, Item, Cart, Order, Category
from django.contrib.auth.models import Group
from django.contrib import messages


admin.site.unregister(Group)


@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "added_on", "user")


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    def get_actions(self, request):
        actions = super(ItemAdmin, self).get_actions(request)
        if request.user.is_superuser != False:
            del actions["delete_selected"]
        return actions

    def get_queryset(self, request):
        qs = super(ItemAdmin, self).get_queryset(request)
        return qs.filter(soft_delete=False)

    def delete_selected_post(modeladmin, request, queryset):
        queryset.update(soft_delete=True)

    delete_selected_post.short_description = "Delete Selected Post(s)"

    def make_unavailable_selected_post(modeladmin, request, queryset):
        queryset.update(available=False)

    make_unavailable_selected_post.short_description = "Make Item(s) Unavailable"

    def make_available_selected_post(modeladmin, request, queryset):
        queryset.update(available=True)
        messages.success(request, "Selected Items Made Available.")

    make_available_selected_post.short_description = "Make Item(s) Available"
    search_fields = ("name", "description")
    formfield_overrides = {
        models.CharField: {"widget": Textarea(attrs={"rows": 5, "cols": 60})},
    }

    list_display = (
        "id",
        "category_id",
        "name",
        "short_description",
        "image",
        "price",
        "available",
        "on_offer",
        "shop",
        "added_by",
        "added_on",
        "updated_on",
    )
    actions = [
        "delete_selected_post",
        "make_unavailable_selected_post",
        "make_available_selected_post",
    ]

    def save_model(self, request, obj, change, form):
        obj.user = request.user
        return super(ItemAdmin, self).save_model(request, obj, form, change)


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "get_items",
        "added_on",
        "total_ammount",
    )

    def get_items(self, obj):
        return list(obj.all_items) if obj.all_items.exists() else "Not Added Item"

    get_items.short_description = "Item"


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    def get_actions(self, request):
        actions = super(OrderAdmin, self).get_actions(request)
        if request.user.is_superuser != False:
            del actions["delete_selected"]
        return actions

    list_display = (
        "id",
        "get_items",
        "orders_count",
        "total_ammount",
        "table_id",
        "is_active",
        "user",
        "status",
        "added_on",
    )

    readonly_fields = ("is_active",)
    search_fields = [
        "id",
    ]

    def get_items(self, obj):
        return list(obj.all_items)

    get_items.short_description = "Items"

    actions = ["cancel_requests"]


class OrdersToday(Order):
    class Meta:
        proxy = True
        verbose_name_plural = "Orders Today"


class OrdersByDay(OrderAdmin):
    def get_queryset(self, request):
        today = datetime.date.today()

        qs = super(OrderAdmin, self).get_queryset(request)
        return qs.filter(added_on__gt=today, is_active=True, status=0)

    def accept_requests(modeladmin, request, queryset):
        queryset.update(status=1)

    def cancel_requests(modeladmin, request, queryset):
        queryset.update(status=2)

    cancel_requests.short_description = "Cancel Request(s)"
    accept_requests.short_description = "Accept Request(s)"
    list_editable = ("status",)
    actions = ["accept_requests", "cancel_requests"]

    def has_add_permission(self, request, obj=None):
        return False


admin.site.register(OrdersToday, OrdersByDay)


class OrdersRequestedCancellation(Order):
    class Meta:
        proxy = True
        verbose_name_plural = "Cancel Requests"


class OrdersRequested(OrderAdmin):
    def get_queryset(self, request):
        qs = super(OrderAdmin, self).get_queryset(request)
        return qs.filter(is_active=False, status=0)

    def cancel_requests(modeladmin, request, queryset):
        queryset.update(status=2)

    cancel_requests.short_description = "Cancel Request(s)"

    actions = [
        "cancel_requests",
    ]

    def has_add_permission(self, request, obj=None):
        return False


admin.site.register(OrdersRequestedCancellation, OrdersRequested)


class CancelledOrders(Order):
    class Meta:
        proxy = True
        verbose_name_plural = "Cancelled Orders"


class OrdersCancelled(OrderAdmin):
    def get_queryset(self, request):
        qs = super(OrderAdmin, self).get_queryset(request)
        return qs.filter(status=2)

    readonly_fields = [
        "status",
    ]

    def has_add_permission(self, request, obj=None):
        return False


admin.site.register(CancelledOrders, OrdersCancelled)


class AcceptedOrders(Order):
    class Meta:
        proxy = True
        verbose_name_plural = "Accepted Orders"


class OrdersAccepted(OrderAdmin):
    def get_queryset(self, request):
        qs = super(OrderAdmin, self).get_queryset(request)
        return qs.filter(status=1, is_active=True)

    def has_add_permission(self, request, obj=None):
        return False


admin.site.register(AcceptedOrders, OrdersAccepted)
