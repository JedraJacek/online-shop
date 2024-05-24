from rest_framework.views import APIView
from ....models import Books
from ....serializers import BookSerializer
from backend.ApiResponse import *

class BookView(APIView):
    def get(self, request):
        data = Books.objects.all()
        serializer = BookSerializer(data, context={'request': request}, many=True)

        return ApiResponse.ok(serializer.data)