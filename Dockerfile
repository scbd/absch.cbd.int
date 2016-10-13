FROM node:4.2

WORKDIR /usr/src/app

COPY package.json bower.json .bowerrc .npmrc ./

RUN npm install -q

COPY . ./

ENV PORT 8000

EXPOSE 8000

ARG VERSION
ENV VERSION $VERSION

ARG TAG
ENV TAG $TAG

ARG REPONAME
ENV REPONAME $REPONAME

CMD [ "node", "server" ]
