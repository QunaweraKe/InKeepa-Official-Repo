from django.urls import path

from django.urls import path, include

from core.views import (
    CartRetrieveUpdateAPIView,
    OrdersListAPIView,
    OrderCreateAPIView,
    OrderRetrieveUpdateAPIView,
    NurseryOrdersListAPIView,
    ShopsListAPIView,
    ShopsCreateAPIView,
    ShopRetrieveUpdateDestroyAPIView,
    ItemsListAPIView,
    ItemsCreateAPIView,
    ItemRetrieveUpdateDestroyAPIView,
)


urlpatterns = [
    path("api/me/cart/", CartRetrieveUpdateAPIView.as_view()),
    path("api/me/orders/", OrdersListAPIView.as_view()),
    path("api/me/order/create/", OrderCreateAPIView.as_view()),
    path("api/me/order/<uuid:pk>/", OrderRetrieveUpdateAPIView.as_view()),
    path("api/nursery/orders/", NurseryOrdersListAPIView.as_view()),
    path("api/shops/", ShopsListAPIView.as_view()),
    path("api/shop/create/", ShopsCreateAPIView.as_view()),
    path("api/shop/<int:pk>/", ShopRetrieveUpdateDestroyAPIView.as_view()),
    path("api/items/", ItemsListAPIView.as_view()),
    path("api/item/create/", ItemsCreateAPIView.as_view()),
    path("api/item/<int:pk>/", ItemRetrieveUpdateDestroyAPIView.as_view()),
]
