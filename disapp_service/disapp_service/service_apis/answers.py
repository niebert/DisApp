"""
Created on 9th July, 2016
"""
from flask import Flask, request, session
from flask import current_app as app
from flask.ext import restful

from disapp_service.conf.config_logger_setup import setup_config_logger
from disapp_service.service_api_handlers import \
     post_user_creation_handler
from disapp_service.utils.resource import Resource
from disapp_service.utils.auth import get_user
from disapp_service.service_api_handlers import post_answers_handler


class Answers(Resource):
    """ 
    This api logs user data
    """

    def post(self):
        data = request.get_json(force=True)
        app.logger.debug("Parameters:"+str(data))

        return post_answers_handler.handle_request(data)

