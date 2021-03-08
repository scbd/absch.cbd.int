FROM node:14.0-alpine

RUN apk update  -q && \
    apk upgrade -q && \
    apk add     -q --no-cache bash git curl

ARG BRANCH='master'
ENV BRANCH $BRANCH

RUN echo 'branch:' $BRANCH

ARG VERSION
ENV VERSION $VERSION

WORKDIR /usr/src/app

# clone primary repo
RUN git clone -n https://github.com/scbd/absch.cbd.int.git /usr/src/app

RUN git -c advice.detachedHead=false checkout $VERSION

RUN yarn install && \
    echo 'running on branch ' $VERSION

# run rollup build script
RUN yarn run build

# WORKDIR /usr/src/app

#copy touched files from EN version
RUN rm -rf /usr/src/app/.git 

RUN yarn install --production --ignore-scripts --prefer-offline && \
    yarn cache clean && \
    # rm -fr /usr/src/app/i18n && rm -fr /usr/share/doc && rm -fr /usr/share/locale && \
    rm -fr /usr/local/share/.cache/yarn && rm -rf /var/cache/apk/* && \
    rm -rf /var/lib/{apt,dpkg,cache,log}/

ENV PORT 8000
EXPOSE 8000

ARG TAG
ENV TAG $TAG

ARG COMMIT
ENV COMMIT $COMMIT

CMD [ "node", "server" ]
