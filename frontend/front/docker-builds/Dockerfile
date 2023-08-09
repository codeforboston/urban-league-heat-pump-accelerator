# grab nginx image running on alpine linux
FROM nginx:stable-alpine

# update and add dependencies
RUN apk update && apk upgrade && apk add openssl curl ca-certificates

# copy contents of build folder to default folder in container
COPY . /usr/share/nginx/html

# start nginx server
CMD ["nginx", "-g", "daemon off;"]