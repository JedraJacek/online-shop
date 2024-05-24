from rest_framework.views import APIView
from ....models import Books
from ....serializers import BookSerializer
from backend.ApiResponse import *
from rest_framework import generics

class getBookView(generics.CreateAPIView):
    def post(self, request):
        try:
            data = Books.objects.get(pk = request.data.get("pk"))
            serializer = BookSerializer(data, context={'request':request}, many=False)
            
            return ApiResponse.ok(serializer.data)
        except:
            return ApiResponse.notFound("Book does not exist")
    