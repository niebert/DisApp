from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
from jsonfield import JSONField

class AppUser(User):
    mobile_gcm_code = models.TextField(blank=True)
    imei_number = models.CharField(max_length=50, blank=True)
    device_details = JSONField(blank=True,null=True)
    location = models.CharField(max_length=128, blank=True, null=True)
    language_id = models.ForeignKey('Language',default=1)


class Language(models.Model):
    language_id = models.IntegerField(default=1,unique=True)
    language = models.CharField(max_length=50)
    

class Questionnaire(models.Model):
    questionnaire_id = models.CharField(unique=True,max_length=56)
    name = models.CharField(max_length=255)
    is_archived = models.BooleanField(default=False)
    language_id = models.ForeignKey('Language',default=1)


class Questions(models.Model):
    questionnaire_id = models.ForeignKey('Questionnaire')
    question_id = models.CharField(max_length=56)
    question_text = models.TextField()
    q_type = models.ForeignKey('QuestionType')
    
    class meta:
        unique_together = ('questionnaire_id','question_id',)


class Answers(models.Model):
    answer_text = models.TextField()
    a_type = models.ForeignKey('AnswerType')


class QuestionType(models.Model):
    q_type = models.CharField(blank=True,max_length=255)


class AnswerType(models.Model):
    a_type = models.CharField(blank=True,max_length=255)


class QuestionAnswerMapping(models.Model):
    question = models.ForeignKey('Questions')
    answer = models.ForeignKey('Answers')

