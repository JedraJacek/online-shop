from rest_framework.response import Response
from rest_framework import status

class ApiResponse:
    def ok(data):
        return Response(data=data, status=status.HTTP_200_OK)
    
    def notFound(data):
        return Response(data=data, status=status.HTTP_404_NOT_FOUND)
    
    def badRequest(data):
        return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
    
    def unauthorized(data):
        return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)

    def forbidden(data):
        return Response(data=data, status=status.HTTP_403_FORBIDDEN)

    def internalServerError(data):
        return Response(data=data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)