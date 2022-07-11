FROM ianwalter/puppeteer:latest

WORKDIR /app

ADD . .

RUN npm install

RUN npm install chromedriver --chromedriver_version=LATEST

# RUN  apt-get update

# RUN  apt install ./google-chrome-stable_current_amd64.deb

CMD npx wdio run wdio.conf.js 