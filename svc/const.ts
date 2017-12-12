'use strict';

import * as config from 'config';

const getConfigParam = (name: string) => {
  return process.env[name] || config.get(name);
};


//API PORT
export const API_PORT = process.env.PORT || getConfigParam('API_PORT');
if (!API_PORT) {
  throw new Error('missing API_PORT');
}


//AMQP_PRODUCER_URI
export const AMQP_PRODUCER_URI = getConfigParam('AMQP_PRODUCER_URI');
if (!AMQP_PRODUCER_URI) {
  throw new Error('missing AMQP_PRODUCER_URI');
}


//AMQP_CONSUMER_URI
export const AMQP_CONSUMER_URI = getConfigParam('AMQP_CONSUMER_URI');
if (!AMQP_CONSUMER_URI) {
  throw new Error('missing AMQP_CONSUMER_URI');
}

//NODE_ENV
export const NODE_ENV = getConfigParam('NODE_ENV');