FROM node:alpine

COPY package.json /
RUN npm install

COPY config.json /

COPY index.js /
CMD node index.js
