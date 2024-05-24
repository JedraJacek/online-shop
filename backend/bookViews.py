from rest_framework.views import APIView
from .models import Books
from .serializers import BookSerializer
from rest_framework.response import Response
from rest_framework import status

class BookView(APIView):
    def get(self, request):
        data = Books.objects.all()
        serializer = BookSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    
class getBookView(APIView):
    def get(self, request):
        data = Books.objects.get(pk = request.data.get('pk'))
        serializer = BookSerializer(data, context={'request':request})
        
        return Response(serializer.data)