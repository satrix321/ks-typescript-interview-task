import { IItem } from "types";
import itemHasOldPassword from "../itemHasOldPassword";

describe("should return true if password is older than 30 days", () => {
  test.each([
    [false, { createdAt: new Date().toISOString() }],
    [
      false,
      {
        createdAt: new Date(
          new Date().setDate(new Date().getDate() - 1)
        ).toISOString(),
      },
    ],
    [
      false,
      {
        createdAt: new Date(
          new Date().setDate(new Date().getDate() - 7)
        ).toISOString(),
      },
    ],
    [
      false,
      {
        createdAt: new Date(
          new Date().setDate(new Date().getDate() - 29)
        ).toISOString(),
      },
    ],
    [
      false,
      {
        createdAt: new Date(
          new Date().setMonth(new Date().getMonth() + 1)
        ).toISOString(),
      },
    ],
    [
      true,
      {
        createdAt: new Date(
          new Date().setDate(new Date().getDate() - 30)
        ).toISOString(),
      },
    ],
    [
      true,
      {
        createdAt: new Date(
          new Date().setMonth(new Date().getMonth() - 2)
        ).toISOString(),
      },
    ],
    [
      true,
      {
        createdAt: new Date(
          new Date().setMonth(new Date().getMonth() - 120)
        ).toISOString(),
      },
    ],
  ])("should return %s", (expectedResult, item) => {
    expect(itemHasOldPassword(item as IItem)).toBe(expectedResult);
  });
});
