# -*- coding: utf-8 -*-
"""
Created on 26th June 2016
"""

from flask import Flask, request, session
from flask import current_app as app
from flask.ext import restful

from django import db
from django.db import close_old_connections
from disapp_service.utils.auth import get_user
from disapp_db.user_questions.models import (AppUser, Questionnaire,
                                 Questions, QuestionType, QuestionAnswerMapping)
from django.core.exceptions import ObjectDoesNotExist
#import pdb

def handle_request(questionnaire_id,language):
    """
      This method is used to get all questions and answers for a particular questionnaire
    """
    try:
        questions_list = []
        try:
            questions = Questions.objects.filter(questionnaire__questionnaire=questionnaire_id)
        except ObjectDoesNotExist:
            app.logger.debug('No questions found for this questionnaire or no questionnaire present or questionnaire archived')
            return {
                'success': False,
                'errorMessage': 'Not found',
                'errorCode': 404
            }
        #pdb.set_trace()
        try:
            questions_list = []
            for each in questions:
                q_dict = {}
                q_dict['id'] = each.id
                q_dict['name'] = each.question_text
                q_dict['type'] = each.q_type.q_type
                questions_list.append(q_dict)
        except Exception as e:
            app.logger.debug(e)
            return{
                'success': False,
                'errorCode': 500,
                'errorMessage': 'Internal Server Error'
             }
 
        final_q_list = []
        for q_dict in questions_list:
            try:
                oam = QuestionAnswerMapping.objects.filter(question__id=q_dict['id']) \
                                                    .order_by('answer_order_number')
#                app.logger.debug(oam.__dict__)
            except Exception as e:
                app.logger.debug(e)
                app.logger.debug('Error in getting answers')
                continue                

            q_dict['answers'] = []
            for a in oam:
                q_dict['answers'].append(str(a.answer_text))
            
            final_q_list.append(q_dict)

        return {
            'success': True,
            'questionnaire': final_q_list
        }

    except Exception as e:
        app.logger.debug(e)
        return{
            'success': False,
            'errorCode': 500,
            'errorMessage': 'Internal Server Error'
        }

    finally:
        close_old_connections()

if __name__ == "__main__":
    handle_request("Q1","en")
