FROM sktellecom/ms-test:nginx
VOLUME /raor_dev_volume
ADD ./build /usr/share/nginx/html
