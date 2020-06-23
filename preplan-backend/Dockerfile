FROM node:10.19.0

ENV MONGODB_URI='mongodb://localhost:27017/preplan'

ENV PORT='3000'

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install

EXPOSE 3000

HEALTHCHECK --interval=2m --timeout=5s --start-period=2m \
  CMD nc -z -w5 127.0.0.1 5080 || exit 1

CMD echo "Warming up" && sleep 5 && npm start