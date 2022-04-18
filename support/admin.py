from django.contrib import admin

from support.models import Help, Sales


@admin.register(Help)
class HelpAdmin(admin.ModelAdmin):
    model = Help
    list_display = (
        "resolved",
        "orderId",
        "sender",
        "subject",
        "description",
    )


@admin.register(Sales)
class SalesAdmin(admin.ModelAdmin):
    model = Sales
