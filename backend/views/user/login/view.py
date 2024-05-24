from backend.models import Users
from rest_framework import generics
from backend.ApiResponse import *

class LoginUser(generics.CreateAPIView):
    def post(self, request):
        try:
            Users.objects.get(login = request.data.get('login'), password = request.data.get('password'))
            return ApiResponse.ok("Logged in")
        except:
            return ApiResponse.notFound("User not found")