class Solution(object):
    def maxSlidingWindow(self, nums, k):
        q = []
        res = []
        for i in range(len(nums)):
            if not q:
                q.append(i)
            else:
                if i == q[0] + k:
                    q.pop(0)
                while q and nums[q[-1]] < nums[i]:
                    q.pop()
                q.append(i)
            res.append(nums[q[0]])
        # 返回 k-1 到 末尾
        return res[k-1:]
    
print(Solution().maxSlidingWindow([1,3,1,2,0,5], 3))
# [3,3,2,5]