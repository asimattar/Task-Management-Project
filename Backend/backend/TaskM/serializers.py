from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields=('id','title','description','completed')


    def update(self, instance, validated_data):
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance