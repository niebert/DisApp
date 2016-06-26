# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_questions', '0009_auto_20160626_1748'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questiontype',
            name='q_type',
            field=models.CharField(unique=True, max_length=255, blank=True),
        ),
    ]
