FROM node:15.2-alpine3.12

ARG KUBEVAL_VERSION=0.15.0

SHELL ["/bin/ash", "-eo", "pipefail", "-c"]

RUN apk add curl --no-cache

RUN curl -L https://github.com/instrumenta/kubeval/releases/download/${KUBEVAL_VERSION}/kubeval-linux-amd64.tar.gz  | tar xz -C /tmp && \
    mv /tmp/kubeval /usr/local/bin/kubeval && \
    chmod +x /usr/local/bin/kubeval && \
    kubeval --version

WORKDIR /usr/src/app

COPY . .

RUN yarn install --production

ENTRYPOINT ["node", "/usr/src/app/lib/main.js"]
