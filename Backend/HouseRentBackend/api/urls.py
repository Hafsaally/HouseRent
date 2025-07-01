from django.urls import path
from myapp import views

urlpatterns = [
    # Example URL patterns
    path('customer/', views.manage_customer),
    path('customer/<int:id>/', views.manage_customer),

    path('property/', views.manage_property),
    path('property/<int:id>/', views.manage_property),

    path('booking/', views.manage_booking),
    path('booking/<int:id>/', views.manage_booking),

    path('review/', views.manage_review),
    path('review/<int:id>/', views.manage_review),

    path('notification/', views.manage_notification),
    path('notification/<int:id>/', views.manage_notification),


]
