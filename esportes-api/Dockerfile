FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY index.js ./
COPY public ./public

RUN npm install

RUN npm install pm2 -g

EXPOSE 8080

RUN ls /usr/src/app

CMD ["pm2-runtime","index.js"]
