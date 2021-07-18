/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import {flow} from 'mobx';

export function asyncAction(
  target: Object,
  name: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor;

export function asyncAction() {
  const name = arguments[1];
  const descriptor = arguments[2];

  if (descriptor && descriptor.value) {
    return Object.assign({}, descriptor, {value: derive(descriptor.value)});
  }

  return Object.assign({}, descriptor, {
    set(v: any) {
      Object.defineProperty(this, name, {...descriptor, value: derive(v)});
    },
  });
}

function derive(generator: any) {
  return async function (...args: any[]): Promise<any> {
    // @ts-ignore
    return await flow(generator).call(this, ...args);
  };
}
