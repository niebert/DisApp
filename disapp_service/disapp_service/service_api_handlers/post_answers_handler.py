'''
Created on 9th july 2016
'''

from flask import Flask, request, session
from flask import current_app as app
from flask.ext import restful

from django import db
from django.db import close_old_connections
from django.contrib.auth.models import User
from disapp_service.utils.auth import get_user
from disapp_db.user_questions.models import (Questionnaire,
             QuestionAnswerMapping, Questions, UsersAnswers, Language)

def handle_request(data):
    """
      Log the user data
    """
    try:
        try:
            lang = str(data.get('language','en'))
            questionnaire_id = str(data.get('questionnaire_id',''))
            a_list = data.get('answer_list',[])
        except Exception as e:
            app.logger.debug(e)
            return {
                'success': False,
                'errorMessage': 'Incomplete parameter list',
                'errorCode': 422
            }

        try:
            language = Language.objects.get(language=lang)
            questionnaire = Questionnaire.objects.get(questionnaire=questionnaire_id,language=language)
        except Exception as e:
            app.logger.debug(e)
            return {
                'success': False,
                'errorMessage': 'Resource Not Found',
                'errorCode': 404
            }

        try:
            ques = Questions.objects.filter(questionnaire=questionnaire)
        except Exception as e:
            app.logger.debug(e)
            return {
                'success': False,
                'errorMessage': 'Resource Not Found',
                 'errorCode': 404
            }
        try:
            user = get_user()
        except:
            #default user will be suraj in case of any problems to avoid data loss
            user = User.objects.get(email="surajshah525@gmail.com")
            print "Logged in used not found while trying to record user response"


        flag = False
        for each in a_list:
            try:
                field, value = each.items()[0]
                each_question = ques.get(question_id=str(field))
                for every in value:
                    qa_map = QuestionAnswerMapping.objects.filter(question=each_question,answer_text=str(every))[0]
                    UsersAnswers.objects.create(user=user,question=each_question,answer=qa_map)
            except Exception as e:
                app.logger.debug(e)
                app.logger.debug('Could not log answers for question_id:'+str(each_question.id))
                flag = True
            
        if not flag:
            return {
                'success': True,
                'message': 'Data logged successfully',
                'partial_failure': False
            }
        else:
            return {
                'success': True,
                'message': 'Data logged successfully',
                'partial_failure': True
            }
            
    except Exception as e:
        app.logger.debug(e)
        return {
            'success': False,
            'errorMessage': 'Internal Server Error',
            'errorCode': 500
            }
    finally:
        close_old_connections()
