FROM node
MAINTAINER Konrad R.K. Ludwig <konrad.rk.ludwig@gmail.com>
COPY . /stackcite_ux
WORKDIR /stackcite_ux
RUN npm install
CMD npm start