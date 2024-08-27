from rest_framework import status
from django.urls import reverse
import threading
from rest_framework.test import APITestCase
from TaskM.models import Task
from TaskM.serializers import TaskSerializer
import time
from threading import Event
from django.db import transaction

class TaskConcurrencyTest(APITestCase):

    def setUp(self):
        self.task = Task.objects.create(
            title='Concurrent Task',
            description='Task Description',
            completed=False
        )
        # self.list_url =reverse('task-list')
        # self.task.save()
        print(f"Created task with ID: {self.task.id}")
        self.detail_url = lambda pk: reverse('task-detail', kwargs={'pk': pk})
        self.update_started = Event()
        self.update_finished = Event()

    def test_update_task(self):
        data = {
            'title': 'Updated Task',
            'description': 'Updated Description',
            'completed': True
        }
        print(f"Updating task ID: {self.task.id}")
        assert Task.objects.filter(id=self.task.id).exists(), "Task not found in the database!"
        print(f"Resolved update URL: {self.detail_url(self.task.id)}")

        # time.sleep(0.1)
        
        self.update_started.set() 
        response = self.client.put(self.detail_url(self.task.id), data, format='json')
        self.update_finished.set() 
        print(f"Update response status: {response.status_code}")
        if hasattr(response, 'data'):
            print(f"Update response data: {response.data}")
        return response
    
    def test_get_task(self):
        self.update_started.wait()  

        print(f"Getting task ID: {self.task.id}")
        assert Task.objects.filter(id=self.task.id).exists(), "Task not found in the database!"
        print(f"Resolved get URL: {self.detail_url(self.task.id)}")

        response = self.client.get(self.detail_url(self.task.id))            
        print(f"Get response status: {response.status_code}")
        if hasattr(response, 'data'):
            print(f"Get response data: {response.data}")
        return response

    def test_concurrent_update_and_get_with_lock(self):
        update_thread=threading.Thread(target=self.update_task)
        get_thread=threading.Thread(target=self.get_task)

        update_thread.start()

        self.update_started.wait()

        get_thread.start()

        update_thread.join()
        get_thread.join()

        # response = self.get_task()

        self.task.refresh_from_db()
        self.assertEqual(self.task.title,'Updated Task')
        self.assertEqual(self.task.description,'Updated Description')
        self.assertTrue(self.task.completed)

