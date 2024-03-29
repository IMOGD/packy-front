FROM node:18 as builder

COPY . /app

RUN cd /app \
    && npm install -g pnpm \
    && pnpm install \
    && pnpm build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html


RUN cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime