from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
from jsonfield import JSONField
from datetime import datetime

class AppUser(User):
    mobile_gcm_code = models.TextField(blank=True)
    imei_number = models.CharField(max_length=50, blank=True)
    device_details = JSONField(blank=True,null=True)
    location = models.CharField(max_length=128, blank=True, null=True)
    language = models.ForeignKey('Language',default=1)


class Language(models.Model):
    language_id = models.IntegerField(default=1,unique=True)
    language = models.CharField(max_length=50)
    

class Questionnaire(models.Model):
    questionnaire = models.CharField(max_length=56)
    name = models.CharField(max_length=255)
    is_archived = models.BooleanField(default=False)
    language = models.ForeignKey('Language',default=1)
    created_on = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
  
    class Meta:
        unique_together = ('questionnaire','language',)


class Questions(models.Model):
    questionnaire = models.ForeignKey('Questionnaire')
    question_id = models.CharField(max_length=56)
    question_text = models.TextField()
    q_type = models.ForeignKey('QuestionType')
    
    class Meta:
        unique_together = ('questionnaire','question_id',)


#class Answers(models.Model):
#    answer_text = models.TextField()
#    a_type = models.ForeignKey('AnswerType')


class QuestionType(models.Model):
    q_type = models.CharField(blank=True,max_length=255,unique=True)


#class AnswerType(models.Model):
#    a_type = models.CharField(blank=True,max_length=255)

class QuestionAnswerMapping(models.Model):
    question = models.ForeignKey('Questions')
    answer_order_number = models.IntegerField(default=1)
    answer_text = models.TextField(blank=True)


class UsersAnswers(models.Model):
    user = models.ForeignKey(User, null = True)
    question = models.ForeignKey('Questions')
    answer = models.ForeignKey('QuestionAnswerMapping', null = True)
    answer_text = models.TextField(null = True, blank = True, default = "")
    created_on = models.DateTimeField(auto_now_add=True)
