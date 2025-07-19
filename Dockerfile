FROM node:20

WORKDIR /usr/node/comprasapp

RUN npm install -g @nestjs/cli

RUN chown -R node:node /usr/node/comprasapp

CMD [ "tail", "-f", "/dev/null" ]
