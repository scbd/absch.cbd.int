FROM node:14.0-alpine

RUN apk update  -q && \
    apk upgrade -q && \
    apk add     -q --no-cache bash git curl python3 && \
    rm -rf /var/cache/apk/*

RUN curl https://raw.githubusercontent.com/MestreLion/git-tools/main/git-restore-mtime > /usr/bin/git-restore-mtime && \
    chmod u+x /usr/bin/git-restore-mtime

ARG BRANCH='master'
ENV BRANCH $BRANCH

RUN echo 'branch:' $BRANCH

WORKDIR /usr/src/app

COPY . ./

RUN git restore-mtime --force

RUN yarn install --ignore-scripts --prefer-offline && \
    yarn cache clean && \
    rm -rf /usr/src/app/.git \
    rm -rf /usr/src/app/dist \
    rm -fr /usr/share/doc && rm -fr /usr/share/locale && \
    rm -fr /usr/local/share/.cache/yarn && rm -rf /var/cache/apk/* && \
    rm -rf /var/lib/{apt,dpkg,cache,log}/

# run rollup build script 
RUN yarn run build

ENV PORT 8000
EXPOSE 8000

ARG TAG
ENV TAG $TAG

ARG COMMIT
ENV COMMIT $COMMIT

CMD [ "node", "server" ]
