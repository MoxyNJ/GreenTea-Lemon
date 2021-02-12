class Solution:
    def maxArea(self, height):
        maxA = 0;
        for i in range(0, len(height) - 1):
            for j in range(i + 1, len(height)):
                area = (j - i) * min(height[i], height[j])
                maxA = max(maxA, area)
        return maxA



s = Solution()
a = s.maxArea([1,8,6,2,5,4,8,3,7])
print(a)