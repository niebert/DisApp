
sudo rm /etc/nginx/sites-enabled/default
sudo cp $PYTHONPATH/agroapp_service/conf/agroapp_service_nginx.conf /etc/nginx/sites-enabled/
pkill gunicorn
cd $PYTHONPATH/agroapp_service/conf
echo $PWD
gunicorn -c gunicorn.py service_app:app
sudo service nginx restart


