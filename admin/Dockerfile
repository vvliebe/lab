FROM node:8.0.0
MAINTAINER vvliebe "https://github.com/vvliebe"

WORKDIR /var/app
RUN npm install
RUN npm install -g pm2

ENV NODE_ENV production

CMD ["pm2", "start", "app.js", "--no-daemon", "--watch"]