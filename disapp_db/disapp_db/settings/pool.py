import logging

from django.conf import settings
from django.db.utils import load_backend
import sqlalchemy.pool as pool

pool_initialized=False

logger = logging.getLogger('pool')
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())

POOL_SETTINGS={'pool_size':10, 'max_overflow':1, 'recycle': 21600}


class hashabledict(dict):
    def __hash__(self):
        return hash(tuple(sorted(self.items())))


class hashablelist(list):
    def __hash__(self):
        return hash(tuple(sorted(self)))


class ManagerProxy(object):
    def __init__(self, manager):
        self.manager = manager

    def __getattr__(self, key):
        return getattr(self.manager, key)

    def connect(self, *args, **kwargs):
        if 'conv' in kwargs:
            conv = kwargs['conv']
            if isinstance(conv, dict):
                items = []
                for k, v in conv.items():
                    if isinstance(v, list):
                        v = hashablelist(v)
                    items.append((k, v))
                kwargs['conv'] = hashabledict(items)
        return self.manager.connect(*args, **kwargs)


def init_pool():
    if not globals().get('pool_initialized', False):
        global pool_initialized
        pool_initialized = True
        try:
            backendname = settings.DATABASES['default']['ENGINE']
            backend = load_backend(backendname)

            #replace the database object with a proxy.
            backend.Database = ManagerProxy(pool.manage(backend.Database, **POOL_SETTINGS))

            backend.DatabaseError = backend.Database.DatabaseError
            backend.IntegrityError = backend.Database.IntegrityError
            logger.debug("Initialized Connection Pool")
        except Exception,e:
            import traceback
            traceback.print_exc()
            pass


init_pool()
