class Solution {
    // public int maxArea(int[] height) {
    //     int max = 0;
    //     for (int i = 0, j = height.length - 1; i < j;  ) {
    //         int minHeight = height[i] > height[j] ? height[j--] : height[i++];
    //         int area = (j - i + 1) * minHeight;
    //         max = Math.max(area, max);
    //         System.out.println("i:" + i + ", j:" + j + "," +minHeight);
    //     }
    //     return max;
    // }   
    
    public int maxArea(int[] height) {
        int max = 0;
        for (int i = 0, j = height.length - 1; i < j;  ) {
            int area = (j - i) * Math.min(height[i], height[j]);
            max = Math.max(area, max);
            int minheight = height[i] > height[j] ? height[j--] : height[i++];
        }
        return max;
    }   

    public static void main(String[]args){
        int[] a = {1,8,6,2,5,4,8,3,7};
        Solution area = new Solution();
        int s = area.maxArea(a);
        System.out.println(s);
    }
}

