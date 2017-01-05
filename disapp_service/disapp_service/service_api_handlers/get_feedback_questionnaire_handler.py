"""
Created on 4th Jan 2017
"""

from flask import Flask, request, session
from flask import current_app as app
from flask.ext import restful

from django import db
from django.db import close_old_connections
from disapp_service.utils.auth import get_user
from disapp_db.user_questions.models import (AppUser, Questionnaire)
from django.core.exceptions import ObjectDoesNotExist

def handle_request():
    """
      This method is used to get feedback questionnaire
    """
    try:
        q_naire_list = []
        try:
            q_naire = Questionnaire.objects.filter(is_archived=False, questionnaire__regex=r'F[0-9]+').order_by('-created_on')
        except ObjectDoesNotExist:
            app.logger.debug('No feedback questionnaire found')
            return {
                'success': True,
                'questionnaire': q_naire_list,
                'message': 'No Active Feedback Questionnaires found'
            }

        try:
            for each in q_naire:
                q_dict = {}
                q_dict['id'] = each.questionnaire
                q_dict['name'] = each.name
                q_dict['language'] = each.language.language
                q_dict['created_on'] = str(each.created_on)
                q_naire_list.append(q_dict)

            return {
                'success': True,
                'questionnaire': q_naire_list
            }
        except Exception as e:
            app.logger.debug(e)

    except Exception as e:
        app.logger.debug(e)
        return{
            'success': False,
            'errorCode': 500,
            'errorMessage': 'Internal Server Error'
        }

    finally:
        close_old_connections()
