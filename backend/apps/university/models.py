from django.db import models
from abstract.base_model import CustomModel

# Create your models here.
class University(CustomModel):
    title = models.CharField(max_length=128, blank=True, null=True)
    logo = models.ImageField(upload_to='university/', blank=True, null=True)
    email_domain = models.CharField (max_length=50, blank=True, null=True)

    class Meta:
        db_table = 'university'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title if self.title else ''}" 