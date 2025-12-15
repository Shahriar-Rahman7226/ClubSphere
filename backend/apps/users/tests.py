from rest_framework.test import APITestCase
from rest_framework import status
from apps.users.models import User
from apps.university.models import University
from django.contrib.auth.hashers import make_password


class UserRegistrationCreateTests(APITestCase):

    def setUp(self):
        # Creating a temporary University for FK
        self.university = University.objects.create(
            title="North South University",
            logo="",
            email_domain="@northsouth.edu"
        )
        self.university_uuid = str(self.university.id)

        # URL endpoint for user registration
        self.url = "/users/user-registration/"

        self.valid_payload = {
            "university": self.university_uuid,
            "first_name": "Shafil",
            "last_name": "Ahmed",
            "institution_id": "2032219045",
            "email": "shafil.ahmed@northsouth.edu",
            "additional_email": "",
            "phone_number": "01700000000",
            "department": "Computer Science & Engineering",
            "description": "A passionate student interested in software engineering and campus activities.",
            "gender": "MALE",
            "DOB": "2001-05-18",
            "blood_group": "O+",
            "password": "StrongPass@12345"
        }

    # Test 1: Successful user creation
    def test_create_user_success(self):
        response = self.client.post(self.url, data=self.valid_payload, format="multipart")

        # Printing response in terminal
        print("\n=== SUCCESS TEST RESPONSE ===")
        print(response.data)
        print("=============================")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["message"], "User created successfully")

        user = User.objects.filter(email=self.valid_payload["email"]).first()
        self.assertIsNotNone(user)
        self.assertEqual(str(user.university.id), self.university_uuid)
        self.assertNotEqual(user.password, self.valid_payload["password"])

    
    # Test 2: Duplicate email should fail
    def test_create_user_duplicate_email(self):
        # Creating a user with the same email
        User.objects.create(
            university=self.university,
            first_name="Shahriar",
            last_name="Ahmed",
            institution_id="2132218064",
            email="shafil.ahmed@northsouth.edu",
            additional_email="",
            phone_number="01799999999",
            department="Computer Science & Engineering",
            password=make_password("HelloWorld12345")
        )

        response = self.client.post(self.url, data=self.valid_payload, format="multipart")

        # Printing response for visibility in terminal
        print("\n=== DUPLICATE EMAIL TEST RESPONSE ===")
        print(response.data)
        print("====================================")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["message"], "Email is already in use.")


# Output shown in VS Code Terminal

# === DUPLICATE EMAIL TEST RESPONSE ===
# {'message': 'Email is already in use.'}
# ====================================
# .
# === SUCCESS TEST RESPONSE ===
# {'message': 'User created successfully'}
# =============================
# .
# ----------------------------------------------------------------------
# Ran 2 tests in 1.682s

# OK
# Destroying test database for alias 'default'...
