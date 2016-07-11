'''
Created on 11th June 2016
'''

from flask import Flask, request, session
from flask import current_app as app
from flask.ext import restful

from django import db
from django.db import close_old_connections
from django.contrib.auth.models import User
from disapp_service.utils.auth import get_user
from disapp_db.user_questions.models import (AppUser, Language)
import ast
import json
import pdb

def handle_request(username, password, details):
    """
      This method is used to create a new user and send an 
      authorization token
    """
    try:

        if username is None or password is None:
            return {
                'success': False,
                'errorMessage': 'Username/Password cannot be blank',
                'errorCode': 400
            }

        if AppUser.objects.filter(username = username).first() is not None:
            return {
                'success': False,  
                'errorMessage': 'User already exists',
                'errorCode': 400
            }

        user = AppUser.objects.create(username = username,password=password)
        user.refresh_from_db()

#        pdb.set_trace()
        try:
            details_dict = ast.literal_eval(str(details))
            if 'location' in details_dict:
                if details_dict['location']!= None:
                    user.location = details_dict['location']
                details_dict.pop('location',0)

            if 'language' in details_dict:
                if details_dict['language']!= None:
                    lang = details_dict['language']
                    try:
                        ll = Language.objects.filter(language=str(lang))[0]
                        user.language = ll
                    except:
                        app.logger.debug('Language not found')
                details_dict.pop('language',0)

            if 'imei_no' in details_dict:
                if details_dict['imei_no']!= None:
                    user.imei_number = details_dict['imei_no']
                details_dict.pop('imei_no',0)

            if 'gcm_id' in details_dict:
                if details_dict['gcm_id']!= None:
                    user.mobile_gcm_code = details_dict['gcm_id']
                details_dict.pop('gcm_id',0)

            user.device_details = json.dumps(details_dict)
            user.save()
            
        except Exception as e:
            app.logger.debug(e)
            app.logger.debug('Exception while storing extra data')

        app.logger.info('User Successfully created')

        return {
            'success': True,
            'content': {
            'username':user.username, 
             app.auth_header_name: session.get('key')},
            'status': 201
        }
    except Exception as e:
        app.logger.debug(e)
        return {
           'success': False, 
           'errorMessage': 'Internal server error',
           'errorCode': 500
        }
    finally:
        close_old_connections()
