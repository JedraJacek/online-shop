from django.shortcuts import render
from rest_framework.views import APIView
from ....models import Cart, Books
from ....serializers import *
from rest_framework.response import Response
from rest_framework import generics, status

class removeFromCart(generics.CreateAPIView):
    def post(self,request):
        try:
            request = request.data
            data = Cart.objects.filter(user_pk = request.get('user_pk'), product_pk = request.get('product_pk'))
            data.delete()

            return Response({'success': 'Object deleted from Cart'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Object not found'}, status=status.HTTP_400_BAD_REQUEST)