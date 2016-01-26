FROM node:4.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

ENV PORT 8000

EXPOSE 8000

CMD [ "npm", "start" ]
