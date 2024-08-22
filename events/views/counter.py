from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views import View

from ..models import Counter


class IncrementCounterView(View):
    def post(self, request, pk):
        counter = get_object_or_404(Counter, pk=pk)
        counter.value += 1
        counter.save()
        return JsonResponse({"value": counter.value})

    def get(self, request, pk):
        counter = get_object_or_404(Counter, pk=pk)
        return JsonResponse({"value": counter.value})
