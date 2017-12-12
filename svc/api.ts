import * as uuid from 'uuid';
import { ReturnStatus } from './../lib/returnStatus';
import { utils } from '../lib/utils';

export function api(options: any) {

    const senecaPromisified = require('seneca-promisified');
    const seneca = new senecaPromisified(this);

    seneca.add('role:math-api,path:calculateSin', async (msg: any) => {
        const transactionId: string = msg.args.params.transactionId ? msg.args.params.transactionId : uuid();
        const loghead = `${transactionId} - [role:math-api,path:calculateSin]`;
        try {
            const { val } = msg.args.params;
            seneca.log.debug(loghead, 'entry', `param - ${val}`);
            const res: ReturnStatus = await seneca.act('role:math', { cmd: 'calculateSin', val, transactionId });
            if (res.status)
                msg.response$.status(200).send({ value: res.value });
            else
                msg.response$.status(400).send({ err: res.value });
        } catch (err) {
            seneca.log.error(loghead, err);
            msg.response$.status(500).send({ err: utils.stringifyJsError(err) });
        }
    });

    seneca.add('role:math-api,path:calculateCos', async (msg: any) => {
        const transactionId: string = msg.args.params.transactionId ? msg.args.params.transactionId : uuid();
        const loghead = `${transactionId} - [role:math-api,path:calculateCos]`;
        try {
            const { val } = msg.args.params;
            seneca.log.debug(loghead, 'entry', `param - ${val}`);
            const res: ReturnStatus = await seneca.act('role:math', { cmd: 'calculateCos', val, transactionId });
            if (res.status)
                msg.response$.status(200).send({ value: res.value });
            else
                msg.response$.status(400).send({ err: res.value });
        } catch (err) {
            seneca.log.error(loghead, err);
            msg.response$.status(500).send({ err: utils.stringifyJsError(err) });
        }
    });


    seneca.add('init:api', async (msg: any) => {
        return await seneca.act('role:web', {
            routes: {
                prefix: '/api/math',
                pin: 'role:math-api,path:*',
                map: {
                    calculateSin: { name: '', suffix: '/sin/:val', GET: true, autoreply: false },
                    calculateCos: { name: '', suffix: '/cos/:val', GET: true, autoreply: false },
                }
            }
        });
    });
}