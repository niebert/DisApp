# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.conf import settings
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user_questions', '0012_auto_20160709_1750'),
    ]

    operations = [
        migrations.AddField(
            model_name='usersanswers',
            name='created_on',
            field=models.DateTimeField(default=datetime.datetime(2016, 12, 30, 14, 18, 58, 410062, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usersanswers',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True),
        ),
    ]
