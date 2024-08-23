from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from TaskM.models import Task
from TaskM.serializers import TaskSerializer

class TaskViewSetTest(APITestCase):


    def setUp(self):

        self.task1 =Task.objects.create(
            title='Test Task 1',
            description='Test Description',
            completed=False
        )

        self.task2 =Task.objects.create(
            title='Test Task 2',
            description='Test Description',
            completed=True
        )

        self.list_url =reverse('task-list')
        self.detail_url= lambda pk:reverse('task-detail',kwargs={'pk': pk})

    def test_list_tasks(self):
        response=self.client.get(self.list_url)
        tasks =Task.objects.all()
        serializer=TaskSerializer(tasks, many=True)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data,serializer.data)

    def test_retrieve_task(self):
        response=self.client.get(self.detail_url(self.task1.id))
        serializer=TaskSerializer(self.task1)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_create_tasks(self):
        data={
            'title':'New Task',
            'description':'New Description',
            'completed':True
        }    
        response=self.client.post(self.list_url,data,format='json')
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(),3)
        self.assertEqual(Task.objects.latest('id').title,'New Task')
        self.assertEqual(Task.objects.latest('id').description,'New Description')
        self.assertTrue(Task.objects.latest('id').completed)

    def test_update_task(self):
        data={
            'title':'Updated task',
            'description':'Updated Description',
            'completed':True
        }

        response=self.client.put(self.detail_url(self.task1.id),data,format='json')
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.task1.refresh_from_db()
        self.assertEqual(self.task1.title,'Updated task')
        self.assertEqual(self.task1.description,'Updated Description')
        self.assertTrue(self.task1.completed)


    def test_delete_task(self):
        response=self.client.delete(self.detail_url(self.task1.id))
        self.assertEqual(response.status_code,status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(),1)


