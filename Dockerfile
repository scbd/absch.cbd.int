FROM node:4.2

ARG BRANCH='master'
RUN echo 'running on branch ' $BRANCH

# clone primary repo
RUN git clone -b $BRANCH https://github.com/scbd/absch.cbd.int.git /usr/tmp/i18n/en
WORKDIR /usr/tmp/i18n/en
COPY i18n.sh ./
RUN chmod 700 i18n.sh
RUN ./i18n.sh

# clone i18n repo
RUN git clone -b master https://github.com/scbd/absch.cbd.int-i18n.git /usr/tmp/i18n/others
WORKDIR /usr/tmp/i18n/others
COPY i18n.sh ./
RUN chmod 700 i18n.sh
RUN ./i18n.sh

WORKDIR /usr/src/app

RUN mv -f /usr/tmp/i18n/en/* ./

RUN mkdir ./i18n
RUN mv /usr/tmp/i18n/others/ar ./i18n
RUN mv /usr/tmp/i18n/others/fr ./i18n
RUN mv /usr/tmp/i18n/others/es ./i18n
RUN mv /usr/tmp/i18n/others/ru ./i18n
RUN mv /usr/tmp/i18n/others/zh ./i18n

RUN rm -fr /usr/tmp/i18n

COPY package.json bower.json .bowerrc .npmrc ./

RUN npm install -q


ENV PORT 8000

EXPOSE 8000

ARG VERSION
ENV VERSION $VERSION

CMD [ "node", "server" ]
