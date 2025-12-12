from django.db import models
from abstract.base_model import CustomModel
from apps.club.models import Club  
from external.choice_tuple import AUDIENCE, EVENT_STATUS


class Event(CustomModel):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='club_event')
    title = models.CharField(max_length=150, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    start_time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)
    image = models.ImageField(upload_to='clubs/events/', blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    registration_link = models.URLField(blank=True, null=True)
    event_audience = models.CharField(max_length=50, blank=True, null=True,  choices=AUDIENCE) 
    status = models.CharField(max_length=50, blank=True, null=True,  choices=EVENT_STATUS) 

    class Meta:
        db_table = 'event'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title if self.title else ''} - {self.club.title if self.club else ''}"
