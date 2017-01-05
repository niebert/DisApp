"""
Created on 4th Jan, 2017
"""
from flask import Flask, request, session
from flask import current_app as app
from flask.ext import restful

from disapp_service.conf.config_logger_setup import setup_config_logger
from disapp_service.service_api_handlers import \
     post_user_creation_handler
from disapp_service.utils.resource import Resource
from disapp_service.utils.auth import get_user
from disapp_service.service_api_handlers import get_feedback_questionnaire_handler

class FeedbackQuestionnaire(Resource):
    """ 
    This api returns all feedback questionnaire
    """

    def get(self):
        """
            This method returns all available active feeback questionnaires
        """
        app.logger.debug("Call to get all feedback questionnaire")

        return get_feedback_questionnaire_handler.handle_request()

