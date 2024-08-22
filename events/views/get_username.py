from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class GetUsernameView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_authenticated:
            return Response({"username": request.user.username}, status=200)
        else:
            return Response({"error": "User is not authenticated."}, status=401)
