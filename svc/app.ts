const senecaWeb = require('seneca-web');
const express = require('express');
const Router = express.Router;
const context = new Router();
import * as configParams from './const';
import { api } from './api';
import * as seneca from 'seneca';

const senecaInstance = configParams.NODE_ENV === 'dev' ? seneca( { timeout: 1800000 }) : seneca({ timeout: 45000 });

const senecaWebConfig = {
      context: context,
      adapter: require('seneca-web-adapter-express'),
      options: { parseBody: false } // so we can use body-parser
};



const app = express()
    .use(require('body-parser').json())
    .use(context)
    .listen(configParams.API_PORT);

senecaInstance
    .use(senecaWeb, senecaWebConfig)
    .use(api)
    .use('seneca-amqp-transport')
    .client({ type: 'amqp', pin: 'role:math', url: configParams.AMQP_PRODUCER_URI });
