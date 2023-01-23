import { IItem } from "types";
import itemHasWeakPassword from "../itemHasWeakPassword";

describe("should return true if password does not match requirements", () => {
  test.each([
    [true, { password: "pass" }],
    [true, { password: "PASS" }],
    [true, { password: "#$%^^" }],
    [true, { password: "123452" }],
    [true, { password: "passPASS" }],
    [true, { password: "pass!@%" }],
    [true, { password: "pass532" }],
    [true, { password: "PASS$#" }],
    [true, { password: "PASS436" }],
    [true, { password: "$@%236" }],
    [false, { password: "passPASS$@%" }],
    [false, { password: "passPASS43534" }],
    [false, { password: "pass##@1231" }],
    [false, { password: "PASD#$#$123" }],
    [false, { password: "dsfdFSFS@$@152" }],
  ])("should return %s", (expectedResult, item) => {
    expect(itemHasWeakPassword(item as IItem)).toBe(expectedResult);
  });
});
