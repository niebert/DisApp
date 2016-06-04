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
from agro_db.settings.pool import init_pool
from flask.ext.restful import reqparse, abort, Api, Resource
from agroapp_service.service_apis.catalog_handler import CatalogRESTHandlers
from agroapp_service.service_apis.category_handlers import CategoryRESTHandlers
from agroapp_service.conf.config_logger_setup import setup_config_logger
from agroapp_service.service_apis.mobileregistration import MobileRegistration
from agroapp_service.service_apis.useractivitylog import UserActivityLog
from agroapp_service.service_apis.inventory_handler import InventoryRESTHandlers
from agroapp_service.service_apis.mobilevalidation import MobileValidation
from agroapp_service.service_apis.viewfarmerhistory import ViewFarmerHistory
from agroapp_service.session.interfaces import DBInterface
from agroapp_service.service_apis.mobileregistration import MobileRegistration
from agroapp_service.service_apis.AppFarmerDetails import AppFarmer
from agroapp_service.service_apis.AppFarmerDetails import AuthenticateAppFarmer
from agroapp_service.service_apis.UserCart import FarmerCart
from agroapp_service.service_apis.UserCart import FarmerCartDetails
from agroapp_service.service_apis.sale_order_farmer import SaleOrderFarmer
from agroapp_service.service_apis.pincodedetails import PincodeDetails,AddressResolution

from flask.ext.cors import CORS
from agroapp_service.utils.recharge_auth import get_recharge_auth
 
close_old_connections()
django.setup()
init_pool()


app = Flask(__name__)
CORS(app)
app.auth_header_name = 'X-Authorization-Token'
app.session_interface = DBInterface()
app.root_dir = dirname(dirname(abspath(__file__)))

app.config["AuthenticationKey"],app.config["CorporateId"] = get_recharge_auth() 

api = restful.Api(app)

setup_config_logger(app)

app.logger.info("Setting up Resources")

api.add_resource(MobileRegistration, '/mobileregister/')
api.add_resource(UserActivityLog, '/useractivitylog/')
api.add_resource(CatalogRESTHandlers , '/catalogservice/catalog/')
api.add_resource(CategoryRESTHandlers, '/catalogservice/categories/')
api.add_resource(InventoryRESTHandlers,'/catalogservice/inventory/')
api.add_resource(MobileValidation,'/validatecode/')
api.add_resource(ViewFarmerHistory,'/farmerapphistory/')
api.add_resource(AppFarmer,'/appuserservice/appfarmer/')
api.add_resource(AuthenticateAppFarmer,'/appuserservice/appauthenticate/')
api.add_resource(FarmerCart, '/appuserservice/farmercart/')
api.add_resource(FarmerCartDetails, '/appuserservice/farmercartdetails/')
api.add_resource(SaleOrderFarmer, '/appuserservice/saleorderfarmer/')
api.add_resource(PincodeDetails, '/appuserservice/pincodedetails/<int:pincode>') 
api.add_resource(AddressResolution,'/appuserservice/addressresoluton/')


#api.add_resource(UserDetails, '/userdetails/')

app.logger.info("Resource setup done")

if __name__ == '__main__':
    from gevent import monkey
    from agroapp_service.utils.hacks import gevent_django_db_hack
    gevent_django_db_hack()
    monkey.patch_all(socket=True, dns=True, time=True, select=True,thread=False, os=True, ssl=True, httplib=False, aggressive=True)
    app.run(host="0.0.0.0",debug=True, port=7285)

