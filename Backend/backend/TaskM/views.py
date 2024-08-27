from django.shortcuts import render
from django.db import transaction
from rest_framework import viewsets
from .serializers import TaskSerializer
from .models import Task
import time



class TaskView(viewsets.ModelViewSet):
    queryset=Task.objects.all()
    serializer_class=TaskSerializer 

    def get_queryset(self):
        return Task.objects.all()   
    
    def perform_update(self, serializer):
        with transaction.atomic():

            task = Task.objects.select_for_update().get(pk=serializer.instance.pk)
            # serializer.update(task, serializer.validated_data)
            time.sleep(1) 
            serializer.save()
          