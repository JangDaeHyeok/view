FROM node:17
CMD ["mkdir", "node_server"]
VOLUME /node_server
EXPOSE 3000
ADD ./* .
ENTRYPOINT ["npm","install"]