from django.shortcuts import render
from rest_framework.views import APIView
from .models import Books
from .serializers import BookSerializer
from rest_framework.response import Response

# Create your views here.
class BooksView(APIView):
    def get(self, request):
        data = Books.objects.all()
        serializer = BookSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)