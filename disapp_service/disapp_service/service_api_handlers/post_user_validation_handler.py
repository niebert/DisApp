'''
Created on 11th June 2016
'''

from flask import Flask, request, session
from flask import current_app as app
from flask.ext import restful

from django.db import close_old_connections
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from disapp_service.utils.auth import get_user
from disapp_db.user_questions.models import AppUser
import pdb

def handle_request(username, password, remember_me):
    """
      This method is used to authorize a user and send an 
      authorization token
    """
    try:
        authorized = False

#        pdb.set_trace()
        try:
            user = AppUser.objects.get(username=username)
            if user.password == str(password):
                authorized = True
                session['user_id'] = user.id
                session['password_hash'] = user.password

                if remember_me!= None and int(remember_me)==1:
                    session.permanent = True

        except ObjectDoesNotExist:
            authorized = False
            app.logger.debug(e)

        if authorized:
            app.logger.info("Validated the login credentials for %s",
                            username)
            return {
                'responseData': {
                    'name': user.username,
                    app.auth_header_name: session.get('key'),
                    'is_authorized': authorized
                }
            }
        else:
            app.logger.exception("Invalid username or password %s",
                                 request.remote_addr)
            return {
                'success': False,
                'errorMessage':
                    'The email or password you entered is incorrect',
                'errorCode': 403
            }

    except Exception as e:
        app.logger.debug(e)
        return {
            'success': False,
            'errorMessage':
            'Internal Server Error',
            'errorCode': 500
        }
    finally:
        close_old_connections()
    
if __name__ == "__main__":
    print handle_request('surajshah525@gmail.com', 'a', True)
