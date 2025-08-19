FROM alpine:3.13

RUN apk update \
    && apk add coreutils \
    && apk add postgresql-client \
    && apk add python3 py3-pip && pip3 install --upgrade pip && pip3 install awscli \
    && rm -rf /var/cache/apk/*

CMD ["sh"]