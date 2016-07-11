def get_user_name():
    try:
        auth_token = request.headers.get(app.auth_header_name, None)
    except:
        return None

    headers = { "content-type"          : "application/json",
                "X-Authorization-Token" : auth_token }

    try:
        active_user_json = requests.get( 'http://xyz:7281/userservice/activeuser' ,
                                          headers = headers).json()
        user_guid = active_user_json['responseData']['guid']
    except:
        return None

    return user_guid

