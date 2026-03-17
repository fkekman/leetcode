// First aproach(Complexity - O(n^2), memory - O(1))
export function twoSumOld1(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

// Second approach(Complexity - O(2n), memory - O(n))
export function twoSumOld2(nums: number[], target: number): number[] {
  const hmap = Object.fromEntries(nums.map((val, index) => ([val, index])));
  for (let i = 0; i < nums.length; i++) {
    const searchKey = target - nums[i];
    const foundNum = hmap[searchKey];
    if (foundNum !== undefined && foundNum !== i) return [i, foundNum]
  }
  return [];
}

// Third approach, found in solutions, same complexity and memory, but more optimized.
export function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const searchKey = target - nums[i];
    if (map.has(searchKey)) return [map.get(searchKey) as number, i];
    map.set(nums[i], i);
  }
  return [];
}
