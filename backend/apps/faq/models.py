from django.db import models
from abstract.base_model import CustomModel


class FAQ(CustomModel):
    question = models.TextField(blank=True, null=True)
    answer = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'faq'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.question if self.question else ''}"
