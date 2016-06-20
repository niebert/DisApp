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
from disapp_db.user_questions.models import AppUser

def handle_request(username, password):
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
        app.logger.info('User Successfully created')

        return {
            'success': True,
            'responseData':{'username':user.username, 
             app.auth_header_name: session.get('key'),
            'status': 201
             }
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
