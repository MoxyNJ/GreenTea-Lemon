# the anser is 10
class Solution:
    def largestRectangleArea(self, heights):
        stack = [-1]
        heights = heights + [0]
        res = 0
        for i in range(len(heights)):
            # stack 从小到大排序
            # 如果小， 就出栈，然后做判断：
            while heights[stack[-1]] > heights[i]:
                temp = stack.pop()
                # 遇到高度相等的情况，一并处理
                while stack[-1] == temp:
                    stack.pop()
                    temp -= 1
                area = (i - stack[-1] - 1) * heights[temp]
                if area > res:
                    res = area
            # 如果大/等于 入栈
            stack.append(i)
        return res


# print(Solution().largestRectangleArea([2,1,5,6,2,3]))
print(Solution().largestRectangleArea([2,1,5,6,6,6,2,3]))
