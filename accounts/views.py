from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from accounts.serializers import (
    UserSignUpSerializer,
    UserDetailSerializer,
    UserDeactivateSerializer,
)

# Create your views here.


class UserDetailAPIView(RetrieveUpdateAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def get_object(self):
        return self.request.user


class UserDeactivateAPIView(RetrieveUpdateAPIView):
    serializer_class = UserDeactivateSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def get_object(self):
        return self.request.user

    def put(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid() and self.get_object().is_active:
            serializer.update(self.get_object(), serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserSignInAPIView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            cred_login = request.data.get("login")
            cred_password = request.data.get("password")
            remember_Me = request.data.get("remember_me")
            user = authenticate(request, login=cred_login, password=cred_password)

            if user is not None:
                if not remember_Me:
                    request.session.set_expiry(0)
            serializer.validated_data.update({"user": user})
            return Response(
                serializer.validated_data,
            )

        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class UserSignUpAPIView(APIView):
    serializer_class = UserSignUpSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            response_data = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": serializer.data,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserSignOutAPIView(APIView):
    def post(self, request, format=None):
        try:
            refresh_token = request.data.get("refresh_token")
            token_obj = RefreshToken(refresh_token)
            token_obj.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
