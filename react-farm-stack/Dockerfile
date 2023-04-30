FROM node:16.13.1
USER root

RUN mkdir react-farm-stack

WORKDIR /root/react-farm-stack/

RUN apt-get update
COPY . .

RUN apt-get install -y vim less

CMD ["yarn", "start"]
