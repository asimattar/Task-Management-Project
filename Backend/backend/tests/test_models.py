from django.test import TestCase
from TaskM.models import Task

class TaskModelTests(TestCase):
    def setUp(self):
        self.task = Task.objects.create(
            title='Test Task',
            description='Test Description',
            completed=False
        )
    
    def test_task_creation(self):
        task = Task.objects.get(id=self.task.id)
        self.assertEqual(task.title, 'Test Task')
        self.assertEqual(task.description, 'Test Description')
        self.assertFalse(task.completed)

    def test_str_method(self):
        self.assertEqual(str(self.task), 'Test Task')