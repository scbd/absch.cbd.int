FROM node:26-alpine

RUN apk update  -q && \
    apk upgrade -q && \
    apk add     -q --no-cache bash git curl python3 && \
    rm -rf /var/cache/apk/*

# node:26 images no longer ship yarn/corepack. Install yarn from npm, never via
# apk (that would pull in a second, unpatched Alpine nodejs as /usr/bin/node).
RUN npm install -g --ignore-scripts yarn@1.22.22

ARG BRANCH='master'
ENV BRANCH=$BRANCH

RUN echo 'branch:' $BRANCH

WORKDIR /usr/src/app

COPY . ./

RUN yarn install --ignore-scripts --prefer-offline && \
    yarn cache clean && \
    rm -rf /usr/src/app/.git \
    rm -rf /usr/src/app/dist \
    rm -fr /usr/share/doc && rm -fr /usr/share/locale && \
    rm -fr /usr/local/share/.cache/yarn && rm -rf /var/cache/apk/* && \
    rm -rf /var/lib/{apt,dpkg,cache,log}/

# run rollup build script 
RUN yarn run build

ENV PORT=8000
EXPOSE 8000

ARG TAG
ENV TAG=$TAG

ARG COMMIT
ENV COMMIT=$COMMIT

CMD [ "node", "server" ]
