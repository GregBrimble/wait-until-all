import { gretter } from ".";

describe("gretter", () => {
  it("works with a name", () => {
    expect(gretter("John")).toEqual("Hello, John!");
  });
  it("works without a name", () => {
    expect(gretter()).toEqual("Hello, World!");
  });
});
