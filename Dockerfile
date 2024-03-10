### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:16 as builder
ARG CONFIGURATION='prod'


COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i --legacy-peer-deps && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
#RUN $(npm bin)/ng build --prod --output-path=dist
#RUN npm run build --output-path=dist --configuration=$CONFIGURATION --output-hashing=all
RUN $(npm bin)/ng build --configuration=production --optimization --source-map=false --output-path=dist --progress


### STAGE 2: Setup ###

FROM nginx:alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

EXPOSE 4200 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
