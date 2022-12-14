# syntax=docker/dockerfile:1
FROM ruby:3.1.3-alpine
RUN apk update && apk upgrade && apk add build-base libpq-dev postgresql-client gcompat tzdata
WORKDIR /usr/src/app
COPY Gemfile Gemfile.lock ./
# add x86_64 for support on ARM platform - nokogiri expects x86 for distribution
RUN bundle lock --add-platform x86_64-linux
RUN bundle install

COPY . .
EXPOSE 3000
RUN chmod +x start.sh

ENTRYPOINT ["sh", "start.sh"]
