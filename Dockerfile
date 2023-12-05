FROM node:lts-bookworm
ENV DATABASE_URL="mysql://root:p@ssw0rd@tickflow-db:3306/tickflow_db"
ENV NODE_ENV=production
WORKDIR /usr/src/app
# Leave ports for compose
# EXPOSE 3000
COPY . .
RUN rm -rf node_modules
RUN chown -R node:node /usr/src/app
USER node
RUN npm install
RUN npm run build
