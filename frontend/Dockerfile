FROM node:20
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
RUN yarn global add serve
CMD ["serve", "-s", "build", "-l", "3001"]
EXPOSE 3001