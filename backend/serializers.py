from rest_framework import serializers
from .models import Books, Cart


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Books
        fields = ("pk", "title", "author", "price","stock","image","pages","year","description","language","country")