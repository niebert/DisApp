# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_questions', '0011_auto_20160709_0727'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usersanswers',
            old_name='questionnaire',
            new_name='question',
        ),
    ]
