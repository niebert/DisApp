# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_questions', '0007_auto_20160626_0755'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='answers',
            name='a_type',
        ),
        migrations.RemoveField(
            model_name='questionanswermapping',
            name='answer',
        ),
        migrations.AddField(
            model_name='questionanswermapping',
            name='answer_text',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Answers',
        ),
        migrations.DeleteModel(
            name='AnswerType',
        ),
    ]
