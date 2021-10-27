FROM node:17
CMD ["mkdir", "node_server"]
VOLUME /tmp
EXPOSE 3000
ADD .* .
ENTRYPOINT ["npm","install"]