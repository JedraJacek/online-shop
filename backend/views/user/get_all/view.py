from rest_framework.views import APIView
from backend.models import Users
from backend.serializers import UserSerializer
from backend.ApiResponse import *

class UserView(APIView):
    def get(self, request):
        data = Users.objects.all()
        serializer = UserSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    