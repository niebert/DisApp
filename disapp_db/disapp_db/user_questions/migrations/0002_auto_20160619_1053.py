# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_questions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answers',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('answer_text', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='AnswerType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('a_type', models.CharField(max_length=255, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('language', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='QuestionAnswerMapping',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('answer', models.ForeignKey(to='user_questions.Answers')),
            ],
        ),
        migrations.CreateModel(
            name='Questionnaire',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('questionnaire_id', models.CharField(unique=True, max_length=56)),
                ('name', models.CharField(max_length=255)),
                ('is_archived', models.BooleanField(default=False)),
                ('language_id', models.ForeignKey(default=1, to='user_questions.Language')),
            ],
        ),
        migrations.CreateModel(
            name='Questions',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('question_id', models.CharField(max_length=56)),
                ('question_text', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='QuestionType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('q_type', models.CharField(max_length=255, blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='questions',
            name='q_type',
            field=models.ForeignKey(to='user_questions.QuestionType'),
        ),
        migrations.AddField(
            model_name='questions',
            name='questionnaire_id',
            field=models.ForeignKey(to='user_questions.Questionnaire'),
        ),
        migrations.AddField(
            model_name='questionanswermapping',
            name='question',
            field=models.ForeignKey(to='user_questions.Questions'),
        ),
        migrations.AddField(
            model_name='answers',
            name='a_type',
            field=models.ForeignKey(to='user_questions.AnswerType'),
        ),
        migrations.AddField(
            model_name='appuser',
            name='language_id',
            field=models.ForeignKey(default=1, to='user_questions.Language'),
        ),
    ]
