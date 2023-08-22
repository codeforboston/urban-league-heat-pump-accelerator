# Stage 1: Use yarn to build the app
FROM node:18 as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2: Copy the JS React SPA into the Nginx HTML directory
FROM nginx:stable-alpine
RUN apk update && apk upgrade && apk add openssl curl ca-certificates
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
