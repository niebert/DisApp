# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_questions', '0003_language_language_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='language',
            name='language_id',
            field=models.IntegerField(default=1, unique=True),
        ),
    ]
