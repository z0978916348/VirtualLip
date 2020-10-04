FROM node:12

RUN apt-get update
RUN apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y
COPY . /virtual_lip
WORKDIR /virtual_lip
RUN rm -r -f node_modules
RUN npm install

EXPOSE 80
ENTRYPOINT [ "npm", "run", "start" ]

