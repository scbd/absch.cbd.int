FROM node:14.0-alpine

RUN apk update  -q && \
    apk upgrade -q && \
    apk add     -q --no-cache bash git curl

ARG BRANCH='master'
ENV BRANCH $BRANCH

ARG VERSION
ENV VERSION $VERSION

WORKDIR /usr/src/app
COPY package.json .npmrc rollup.config.js ./
COPY ./scripts ./scripts

RUN yarn install --production && \
    echo 'running on branch ' $VERSION

COPY ./vue ./vue
# run rollup script for vue file compilation
RUN yarn run build

WORKDIR /usr/tmp/i18n

# clone primary repo
RUN git clone -n https://github.com/scbd/absch.cbd.int.git /usr/tmp/i18n/en

WORKDIR /usr/tmp/i18n/en
RUN git checkout $VERSION

COPY i18n.sh ./
RUN chmod 700 i18n.sh && \
    ./i18n.sh

# clone i18n repo
RUN if [ "$BRANCH"  = 'dev' ];   then git clone -b dev https://github.com/scbd/absch.cbd.int-i18n.git /usr/tmp/i18n/others;fi
RUN if [ "$BRANCH" != 'dev' ];   then git clone -b master https://github.com/scbd/absch.cbd.int-i18n.git /usr/tmp/i18n/others; fi

WORKDIR /usr/tmp/i18n/others
COPY i18n.sh ./
RUN chmod 700 i18n.sh && \
    ./i18n.sh

WORKDIR /usr/src/app

#copy touched files from EN version
RUN rm -rf /usr/tmp/i18n/en/.git \
    && cp -r  /usr/tmp/i18n/en/* ./ \
    && rm -rf /usr/tmp/i18n/en

#copy touched files from Other UN lang version and REMOVE CACHE files
RUN mkdir ./i18n && mv /usr/tmp/i18n/others/zh ./i18n && \
    mv /usr/tmp/i18n/others/ar ./i18n && mv /usr/tmp/i18n/others/fr ./i18n && \
    mv /usr/tmp/i18n/others/es ./i18n && mv /usr/tmp/i18n/others/ru ./i18n && \
    rm -fr /usr/tmp/i18n && rm -fr /usr/share/doc && rm -fr /usr/share/locale && \
    rm -fr /usr/local/share/.cache/yarn && rm -rf /var/cache/apk/* && \
    rm -rf /var/lib/{apt,dpkg,cache,log}/

ENV PORT 8000
EXPOSE 8000

ARG TAG
ENV TAG $TAG

ARG COMMIT
ENV COMMIT $COMMIT

CMD [ "node", "server" ]
