from backend.models import Users
from rest_framework import generics
from backend.ApiResponse import *

        
class DeleteUser(generics.CreateAPIView):
    def post(self,request):
        try:
            data = Users.objects.filter(pk = request.data.get('pk'))
            data.delete()

            return ApiResponse.ok('Deleted user')
        except:
            return ApiResponse.notFound('User nor found')