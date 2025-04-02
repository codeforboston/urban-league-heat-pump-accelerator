# syntax=docker/dockerfile:1
FROM ruby:3.2.7-alpine
RUN apk update && apk upgrade && apk add build-base libpq-dev postgresql-client gcompat tzdata yaml-dev
RUN adduser -S rails -G root
COPY backend/ /usr/src/app/
WORKDIR /usr/src/app
RUN chmod -R 775 /usr/src/app
RUN chown -R rails:root /usr/src/app

USER rails

# add x86_64 for support on ARM platform - nokogiri expects x86 for distribution
RUN bundle lock --add-platform x86_64-linux-gnu
RUN bundle install

EXPOSE 3000

ENTRYPOINT ["sh", "start.sh"]
