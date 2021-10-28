FROM sktellecom/centos7:node
RUN mkdir /tmp/react
VOLUME /tmp/react
ADD ./build /tmp/react
EXPOSE 3000
CMD ["npm", "start"]
