# Stage 1: Use yarn to build the app
FROM node:18 as builder

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

ARG REACT_APP_RECAPTCHA_KEY
ENV REACT_APP_RECAPTCHA_KEY=$REACT_APP_RECAPTCHA_KEY

ARG REACT_APP_PUBLIC_SURVEY_ENABLED
ENV REACT_APP_PUBLIC_SURVEY_ENABLED=$REACT_APP_PUBLIC_SURVEY_ENABLED

ARG REACT_APP_GIT_SHA
ENV REACT_APP_GIT_SHA=$REACT_APP_GIT_SHA

ARG REACT_APP_GIT_REF
ENV REACT_APP_GIT_REF=$REACT_APP_GIT_REF

WORKDIR /usr/src/app
COPY frontend/front/ ./
RUN yarn
RUN yarn build

# Stage 2: Copy the JS React SPA into the Nginx HTML directory
FROM nginxinc/nginx-unprivileged:stable-alpine
COPY --from=builder /usr/src/app/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
