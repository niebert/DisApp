
sudo rm /etc/ndis/sites-enabled/default
sudo cp $PYTHONPATH/disapp_service/conf/disapp_service_nginx.conf /etc/nginx/sites-enabled/
pkill gunicorn
cd $PYTHONPATH/disapp_service/conf
echo $PWD
gunicorn -c gunicorn.py service_app:app
sudo service nginx restart


