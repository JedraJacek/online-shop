from django.shortcuts import render
from rest_framework.views import APIView
from .models import Cart, Books
from .serializers import CartSerializer, BookSerializer
from rest_framework.response import Response
from rest_framework import generics, status

class CartView(APIView):
    def get(self, request):
        data = Cart.objects.all()
        data_with_related = Cart.objects.select_related("product_pk").all()
        serializer = CartSerializer(data_with_related, context={'request': request}, many=True)

        return Response(serializer.data)
    
class addToCart(generics.CreateAPIView):
    def post(self, request):
        #try:
        b = Books.objects.get(pk = request.data.get("product_pk"))
        Cart.objects.create(user_pk = request.data.get('user_pk'), product_pk = b, count = request.data.get('count'))
        return Response({'success': b}, status=status.HTTP_200_OK)
        #except:
        #   return Response({'error': 'nie dodano przedmiotu/ow do koszyka'}, status=status.HTTP_400_BAD_REQUEST)
        
