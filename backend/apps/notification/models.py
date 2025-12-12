from django.db import models
from abstract.base_model import CustomModel
from apps.club.models import Club
from apps.users.models import User
from apps.event.models import Event
from apps.post.models import Post
from external.choice_tuple import AUDIENCE


class Notification(CustomModel):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='club_notification', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='user_notification')
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True, blank=True, related_name='event_notification')
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True, blank=True, related_name='post_notification')
    title = models.CharField(max_length=150, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    audience = models.CharField(max_length=50, blank=True, null=True, choices=AUDIENCE)
    
    class Meta:
        db_table = 'notification'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title if self.title else ''}"
