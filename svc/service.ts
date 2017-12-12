import * as configParams from './const';
import * as seneca from 'seneca';
import { mathPlugin } from '../lib/mathPlugin';

const senecaInstance = configParams.NODE_ENV === 'dev' ? seneca( { timeout: 1800000 }) : seneca({ timeout: 45000 });
senecaInstance
    .use('seneca-amqp-transport')
    .use(mathPlugin)
    .listen({ type: 'amqp', pin: 'role:math', url: configParams.AMQP_CONSUMER_URI });