FROM alpine:3.13

RUN apk update \
    && apk add coreutils \
    && apk add postgresql-client \
    && apk add python3 py3-pip && pip3 install --upgrade pip && pip3 install awscli \
    && rm -rf /var/cache/apk/*

ENV POSTGRES_DATABASE **None**
ENV POSTGRES_HOST **None**
ENV POSTGRES_PORT 5432
ENV POSTGRES_USER **None**
ENV POSTGRES_PASSWORD **None**
ENV S3_ACCESS_KEY_ID **None**
ENV S3_SECRET_ACCESS_KEY **None**
ENV S3_BUCKET **None**
ENV S3_REGION us-east-1
ENV S3_ENDPOINT s3.us-east-1.amazonaws.com
ENV S3_S3V4 no

CMD ["sh"]