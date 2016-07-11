"""
Created on 26th June, 2016
"""
from flask import Flask, request, session
from flask import current_app as app
from flask.ext import restful

from disapp_service.conf.config_logger_setup import setup_config_logger
from disapp_service.service_api_handlers import \
     post_user_creation_handler
from disapp_service.utils.resource import Resource
from disapp_service.utils.auth import get_user
from disapp_service.service_api_handlers import get_questionnaires_handler

class Questionnaires(Resource):
    """ 
    This api returns all available questionnaires
    """

    def get(self):
        """
            This method returns all available active questionnaires
        """
        app.logger.debug("Call to get all active questionnaires")

        return get_questionnaires_handler.handle_request()

