FROM node:12-alpine
RUN apk update && \
    apk add wget && \
    apk add git && \
    apk add openssh-client
RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN yarn
