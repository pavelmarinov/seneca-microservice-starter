import * as _ from 'lodash';
import * as configParams from '../svc/const';
import * as uuid from 'uuid';
import { ReturnStatus } from './returnStatus';

export function mathPlugin (options: any) {
    const senecaPromisified = require('seneca-promisified');
    const seneca = new senecaPromisified(this);

    const calculateSin = async ({transactionId, val}: {transactionId?: string, val?: string}): Promise<ReturnStatus> => {
        //log action start
        if (!transactionId) transactionId = uuid();
        const loghead = `${transactionId} - [role:math,cmd:calculateSin]`;
        seneca.log.debug(loghead, 'entry', `param - ${val}`);
        //check params
        if (!val || isNaN(parseInt(val))) {
            const err = 'missing params (val)';
            seneca.log.error(loghead, 'missing params (val)');
            return { status: false, value: err };
        }
        //action
        const sin = Math.sin(parseInt(val));
        seneca.log.debug(loghead, `sin(${val})=${sin}`);
        return { status: true, value: sin  };
    };

    const calculateCos = async ({transactionId, val}: {transactionId?: string, val?: string}): Promise<ReturnStatus> => {
        //log action start
        if (!transactionId) transactionId = uuid();
        const loghead = `${transactionId} - [role:math,cmd:calculateCos]`;
        seneca.log.debug(loghead, 'entry', `param - ${val}`);
        //check params
        if (!val || isNaN(parseInt(val))) {
            const err = 'missing params (val)';
            seneca.log.error(loghead, 'missing params (val)');
            return { status: false, value: err };
        }
        //action
        const cos = Math.cos(parseInt(val));
        seneca.log.debug(loghead, `sin(${val})=${cos}`);
        return { status: true, value: cos  };
    };

    seneca.add('role:math,cmd:calculateSin', calculateSin);
    seneca.add('role:math,cmd:calculateCos', calculateCos);
}