'use strict';

import * as _ from 'lodash';


export namespace utils {

  export const stringifyJsError = function(err: any): string {
    const plainObject: any = {};
    Object.getOwnPropertyNames(err).forEach(function(key) {
      plainObject[key] = err[key];
    });
    return JSON.stringify(plainObject, null, '\t');
  };
}
