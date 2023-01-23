import getUrl from "../getUrl";
import { API } from "../../constants";

process.env.API_URL = "http://localhost:9003";

describe("should convert api url and params to URI", () => {
  test.each([
    ["http://localhost:9003/api/login", API.Login, {}],
    [
      "http://localhost:9003/api/items?userId=testUserId",
      API.Items,
      {
        userId: "testUserId",
      },
    ],
  ])("should return %s", (expectedResult, api, params) => {
    expect(getUrl(api, params)).toBe(expectedResult);
  });
});

describe("should convert api url with multiple params to URI", () => {
  test.each([
    [
      [
        "http://localhost:9003/api/items?someOtherParam=testval&userId=testUserId",
        "http://localhost:9003/api/items?userId=testUserId&someOtherParam=testval",
      ],
      API.Items,
      {
        someOtherParam: "testval",
        userId: "testUserId",
      },
    ],
  ])("should return %s", (possibleResults, api, params) => {
    expect(getUrl(api, params)).toBeOneOf(possibleResults);
  });
});
