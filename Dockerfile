FROM sktellecom/centos7:node
VOLUME /tmp
ADD . .
EXPOSE 3000
CMD ["npm", "start", "&&", "npm", "config", "set", "proxy", "http://10.107.154.33:8092"]
