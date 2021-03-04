class Solution(object):
    def maxSlidingWindow(self, nums, k):
        deque = []
        ans = []
        for i in range(len(nums)):
            if deque and deque[0] <= i - k:
                deque.pop(0)
            while deque and nums[i] > nums[deque[-1]]:
                deque.pop()
            deque.append(i)
            ans.append(nums[deque[0]])
        return ans[k-1:]
    
print(Solution().maxSlidingWindow([1,3,1,2,0,5], 3))
# [3,3,2,5]