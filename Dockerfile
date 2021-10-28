FROM sktellecom/centos7:node
VOLUME /tmp
ADD ./build /tmp
ADD ./package.json /tmp/package.json
RUN cd /tmp
RUN ls
EXPOSE 3000
CMD [""]
