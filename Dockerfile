FROM sktellecom/centos7:node
VOLUME /tmp
ADD ./build .
ADD ./package.json .
ADD ./node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
