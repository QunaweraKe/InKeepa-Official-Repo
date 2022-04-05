from rest_framework import serializers

from core.utils import total_ammount_calculator

from core.models import Shop, Item, Cart, Order


# Serializers


class ShopSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Shop
        fields = (
            "id",
            "name",
            "added_on",
            "user",
        )
        read_only_fields = (
            "id",
            "added_on",
            "user",
        )


class ItemSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    offerprice = serializers.IntegerField(required=False)

    class Meta:
        model = Item
        fields = (
            "category",
            "offers",
            "offerprice",
            "id",
            "name",
            "description",
            "price",
            "image",
            "shop",
            "added_on",
            "user",
            "available",
        )
        read_only_fields = ("id", "added_on", "user")


class CartSerializer(serializers.ModelSerializer):
    all_items = ItemSerializer(many=True, read_only=True)
    total_ammount = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ("items", "added_on", "total_ammount", "all_items")


class OrderSerializer(serializers.ModelSerializer):
    all_items = ItemSerializer(many=True, read_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Order
        fields = (
            "id",
            "table_id",
            "items",
            "added_on",
            "total_ammount",
            "user",
            "is_active",
            "all_items",
            "status",
        )
        read_only_fields = ("total_ammount",)

    # overrride the update method to change the active status of order
    def update(self, instance, validated_data):
        validated_data = {"is_active": validated_data.pop("is_active")}
        return super().update(instance, validated_data)

    # overrride the create method to add payment and other things
    def create(self, validated_data):
        items = self.validated_data.get("items")
        validated_data["total_ammount"] = total_ammount_calculator(items)
        return super().create(validated_data)
