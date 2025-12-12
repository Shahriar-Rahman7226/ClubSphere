from django.db import models
from abstract.base_model import CustomModel
from apps.club.models import Club  
from apps.users.models import User  
from external.choice_tuple import AUDIENCE

class Post(CustomModel):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='club_post')
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='clubs/posts/', blank=True, null=True)
    react_count = models.PositiveIntegerField(default=0)
    post_audience = models.CharField(max_length=50, blank=True, null=True,  choices=AUDIENCE) 

    class Meta:
        db_table = 'post'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title if self.title else ''}"