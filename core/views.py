# from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
    RetrieveUpdateAPIView,
    ListAPIView,
    CreateAPIView,
)

from accounts.permissions import IsNursery, IsOwner
from core.models import Shop, Item, Order
from core.serializers import (
    ShopSerializer,
    ItemSerializer,
    CartSerializer,
    OrderSerializer,
)

# Create your views here.
class CategoryAPIView(APIView):
    serializer_class = ItemSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        category_data = request.data
        category = category_data["category"]
        qs = Item.objects.filter(category__iexact=category)
        serializer = ItemSerializer(qs, many=True)
        return Response(serializer.category_data)


class OffersAPIView(ListAPIView):
    queryset = Item.objects.filter(
        soft_delete=False, offers=True, available=True
    ).order_by("-added_on")
    serializer_class = ItemSerializer
    permission_classes = (permissions.IsAuthenticated,)


class CartRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    """
    /api/me/cart [GET, PUT]
    """

    serializer_class = CartSerializer
    permission_classes = (
        IsAuthenticated,
        IsOwner,
    )

    def get_object(self):
        return self.request.user.cart


class OrdersListAPIView(ListAPIView):
    """
    /api/me/orders [GET]
    """

    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get_queryset(self):
        return self.request.user.orders.all().order_by("added_on")


class OrderCreateAPIView(CreateAPIView):
    """
    /api/me/order/create [POST]
    """

    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)


class OrderRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    """
    Cancel the order or Detail the order
    /api/me/order/<id> [GET,POST,]
    """

    serializer_class = OrderSerializer
    permission_classes = (
        IsAuthenticated,
        IsOwner,
    )

    def get_queryset(self):
        return self.request.user.orders.all()


class NurseryOrdersListAPIView(ListAPIView):
    """
    /api/nursery/orders [GET]
    """

    serializer_class = OrderSerializer
    permission_classes = (
        IsAuthenticated,
        IsNursery,
    )

    def get_queryset(self):
        return Order.objects.filter(items__user=self.request.user).distinct()


class ShopsListAPIView(ListAPIView):
    """
    /api/shops [GET]
    """

    serializer_class = ShopSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Shop.objects.all()


class ShopsCreateAPIView(CreateAPIView):
    """
    /api/shop/create [POST]
    """

    serializer_class = ShopSerializer
    permission_classes = (IsAuthenticated, IsNursery)


class ShopRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    /api/shop [GET, PUT, DELETE]
    """

    serializer_class = ShopSerializer
    permission_classes = (IsAuthenticated, IsOwner, IsNursery)
    queryset = Shop.objects.all()


class ItemsListAPIView(ListAPIView):
    """
    /api/items [GET]
    """

    serializer_class = ItemSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Item.objects.filter(soft_delete=False).order_by("-added_on")


class ItemsCreateAPIView(CreateAPIView):
    """
    /api/item/create [POST]
    """

    serializer_class = ItemSerializer
    permission_classes = (IsAuthenticated, IsNursery)


class ItemRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    /api/item [GET, PUT, DELETE]
    """

    serializer_class = ItemSerializer
    permission_classes = (IsAuthenticated, IsOwner, IsNursery)
    queryset = Item.objects.all()
