FROM node:14
RUN mkdir /react
VOLUME ["/react"]
ADD ./build /react
EXPOSE 3000
