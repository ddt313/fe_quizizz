import {Toaster, Position, Intent} from '@blueprintjs/core';
export type Failures = {
  reason: string;
  message: string;
};
export class HttpRequestError extends Error {
  constructor(public failures: Failures[], public code?: number) {
    super();
    Object.setPrototypeOf(this, HttpRequestError.prototype);
  }
}
const RecoveryToaster = Toaster.create({
  className: 'recipe-toaster',
  position: Position.TOP,
});
const ShowToasterError = (reason: string) => {
  RecoveryToaster.show({
    message: reason,
    intent: Intent.DANGER,
    // TODO: create a default duration time of toasters
    timeout: 3000,
  });
};

export const subscribeErrorsToToaster: () => void = () => {
  window.addEventListener(
    'unhandledrejection',
    function (event) {
      event.promise.catch((errors) => {
        if (!errors.failures) {
          ShowToasterError('UnknownErrors');

          return;
        }
        errors.failures.map((failure: Failures) => ShowToasterError(failure.reason));
      });
    },
    false,
  );
};
