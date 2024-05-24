from ....models import Cart, Books
from ....serializers import *
from rest_framework.response import Response
from rest_framework import generics, status
from backend.ApiResponse import *

class updateCart(generics.CreateAPIView):
    def post(self, request):
        request = request.data
        try:
            cart = Cart.objects.get(user_pk = request.get("user_pk"), product_pk = request.get("product_pk"))
            cart.count = request.get("count")
            cart.save()
            return ApiResponse.ok("Cart updated")
        except:
            try:
                Books.objects.get(pk = request.get('product_pk'))
                data = CartAddSerializer(data=request)
                if data.is_valid():
                    data.save()
                    return ApiResponse.ok("Added to cart")
                return ApiResponse.badRequest("Bad request")
            except:
                return ApiResponse.notFound("Product not found")