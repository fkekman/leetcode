import { describe, it } from "node:test";

import { twoSum } from "./solution.ts";
import assert from "node:assert";

const testBuilder = (nums: number[], target: number, answer: number[]) => () => {
  const result = twoSum(nums, target);
  assert.deepStrictEqual(result, answer);
}

describe('example checks', () => {
  it('example 1', testBuilder([2, 7, 11, 15], 9, [0, 1]));
  it.only('example 2', testBuilder([3, 2, 4], 6, [1, 2]));
  it('example 3', testBuilder([3, 3], 6, [0, 1]));
});

