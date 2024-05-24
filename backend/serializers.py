from rest_framework import serializers
from .models import Books, Cart, Users


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Books
        fields = ("pk", "title", "author", "price","stock","image","pages","year","description","language","country")

class CartSerializer(serializers.ModelSerializer):
    product = BookSerializer(source = 'product_pk', read_only = True)

    class Meta:
        model = Cart
        fields = ("pk","product", "user_pk","count")

class CartAddSerializer(serializers.ModelSerializer):
    product_pk = serializers.PrimaryKeyRelatedField(read_only=False, queryset= Books.objects.all())
    user_pk = serializers.PrimaryKeyRelatedField(read_only=False, queryset=Users.objects.all())
    
    class Meta:
        model = Cart
        fields = ("pk","product_pk", "user_pk","count")

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ("pk","login","password","first_name","last_name")