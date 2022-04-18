from rest_framework import serializers
from support.models import Help, Sales


class HelpSerializer(serializers.ModelSerializer):
    orderId = serializers.CharField(required=False)

    class Meta:
        model = Help
        fields = (
            "subject",
            "description",
            "orderId",
        )


class SalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sales
        fields = "__all__"
