from django.views.decorators.csrf import csrf_exempt
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

    @csrf_exempt
    def post(self, request, action):
        if action == "validate-admin-password":
            password = request.data.get("password")
            return Utils.validate_admin_page_password(password)
        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)
