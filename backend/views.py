from django.shortcuts import render
from rest_framework.views import APIView
from .models import Books, Cart, Addresses
from .serializers import BookSerializer, CartSerializer, AddressSerializer
from rest_framework.response import Response

class BooksView(APIView):
    def get(self, request):
        data = Books.objects.all()
        serializer = BookSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    
class CartView(APIView):
    def get(self, request):
        data = Cart.objects.all()
        serializer = CartSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    
class AddressView(APIView):
    def get(self, request):
        data = Addresses.objects.all()
        serializer = AddressSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)