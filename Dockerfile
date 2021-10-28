FROM sktellecom/centos7:node
RUN mkdir /tmp/react
VOLUME /tmp/react
ADD ./build /tmp/react
ADD ./package.json /tmp/react/package.json
RUN ls
EXPOSE 3000
CMD ["npm", "start"]
