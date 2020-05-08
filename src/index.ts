const WAIT_UNTILS = [];

type Event = {
  waitUntil: (promise: Promise<any>) => any;
};

export const registerWaitUntil = (promise: Promise<any>) => {
  WAIT_UNTILS.push(promise);
};

export const executeWaitUntil = (event: Event) => {
  event.waitUntil(Promise.all(WAIT_UNTILS));
};
