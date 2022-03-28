from rest_framework import serializers
from support.models import Help, Sales


class HelpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Help
        fields = (
            "name",
            "email",
            "subject",
            "description",
        )


class SalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sales
        fields = "__all__"
