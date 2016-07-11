"""
Created on 11th June, 2016
"""
from flask import Flask, request, session
from flask import current_app as app
from flask.ext import restful

from disapp_service.conf.config_logger_setup import setup_config_logger
from disapp_service.service_api_handlers import \
     post_user_creation_handler
from disapp_service.utils.resource import Resource
from disapp_service.utils.auth import get_user


class UserCreation(Resource):
    """ 
    This class creates a new user
    """

    def post(self):
        """
            This method creates a new user
        """
        app.logger.debug("Email ID:"+str(request.json['email']) + ' Password:'+ str(request.json['pswd'])+
                               ' Details'+ str(request.json['details']))

        return post_user_creation_handler.handle_request(str(request.json['email']),
                                         str(request.json['pswd']), request.json['details'])

    post.authenticated = False
