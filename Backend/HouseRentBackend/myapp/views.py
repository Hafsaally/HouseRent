from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import *
from .serializers import *

class PropertyListCreate(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

class PropertyRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

# Create your views here.


def generic_api(model_class, serializer_class):
    @api_view(['GET','POST', 'DELETE', 'PUT'])



    def api(request, id = None):
        if request.method == 'GET':
            if id:
                try:
                    instance = model_class.objects.get(id = id)
                    serializer = serializer_class(instance)
                    return Response(serializer.data)
                except model_class.DoesNotExist:
                    return Response({'message':'Object Not Found'}, status=status.HTTP_404_NOT_FOUND)
            else:
                instance = model_class.objects.all()
                serializer = serializer_class(instance, many = True)
                return Response(serializer.data)

        elif request.method == 'POST':
            serializer = serializer_class(data=request.data)
            if serializer.is_valid():
                    serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Success
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # If serializer is invalid


        elif request.method == 'DELETE':
            if id:
                try:
                    instance = model_class.objects.get(id = id)
                    instance.delete()
                    return Response({'message':'Delete Successfully'})
                except model_class.DoesNotExist:
                    return Response({'message':'Object Not Found'}, status=status.HTTP_404_NOT_FOUND)
                

        elif request.method == 'PUT':
            if id:
                try:
                    instance = model_class.objects.get(id=id)
                    serializer = serializer_class(instance, data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                    return Response(serializer.data)
                
                        
                except model_class.DoesNotExist:
                    return Response({'message': 'Object not found'}, status=status.HTTP_404_NOT_FOUND)

    return api



manage_customer = generic_api(Customer, CustomerSerializer)

manage_property = generic_api(Property, PropertySerializer)

manage_booking = generic_api(Booking, BookingSerializer)

manage_review = generic_api(Review, ReviewSerializer)

manage_notification = generic_api(Notification, NotificationSerializer)

