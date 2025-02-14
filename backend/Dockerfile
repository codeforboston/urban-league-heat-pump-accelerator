# syntax=docker/dockerfile:1
FROM ruby:3.1.3-alpine
RUN apk update && apk upgrade && apk add build-base libpq-dev postgresql-client gcompat tzdata
RUN adduser -S rails -G root
COPY backend/ /usr/src/app/
WORKDIR /usr/src/app
RUN chmod -R 775 /usr/src/app
RUN chown -R rails:root /usr/src/app

USER rails

# add x86_64 for support on ARM platform - nokogiri expects x86 for distribution
RUN bundle lock --add-platform x86_64-linux
RUN bundle install --verbose

EXPOSE 3000

ENTRYPOINT ["sh", "start.sh"]
