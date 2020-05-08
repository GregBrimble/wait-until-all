import "cross-fetch/polyfill";
import { registerWaitUntil, executeWaitUntil } from "./index";

interface Event {
  respondWith: (response: Promise<Response> | Response) => void;
  waitUntil: (promise: Promise<any>) => void;
}

describe("wait-until-all", () => {
  let event: Event;
  let cleanupPromise: Promise<any>;

  beforeEach(() => {
    const promises = [];

    event = {
      respondWith: () => {},
      waitUntil: (promise: Promise<any>) => {
        cleanupPromise = promise;
      },
    };
  });

  it("registers and executes multiple Promises", async () => {
    let promiseExecuted = false;

    const handler = (event: Event) => {
      registerWaitUntil(
        Promise.resolve("world").then(() => {
          promiseExecuted = true;
        })
      );
      return new Response("Hello, world!", {
        headers: { "Content-Type": "text/plain" },
      });
    };

    event.respondWith(handler(event));
    executeWaitUntil(event);

    await cleanupPromise;

    expect(promiseExecuted).toBeTruthy();
  });
});
