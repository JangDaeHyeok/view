FROM sktellecom/centos7:node
VOLUME /
ADD ./build .
ADD ./package.json .
RUN ls
EXPOSE 3000
CMD ["npm", "start"]
