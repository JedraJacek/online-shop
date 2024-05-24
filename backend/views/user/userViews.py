from django.shortcuts import render
from rest_framework.views import APIView
from ...models import Users
from ...serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import generics, status

class UserView(APIView):
    def get(self, request):
        data = Users.objects.all()
        serializer = UserSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    
class LoginUser(generics.CreateAPIView):
    def post(self, request):
        try:
            Users.objects.get(login = request.data.get('login'), password = request.data.get('password'))
            return Response({'success': 'user found'},status=status.HTTP_200_OK)
        except:
            return Response({'error': 'user not found'}, status=status.HTTP_401_UNAUTHORIZED)
        
class getUser(generics.CreateAPIView):
    def get(self, request):
        try:
            data = Users.objects.get(login = request.data.get('login'))
            return Response(data, context={'request': request}, many = False)
        except:
            return Response({'error': 'user not found'}, status=status.HTTP_401_UNAUTHORIZED)


