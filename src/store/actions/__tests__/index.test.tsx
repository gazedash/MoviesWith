import * as FetchActor from "../index.ts";

test("FetchActor", () => {
  console.log(FetchActor);
  
  expect(FetchActor.type).toBe("FETCH_ACTOR");
});
