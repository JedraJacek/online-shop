from django.shortcuts import render
from rest_framework.views import APIView
from .models import Cart, Books
from .serializers import *
from rest_framework.response import Response
from rest_framework import generics, status

class CartView(APIView):
    def get(self, request):
        data_with_related = Cart.objects.select_related("product_pk").all()
        serializer = CartSerializer(data_with_related, context={'request': request}, many=True)

        return Response(serializer.data)
    
class updateCart(generics.CreateAPIView):
    def post(self, request):
        request = request.data
        try:
            cart = Cart.objects.get(user_pk = request.get("user_pk"), product_pk = request.get("product_pk"))
            cart.count = request.get("count")
            cart.save()
            return Response({'success': 'Zaktualizowano koszyk'}, status=status.HTTP_200_OK)
        except:
            Books.objects.get(pk = request.get('product_pk'))
            data = CartAddSerializer(data=request)
            if data.is_valid():
                data.save()
            return Response({'success': 'Dodano do koszyka'}, status=status.HTTP_200_OK)
            
          
        
class removeFromCart(generics.CreateAPIView):
    def post(self,request):
        try:
            request = request.data
            data = Cart.objects.filter(user_pk = request.get('user_pk'), product_pk = request.get('product_pk'))
            data.delete()

            return Response({'success': 'Object deleted from Cart'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Object not found'}, status=status.HTTP_400_BAD_REQUEST)