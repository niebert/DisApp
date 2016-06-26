# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('user_questions', '0004_auto_20160619_1320'),
    ]

    operations = [
        migrations.CreateModel(
            name='UsersAnswers',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.RenameField(
            model_name='questionnaire',
            old_name='language_id',
            new_name='language',
        ),
        migrations.RenameField(
            model_name='questions',
            old_name='questionnaire_id',
            new_name='questionnaire',
        ),
        migrations.RemoveField(
            model_name='questionnaire',
            name='questionnaire_id',
        ),
        migrations.AddField(
            model_name='questionanswermapping',
            name='answer_order_number',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='questionnaire',
            name='created_on',
            field=models.DateTimeField(default=datetime.datetime(2016, 6, 26, 6, 18, 15, 368255, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='questionnaire',
            name='last_modified',
            field=models.DateTimeField(default=datetime.datetime(2016, 6, 26, 6, 18, 26, 718983, tzinfo=utc), auto_now=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='questionnaire',
            name='questionnaire',
            field=models.CharField(default=-1, max_length=56),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usersanswers',
            name='answer',
            field=models.ForeignKey(to='user_questions.QuestionAnswerMapping'),
        ),
        migrations.AddField(
            model_name='usersanswers',
            name='questionnaire',
            field=models.ForeignKey(to='user_questions.Questionnaire'),
        ),
    ]
