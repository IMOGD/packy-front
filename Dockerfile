FROM node:18 as builder

COPY . /app

RUN npm -i npm pnpm \
    && cd /app \
    && pnpm build

FROM nginx:alpine

COPY --from builder:/app/dist /usr/share/nginx/html


RUN cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime