FROM sktellecom/centos7:node
VOLUME /tmp
RUN mkdir react
VOLUME /tmp/react
RUN cd /tmp && ls
ADD ./build /tmp
ADD ./package.json /tmp/package.json
RUN cd /tmp/react && ls
EXPOSE 3000
CMD ["ls"]
