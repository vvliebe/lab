FROM node:8.0.0
MAINTAINER vvliebe "https://github.com/vvliebe"

WORKDIR /var/app
RUN npm install
RUN npm install -g pm2
RUN npm install -g ts-node
RUN pm2 install typescript

CMD ["pm2", "start", "app.ts", "--no-daemon", "--watch"]