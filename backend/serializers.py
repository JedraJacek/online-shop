from rest_framework import serializers
from .models import Books, Cart, Addresses


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Books
        fields = ("pk", "title", "author", "price","stock","image","pages","year","description","language","country")

class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = ("pk","product_pk","user_pk","count")


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Addresses
        fields = ("pk","line1","line2","city","zip_code","user_pk")