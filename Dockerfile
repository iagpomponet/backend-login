FROM node

WORKDIR /usr/app

# COPY package.json and package-lock.json files
COPY package*.json .

# COPY ENV variable
COPY .env .

# COPY tsconfig.json file
COPY tsconfig.json .

# COPY
COPY . .

RUN npm install \ 
    && npx prisma generate --schema ./prisma/schema.prisma \
    && npx prisma migrate deploy

EXPOSE 8000

CMD ["npm", "run", "backend:dev"]