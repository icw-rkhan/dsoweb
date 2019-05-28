
#FROM httpd:2.4
##copy angular dist folder to container
#COPY dist/ /usr/local/apache2/htdocs/
#
##copy htaccess and httpd.conf to container
#COPY .htaccess /usr/local/apache2/htdocs/
##COPY httpd.conf /usr/local/apache2/conf/httpd.conf
##change permissions
#RUN chmod -R 755 /usr/local/apache2/htdocs/
#
##expose port
#EXPOSE 4200


FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY index.html .
COPY dist/ .