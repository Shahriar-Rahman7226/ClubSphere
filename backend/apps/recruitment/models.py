from django.db import models
from abstract.base_model import CustomModel
from apps.club.models import Club

class Recruitment(CustomModel):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='recruitment_club')
    title = models.CharField(max_length=150, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    semester = models.CharField(max_length=50, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    form_link = models.URLField(blank=True, null=True)

    class Meta:
        db_table = 'recruitment'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title if self.title else ''} - {self.club.title if self.club else ''}"
