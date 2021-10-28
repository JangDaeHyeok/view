FROM sktellecom/centos7:node
RUN mkdir /tmp/react
VOLUME /tmp/react
ADD ./build /react/react
EXPOSE 3000
CMD ["npm", "start"]
