from disapp_db.settings.base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'disapp',
        'USER': 'root',
        'PASSWORD': 'as2e',
        'HOST': 'localhost',
        'PORT': '',
    }
}


