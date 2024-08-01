from django.contrib import admin

from .models import Counter


class CounterAdmin(admin.ModelAdmin):
    list_filter = ["value"]


admin.site.register(Counter, CounterAdmin)
