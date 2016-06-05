from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
from jsonfield import JSONField

class AppUser(User):
    mobile_gcm_code = models.TextField(blank=True)
    imei_number = models.CharField(max_length=50, blank=True)
    device_details = JSONField(blank=True,null=True)
    location = models.CharField(max_length=128, blank=True, null=True)

