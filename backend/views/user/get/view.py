from backend.models import Users
from backend.ApiResponse import *
from rest_framework import generics
from backend.serializers import *

class getUser(generics.CreateAPIView):
    def get(self, request):
        try:
            data = Users.objects.get(login = request.data.get('login'))
            serializers = UserSerializer(data, context={'request':request})

            return ApiResponse.ok(serializers.data)
        except:
            return ApiResponse.notFound("User nor found")