FROM node:14
RUN mkdir /tmp/react
VOLUME /tmp/react
ADD ./build /react/react
EXPOSE 3000
