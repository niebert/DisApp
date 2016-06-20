# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_questions', '0002_auto_20160619_1053'),
    ]

    operations = [
        migrations.AddField(
            model_name='language',
            name='language_id',
            field=models.IntegerField(default=1),
        ),
    ]
