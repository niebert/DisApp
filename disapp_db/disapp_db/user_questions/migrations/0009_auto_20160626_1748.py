# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_questions', '0008_auto_20160626_1747'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questionanswermapping',
            name='answer_text',
            field=models.TextField(blank=True),
        ),
    ]
