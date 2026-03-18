
export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// First approach, shouldnt pass max_safe_integer tests(Failed)
export function addTwoNumbersOld(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const listToNum = (list: ListNode | null): number => {
    const acc: number[] = [];
    let curNode: ListNode | null = list;
    while (curNode !== null) {
      acc.unshift(curNode.val);
      curNode = curNode.next;
    }
    return Number(acc.join(''));
  };
  const numToList = (num: number): ListNode => {
    const arr = num.toString().split('');
    let curNode: ListNode | null = null;
    do {
      const newNode = new ListNode(Number(arr.shift()), curNode);
      curNode = newNode;
    } while (arr.length > 0);
    return curNode as ListNode;
  }

  const firstNum = listToNum(l1);
  const secondNum = listToNum(l2);
  const resultNum = firstNum + secondNum;
  return numToList(resultNum);
};

// Second approach(Complexity - O(l1 + l2), Memory - O(1))
export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let carryFlag = 0;
  const sumOp = (l: number, r: number) => {
    const uncaped = l + r + carryFlag;
    carryFlag = Math.floor(uncaped / 10);
    return uncaped % 10;
  };

  const resultList = new ListNode(sumOp(l1?.val || 0, l2?.val || 0), null);
  l1 = l1?.next || null;
  l2 = l2?.next || null;

  let curNode = resultList;

  const addNode = (val: number) => {
    curNode.next = new ListNode(val, null);
    curNode = curNode.next;
  }
  while (l1 !== null && l2 !== null) {
    addNode(sumOp(l1.val, l2.val));
    l1 = l1?.next || null;
    l2 = l2?.next || null;
  }
  let leftover = l1 || l2;
  while (leftover !== null) {
    addNode(sumOp(leftover.val, 0));
    leftover = leftover?.next || null;
  }
  if (carryFlag === 1) addNode(1);
  return resultList;
}
