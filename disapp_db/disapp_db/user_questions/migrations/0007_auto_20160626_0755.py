# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_questions', '0006_auto_20160626_0620'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appuser',
            old_name='language_id',
            new_name='language',
        ),
    ]
