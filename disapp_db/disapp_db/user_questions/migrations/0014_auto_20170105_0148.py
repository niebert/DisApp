# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_questions', '0013_auto_20161230_1418'),
    ]

    operations = [
        migrations.AddField(
            model_name='usersanswers',
            name='answer_text',
            field=models.TextField(default='', null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='usersanswers',
            name='answer',
            field=models.ForeignKey(to='user_questions.QuestionAnswerMapping', null=True),
        ),
    ]
