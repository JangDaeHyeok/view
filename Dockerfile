FROM nginx:latest
VOLUME /raor_dev_volume
ADD ./build /usr/share/nginx/html
