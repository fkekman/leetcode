import assert from "node:assert";
import test, { describe, it } from "node:test";
import { addTwoNumbers, ListNode } from "./solution.ts";

const strToList = (str: string): ListNode => {
  const arr = str.split('');
  let curNode: ListNode | null = null;
  do {
    const newNode = new ListNode(Number(arr.shift()), curNode);
    curNode = newNode;
  } while (arr.length > 0);
  return curNode as ListNode;
};

const numToList = (num: number): ListNode => {
  return strToList(num.toString());
};

const listNodeEqualityCheck = (l1: ListNode | null, l2: ListNode | null) => {
  while (l1 !== null && l2 !== null) {
    assert.strictEqual(l1.val, l2.val);
    l1 = l1.next;
    l2 = l2.next;
  }
  assert.strictEqual(l1, null);
  assert.strictEqual(l2, null);
};

const testBuilder = (first: number, second: number, expResult: number) => () => {
  const lFirst = numToList(first);
  const lSecond = numToList(second);
  const lResult = numToList(expResult);

  const listToNum = (list: ListNode | null): number => {
    const acc: number[] = [];
    let curNode: ListNode | null = list;
    while (curNode !== null) {
      acc.unshift(curNode.val);
      curNode = curNode.next;
    }
    return Number(acc.join(''));
  };
  const result = addTwoNumbers(lFirst, lSecond);
  listNodeEqualityCheck(lResult, result);
};



describe('Problem 2', () => {
  describe('Example checks', () => {
    it('example 1', testBuilder(342, 465, 807));
    it('example 2', testBuilder(0, 0, 0));
    it('example 3', testBuilder(9999999, 9999, 10009998));
  });

  describe('Test helper checks', () => {
    it('strToList', () => {
      const str = '645';
      const list = new ListNode(5, new ListNode(4, new ListNode(6)));
      listNodeEqualityCheck(list, strToList(str));
    })
  })

  describe('My checks', () => {
    it('one zero L', testBuilder(0, 232, 232));
    it('one zero R', testBuilder(121, 0, 121));
    it('different length', testBuilder(1234151234, 321, 1234151555))
    it('two zeroes', testBuilder(0, 0, 0));
    it('carry', testBuilder(14, 19, 33))
    it('more than one carries', testBuilder(994, 7, 1001));
    it('more than one carries', testBuilder(13211, 6789, 20000));
    it('max safe integer overflow', () => {
      const firstNum = Number.MAX_SAFE_INTEGER - 3;
      const secondNum = 9;

      const lFirst = numToList(firstNum);
      const lSecond = numToList(secondNum);
      const lResult = strToList('9007199254740997');

      const result = addTwoNumbers(lFirst, lSecond);
      listNodeEqualityCheck(lResult, result);
    });
  });
});

