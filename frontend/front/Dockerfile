# Stage 1: Use yarn to build the app
FROM node:18 as builder
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2: Copy the JS React SPA into the Nginx HTML directory
FROM nginxinc/nginx-unprivileged:stable-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
