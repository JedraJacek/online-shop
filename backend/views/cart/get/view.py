from django.shortcuts import render
from rest_framework.views import APIView
from ....models import Cart, Books
from ....serializers import *
from rest_framework.response import Response
from rest_framework import generics, status

class CartView(APIView):
    def get(self, request):
        data_with_related = Cart.objects.select_related("product_pk").all()
        serializer = CartSerializer(data_with_related, context={'request': request}, many=True)

        return Response(serializer.data)