FROM node:12-alpine 

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node

RUN npm install && npm cache clean --force --loglevel=error

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "index.js"]