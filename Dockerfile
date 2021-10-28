FROM sktellecom/ms-test:nginx
EXPOSE 3000
ADD ./build /usr/share/nginx/html
