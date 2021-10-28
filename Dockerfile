FROM sktellecom/centos7:node
VOLUME /tmp
ADD ./build .
ADD ./package.json .
EXPOSE 3000
CMD ["npm", "start"]
