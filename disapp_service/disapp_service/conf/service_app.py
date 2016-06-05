"""
Created on 27 Oct 2015
@author: surajshah
"""
import django
from os.path import dirname, abspath, join

from django.conf import settings
from django.db import close_old_connections
from flask import Flask
from flask.ext import restful
from disapp_db.settings.pool import init_pool
from flask.ext.restful import reqparse, abort, Api, Resource
from disapp_service.conf.config_logger_setup import setup_config_logger
from disapp_service.session.interfaces import DBInterface
#from disapp_service.service_apis.pincodedetails import PincodeDetails,AddressResolution

from flask.ext.cors import CORS
 
close_old_connections()
django.setup()
init_pool()


app = Flask(__name__)
CORS(app)
app.auth_header_name = 'X-Authorization-Token'
app.session_interface = DBInterface()
app.root_dir = dirname(dirname(abspath(__file__)))

api = restful.Api(app)

setup_config_logger(app)

app.logger.info("Setting up Resources")

#api.add_resource(AddressResolution,'/appuserservice/addressresoluton/')

app.logger.info("Resource setup done")

if __name__ == '__main__':
    from gevent import monkey
    from disapp_service.utils.hacks import gevent_django_db_hack
    gevent_django_db_hack()
    monkey.patch_all(socket=True, dns=True, time=True, select=True,thread=False, os=True, ssl=True, httplib=False, aggressive=True)
    app.run(host="0.0.0.0",debug=True, port=7285)

