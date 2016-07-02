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
from disapp_service.service_api_handlers import get_questions_handler


class Questions(Resource):
    """ 
    This api returns all data for a particular questionnaire
    """

    def get(self, questionnaire_id):
        """
            This method returns an active questionnaire data
        """
        try:
            language = str(request.args['language']).lower()
        except:
            language = "en"

        app.logger.debug("Call to get questionnaire: "+str(questionnaire_id) +' for language: '+language)

        return get_questions_handler.handle_request(str(questionnaire_id),language)
