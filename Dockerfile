# pull the official base image
FROM node:alpine
# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i
RUN npm i -g serve
# add app
COPY . ./
# start app
CMD ["serve", "-s", "build", "-l", "3000"]