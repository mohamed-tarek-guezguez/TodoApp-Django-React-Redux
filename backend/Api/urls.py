from django.urls import path
from . import views

urlpatterns = [
    path('user/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/register/', views.registerUser, name='registerUser'),

    path('task-list/', views.taskList, name='task-list'),
    path('task-details/<str:pk>/', views.taskDetails, name='task-details'),

    path('task-create/', views.tastCreate, name='task-create'),
    path('task-update/<str:pk>/', views.taskUpdate, name='task-update'),
    path('task-delete/<str:pk>/', views.taskDelete, name='task-delete'),
]
