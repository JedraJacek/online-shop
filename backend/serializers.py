from rest_framework import serializers
from .models import Books, Cart, Users


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Books
        fields = ("pk", "title", "author", "price","stock","image","pages","year","description","language","country")

class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = ("pk","user_pk","count")

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ("pk","login","password","first_name","last_name")