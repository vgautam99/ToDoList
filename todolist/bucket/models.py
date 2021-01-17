from datetime import datetime

from django.db import models


class Buckets(models.Model):
    bucket_name = models.CharField(max_length=20, unique=True, blank=False, primary_key=True)
    created_by = models.CharField(max_length=20, blank=False)
    created_on = models.DateTimeField(default=datetime.now())


class Lists(models.Model):
    list_topic = models.TextField(max_length=50, blank=False)
    bucket_name = models.ForeignKey(Buckets, on_delete=models.CASCADE)
    created_by = models.CharField(max_length=20, blank=False)
    created_on = models.DateTimeField(default=datetime.now())
    status = models.CharField(max_length=20, default='ToDo')
