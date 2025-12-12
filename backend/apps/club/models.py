from django.db import models
from abstract.base_model import CustomModel
from apps.university.models import University
from apps.users.models import User


class Club(CustomModel):
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name='club_university')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='club_admin')
    title = models.CharField(max_length=150, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    logo = models.ImageField(upload_to='clubs/logos/', blank=True, null=True)
    banner = models.ImageField(upload_to='clubs/banners/', blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    class Meta:
        db_table = 'club'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title if self.title else ''}" 


class ClubReview(CustomModel):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='review_club')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='review_user')
    rating = models.PositiveSmallIntegerField(default=1)
    remarks = models.TextField(blank=True, null=True)
    is_anonymous = models.BooleanField(default=False)

    class Meta:
        db_table = 'club_review'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.club.title if self.club else ''} ({self.rating if self.rating else ''}) by {self.user.first_name if self.user.first_name else 'Anonymous'}"
