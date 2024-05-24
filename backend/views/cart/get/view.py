from rest_framework.views import APIView
from ....models import Cart
from ....serializers import *
from rest_framework.response import Response
from backend.ApiResponse import *

class CartView(APIView):
    def get(self, request):
        data_with_related = Cart.objects.select_related("product_pk").all()
        serializer = CartSerializer(data_with_related, context={'request': request}, many=True)

        return ApiResponse.ok(serializer.data)