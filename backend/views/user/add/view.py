from backend.models import Users
from backend.serializers import UserSerializer
from rest_framework import generics
from backend.ApiResponse import *


class RegisterUser(generics.CreateAPIView):
    def post(self, request):
        try:
            data = Users.objects.get(login = request.data.get('login'))
            return ApiResponse.forbidden("User istnieje")
        except:
            data = UserSerializer(data=request.data)
            if data.is_valid():
                data.save()
                return ApiResponse.ok("Stworzono Usera")
            else:
                return ApiResponse.badRequest("You failed")
            