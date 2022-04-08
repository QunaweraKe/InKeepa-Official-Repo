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
    CategoryAPIView,
    SearchListAPIView,
    filter_all,
    filter_max_price,
    filter_min_price,
)


urlpatterns = [
    path("api/price/filterall/<int:minprice>/<int:maxprice>/", filter_all),
    path("api/price/minprice/<int:minprice>/", filter_min_price),
    path("api/price/maxprice/<int:maxprice>/", filter_max_price),
    path("api/search/", SearchListAPIView.as_view()),
    path("api/category/", CategoryAPIView.as_view()),
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
