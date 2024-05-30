from django.urls import path
from taskmgt.views import list_tasks, add_task, edit_task, delete_task, get_task

urlpatterns = [
    path('tasks/', list_tasks, name='list_tasks'),
    path('tasks/<int:pk>/', get_task, name='get_task'),  
    path('tasks/add/', add_task, name='add_task'),
    path('tasks/<int:pk>/edit/', edit_task, name='edit_task'),
    path('tasks/<int:pk>/delete/', delete_task, name='delete_task'),
]

