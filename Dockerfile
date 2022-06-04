FROM ianwalter/puppeteer:latest

WORKDIR /app

ADD . .

RUN npm install

CMD npx wdio run wdio.conf.js --spec .test/specs/weather.e2e.js