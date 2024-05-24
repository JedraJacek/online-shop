from ....models import Cart
from ....serializers import *
from rest_framework.response import Response
from rest_framework import generics, status
from backend.ApiResponse import *

class removeFromCart(generics.CreateAPIView):
    def post(self,request):
        try:
            request = request.data
            data = Cart.objects.filter(user_pk = request.get('user_pk'), product_pk = request.get('product_pk'))
            data.delete()

            return ApiResponse.ok("Object deleted from cart")
        except:
            return ApiResponse.notFound("Object not found")