from django.shortcuts import render
from rest_framework.views import APIView
from ....models import Cart, Books
from ....serializers import *
from rest_framework.response import Response
from rest_framework import generics, status

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