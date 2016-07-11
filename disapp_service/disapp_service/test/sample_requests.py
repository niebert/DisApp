#sample requests for login/signup apis:

import requests, json
headers = {'content-type':'application/json', 'Origin':['POST','PUT','DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH'] , "X-Authorization-Token": "7a4f076a-99b7-4e85-ab1a-c3a5205d103e"}
url = 'http://127.0.0.1:7285/userservice/uservalidation/'
url = 'http://127.0.0.1:7285/userservice/create/'
response = requests.post(url,headers=headers,data=json.dumps(data))
response = requests.delete(url,headers=headers,data=json.dumps(data))
response.text
