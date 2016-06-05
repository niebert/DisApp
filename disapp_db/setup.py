from setuptools import setup, find_packages

try:
    with open('requirements.txt') as f:
        requires = f.read().splitlines()
except IOError:
    with open('disapp_db.egg-info/requires.txt') as f:
        requires = f.read().splitlines()
        
with open('VERSION') as f:
    version = f.read().strip()

print requires
print type(requires)
    
setup(
      # If name is changed be sure to update the open file path above.
      name = "disapp_db",
      version = version,
      packages = find_packages(),
      package_dir = {'disapp_db':'disapp_db'},
      author = 'DisApp',
      author_email = 'surajshah525@gmail.com',
      description = 'Database Layer access used across DisApp',
      license = "PSF",
      include_package_data = True,
      ) 
