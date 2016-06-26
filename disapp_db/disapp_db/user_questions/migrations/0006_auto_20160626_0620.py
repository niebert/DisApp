# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_questions', '0005_auto_20160626_0618'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='questionnaire',
            unique_together=set([('questionnaire', 'language')]),
        ),
        migrations.AlterUniqueTogether(
            name='questions',
            unique_together=set([('questionnaire', 'question_id')]),
        ),
    ]
