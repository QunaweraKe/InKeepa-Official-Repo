# from django.shortcuts import render
from rest_framework import filters
from http.client import HTTPResponse
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
from rest_framework import status

from accounts.permissions import IsNursery, IsOwner
from core.models import Shop, Item, Order
from core.serializers import (
    ShopSerializer,
    ItemSerializer,
    CartSerializer,
    OrderSerializer,
)

# TODO:Contains erros
class CategoryAPIView(APIView):
    serializer_class = ItemSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        category_data = request.data
        category = category_data["category__id"]
        qs = Item.objects.filter(category__iexact=category)
        serializer = ItemSerializer(qs, many=True)
        return Response(serializer.category_data)


class SearchListAPIView(ListAPIView):
    """
    /api/me/search [GET]
    """

    serializer_class = ItemSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.SearchFilter]
    search_fields = ("name", "description", "category__id")
    queryset = Item.objects.filter(soft_delete=False).order_by("-added_on")


def filter_min_price(request, min_price):
    try:
        items = Item.objects.filter(price__gte=min_price)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data, safe=False)


def filter_max_price(request, max_price):
    try:
        items = Item.objects.filter(price__lte=max_price)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data, safe=False)


def filter_all(request, max_price, min_price):
    try:
        items = Item.objects.filter(price__range=(max_price, min_price))
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data, safe=False)


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
    queryset = Item.objects.filter(soft_delete=False).order_by("-available")


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
