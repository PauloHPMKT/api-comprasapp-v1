FROM node:22-alpine

WORKDIR /usr/node/comprasapp

RUN npm install -g @nestjs/cli

COPY . .

RUN chown -R node:node /usr/node/comprasapp

CMD [ "tail", "-f", "/dev/null" ]
