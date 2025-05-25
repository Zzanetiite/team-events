from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from ..utils import Utils


class SecurityView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, action):
        if action == "get-csrf-token":
            return Utils.get_csrf_token(request)
        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)
