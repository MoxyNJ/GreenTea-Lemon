# 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

# 示例:
# 输入: [0,1,0,3,12]
# 输出: [1,3,12,0,0]

# 说明:
# 1.必须在原数组上操作，不能拷贝额外的数组。
# 2.尽量减少操作次数。
# 链接：https://leetcode-cn.com/problems/move-zeroes

# 我的思路：
# 1. 创建一个新数组和i、j，i从头往后走，j从后往前走。loop 遇到非0放到i位置，遇到0放到j位置
# 2. index 循环（题解）。

# 题解思路：
# loop，i为loop遍历的下标。每当遇到0元素，就需要挪动到最后。那反过来说，遇到一个非零元素，如果数列前面有0元素，这个非零元素就需要往前挪。
# j 就解决了：每遍历到一个非零元素，就调整这个元素在原数组中的位置。j实现的最终效果，是在原数组的位置，从头开始，依次把遍历到非零元素写入、覆盖原数据。
# 在i loop完后，i和j的下标之差，就是0元素的个数，把这些位置填入 0即可。

class Solution(object):
    def __init__(self, nums):
        self.nums = nums
    def moveZeroes(self):
        for 

        return self.nums





s1 = Solution([0,1,0,3,12]).moveZeroes()
print(s1)