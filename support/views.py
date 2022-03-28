from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
)
from rest_framework.permissions import AllowAny

from support.serializers import HelpSerializer, SalesSerializer


class HelpAPIView(CreateAPIView):
    serializer_class = HelpSerializer
    permission_classes = (AllowAny,)


class SalesAPIView(CreateAPIView):
    serializer_class = SalesSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
