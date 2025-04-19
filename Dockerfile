FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN CI=true yarn test

COPY .env.sample .env

EXPOSE 5173

CMD ["yarn", "dev", "--host"]
