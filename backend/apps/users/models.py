from django.contrib.auth.models import PermissionsMixin, BaseUserManager, AbstractBaseUser
from django.db import models
from abstract.base_model import CustomModel
from external.choice_tuple import USER_ROLES, GENDER, BLOOD_GROUPS
from  apps.university.models import University


# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, phone_number=None, password=None, *args, **kwargs):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, phone_number=phone_number)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, phone_number=None, *args, **kwargs):
        user = self.create_user(email=email, password=password, phone_number=phone_number)
        user.is_superuser = True
        user.user_role = USER_ROLES[0][0]
        user.is_staff = True
        user.first_name = 'Shahriar'
        user.last_name = 'Rahman'
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, CustomModel, PermissionsMixin):
    university = models.ForeignKey(University, related_name='user_university', on_delete=models.CASCADE, blank=True, null=True)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    institution_id = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(blank=True, null=True, unique=True)
    additional_email = models.EmailField(blank=True, null=True)
    password = models.CharField(max_length=128, blank=True, null=True)
    user_role = models.CharField(max_length=50, blank=True, null=True, choices=USER_ROLES)

    department = models.CharField(max_length=128, blank=True, null=True)
    description = models.TextField(blank=True, null=True) 
    DOB = models.DateField(blank=True, null=True)
    profile_image = models.ImageField(upload_to='users/', blank=True, null=True)
    gender = models.CharField (max_length=50, blank=True, null=True, choices=GENDER)
    blood_group = models.CharField (max_length=50, blank=True, null=True, choices=BLOOD_GROUPS)
    phone_number = models.CharField(max_length=20, blank=True, null=True, unique=True) 
    
    is_staff = models.BooleanField(default=False)
    two_factor = models.BooleanField(default=False)
    login_attempt = models.PositiveIntegerField(default=0, blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'user'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.first_name if self.first_name else ''} {self.last_name if self.last_name else ''} -- {self.email if self.email else ''} -- {self.user_role if self.user_role else ''}" 

