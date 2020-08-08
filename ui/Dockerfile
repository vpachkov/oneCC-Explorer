FROM node:12.2.0-alpine as react_builder
COPY . /app
WORKDIR /app
RUN npm i && npm run build

FROM nginx:1.16.0-alpine
COPY --from=react_builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx","-g","daemon off;"]