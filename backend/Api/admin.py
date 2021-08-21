from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'description', 'isCompleted', 'createdAt']
    ordering = ['-createdAt']
    search_fields = ('user', 'title', 'description', 'isCompleted', 'createdAt')

admin.site.register(Task, TaskAdmin)