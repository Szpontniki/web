FROM node:22-alpine AS builder

ARG AUXILIARY_API_URL
ARG FIRMWARE_API_URL

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN AUXILIARY_API_URL=${AUXILIARY_API_URL} FIRMWARE_API_URL=${FIRMWARE_API_URL} npm run init

RUN npm run build

FROM nginx:alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
