FROM node
MAINTAINER Konrad R.K. Ludwig <konrad.rk.ludwig@gmail.com>

# Create app directory and install dependencies
RUN mkdir /stackcite_ux
WORKDIR /stackcite_ux

# Install dependencies
COPY package.json /stackcite_ux
RUN npm install

# Bundle and build app source
COPY . /stackcite_ux
RUN npm run build

# Start Node.js server
CMD node server