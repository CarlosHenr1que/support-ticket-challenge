FROM node:20
ENV MONGOMS_DISTRO=ubuntu-22.04
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
