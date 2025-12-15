from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.users.models import User

class LoginAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='StrongPassword123'
        )
        self.login_url = reverse('login')

    def test_login_successful(self):
        data = {
            'email': 'testuser@example.com',
            'password': 'StrongPassword123'
        }
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['detail'], 'Login successful')
        self.assertEqual(str(self.user.id), response.data['user_id'])

    def test_login_invalid_credentials(self):
        data = {
            'email': 'testuser@example.com',
            'password': 'WrongPassword'
        }
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['message'], 'Invalid Email or Password')
