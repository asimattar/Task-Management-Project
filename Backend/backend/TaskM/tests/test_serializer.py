from rest_framework.test import APITestCase
from rest_framework.exceptions import ValidationError
from TaskM.models import Task
from TaskM.serializers import TaskSerializer


class TaskSerializerTest(APITestCase):


    def setUp(self):
          self.task = Task.objects.create(
            title='Test Task',
            description='Test Description',
            completed=False
        )
          self.valid_data={
               'title':'Updated Task',
               'description':'Updated Description',
               'completed':True
          }
          self.serializer = TaskSerializer(instance=self.task)

    def test_serialization(self):
         data=self.serializer.data
         self.assertEqual(data['id'],self.task.id)
         self.assertEqual(data['title'],'Test Task')
         self.assertEqual(data['description'],'Test Description')
         self.assertEqual(data['completed'],False)

    def test_deserialization(self):
         serializer=TaskSerializer(data=self.valid_data)
         self.assertTrue(serializer.is_valid())
         updated_task=serializer.save()
         self.assertEqual(updated_task.title,'Updated Task')
         self.assertEqual(updated_task.description,'Updated Description')
         self.assertTrue(updated_task.completed)