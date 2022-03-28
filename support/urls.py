from django.urls import path


from support.views import SalesAPIView, HelpAPIView

urlpatterns = [
    path("api/salesapi/", SalesAPIView.as_view(), name="sales_view"),
    path("api/helpapi/", HelpAPIView.as_view(), name="help_view"),
]
