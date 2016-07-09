# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_questions', '0010_auto_20160626_1750'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersanswers',
            name='questionnaire',
            field=models.ForeignKey(to='user_questions.Questions'),
        ),
    ]
