from django.shortcuts import render
from rest_framework.views import APIView
from .models import Books, Cart
from .serializers import BookSerializer, CartSerializer
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