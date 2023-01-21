RUN apt-get update \
    && apt install npm \
    && npm cache clean -f

RUN npm install -g npm
#
RUN npm install -g create-react-app
#
RUN npm create-react-app ReactFront
#
WORKDIR /code
#
COPY requirements.txt /requirements.txt
#
RUN pip3 install --no-cache-dir --upgrade -r /requirements.txt
#
COPY / ./

ENV PYTHONPATH /
#
CMD ["npm", "start"]
