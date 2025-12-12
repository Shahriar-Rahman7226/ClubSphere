from django.db import models
from abstract.base_model import CustomModel
from apps.club.models import Club
from apps.users.models import User
from external.choice_tuple import CLUB_POSITIONS, ADDITIONAL_CLUB_POSITIONS, MEMBERSHIP_STATUS


class Membership(CustomModel):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='club_membership')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_membership')
    club_position = models.CharField(max_length=50, blank=True, null=True, choices=CLUB_POSITIONS) 
    additional_club_position = models.CharField(max_length=50, blank=True, null=True, choices=ADDITIONAL_CLUB_POSITIONS) 
    status = models.CharField(max_length=50, blank=True, null=True, choices=MEMBERSHIP_STATUS)
    recruitment_semester = models.CharField(max_length=50, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'membership'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.first_name if self.user else ''} {self.user.last_name if self.user else ''} - {self.club.title if self.club else ''}"
