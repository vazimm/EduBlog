# syntax=docker/dockerfile:1

FROM node:24-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS development
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]


FROM base AS build

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm ci
COPY . .
RUN npm run build


# ---------- Produção ----------
FROM nginx:alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]