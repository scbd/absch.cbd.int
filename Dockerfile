FROM node:4.2

ARG BRANCH='master'
ENV BRANCH $BRANCH
RUN echo 'running on branch ' $BRANCH

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


CMD [ "node", "server" ]
