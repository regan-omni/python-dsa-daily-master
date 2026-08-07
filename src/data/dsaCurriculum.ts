import { DailyLesson } from '../types';

export const dsaCurriculum: DailyLesson[] = [
  {
    dayNumber: 1,
    title: 'Big O Notation & Python Time Complexity',
    phaseId: 'phase1',
    phaseName: 'Phase 1: Build the Foundation',
    topic: 'Foundations & Complexity Analysis',
    conceptSummary:
      'Big O notation quantifies how code performance scales as input size (N) grows. In Python, list operations differ in complexity: array indexing `arr[i]` is O(1), but `arr.pop(0)` or `x in list` is O(N). Hash map `dict` lookups `val in d` are O(1) on average. Always evaluate Time Complexity (operations) and Space Complexity (extra memory used).',
    bigOExplanation:
      'O(1) Constant < O(log N) Logarithmic < O(N) Linear < O(N log N) Linearithmic < O(N²) Quadratic < O(2ⁿ) Exponential. Aim for O(N log N) or O(N) in coding interviews.',
    pythonTricks: [
      'Prefer `collections.deque` over `list.pop(0)`: deque is O(1) for left pop, while list is O(N).',
      'Use `set` or `dict` for O(1) membership lookup instead of `list`.',
    ],
    problem: {
      id: 'two-sum',
      title: 'Two Sum',
      difficulty: 'Easy',
      description:
        'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.',
      ],
      examples: [
        { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9.' },
        { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6.' },
      ],
      starterCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Write your O(N) Python solution using a dictionary
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
`,
      testCases: [
        { input: '[2, 7, 11, 15], 9', expected: '[0, 1]' },
        { input: '[3, 2, 4], 6', expected: '[1, 2]' },
        { input: '[3, 3], 6', expected: '[0, 1]' },
      ],
      pythonTips: [
        '`enumerate(nums)` yields index `i` and value `num` concurrently in a single pythonic loop.',
        'Dictionary lookup `complement in seen` is O(1) time complexity.',
      ],
      solutionCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
    },
  },
  {
    dayNumber: 2,
    title: 'Array Frequency Maps & Python Counter',
    phaseId: 'phase1',
    phaseName: 'Phase 1: Build the Foundation',
    topic: 'Arrays & Strings',
    conceptSummary:
      'Counting frequencies of elements in strings or arrays is a fundamental pattern. Instead of writing nested loops (O(N²)), use a hash map or Python `collections.Counter` to achieve O(N) time complexity.',
    bigOExplanation: 'Building a frequency map takes O(N) time and O(K) space where K is the number of unique characters/elements.',
    pythonTricks: [
      'Use `collections.Counter(s)` to count character frequencies in 1 line.',
      '`Counter(s1) == Counter(s2)` checks anagram validity instantly.',
    ],
    problem: {
      id: 'valid-anagram',
      title: 'Valid Anagram',
      difficulty: 'Easy',
      description:
        'Given two strings `s` and `t`, return `True` if `t` is an anagram of `s`, and `False` otherwise. An anagram is formed by rearranging characters of another string using all original letters once.',
      constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
      examples: [
        { input: 's = "anagram", t = "nagaram"', output: 'True' },
        { input: 's = "rat", t = "car"', output: 'False' },
      ],
      starterCode: `from collections import Counter

def is_anagram(s: str, t: str) -> bool:
    # Use collections.Counter or manual dictionary
    if len(s) != len(t):
        return False
    return Counter(s) == Counter(t)
`,
      testCases: [
        { input: '"anagram", "nagaram"', expected: 'True' },
        { input: '"rat", "car"', expected: 'False' },
        { input: '"a", "a"', expected: 'True' },
      ],
      pythonTips: [
        'Short-circuit with `if len(s) != len(t): return False` before counting.',
        '`Counter` in Python is an optimized subclass of `dict`.',
      ],
      solutionCode: `from collections import Counter

def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    return Counter(s) == Counter(t)`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1) for fixed alphabet',
    },
  },
  {
    dayNumber: 3,
    title: 'Two Pointers Pattern (Sorted & Symmetric)',
    phaseId: 'phase2',
    phaseName: 'Phase 2: Logical Progression',
    topic: 'Problem Solving Patterns',
    conceptSummary:
      'The Two Pointers pattern uses two indices (e.g. `left` at start, `right` at end) moving towards each other or in parallel. It reduces nested O(N²) iterations down to linear O(N) time for sorted arrays, palindrome checking, and pair searches.',
    bigOExplanation: 'Two Pointers operates in O(N) time with O(1) auxiliary space since pointers move inward without extra memory.',
    pythonTricks: [
      '`c.isalnum()` checks if a character is alphanumeric.',
      '`s.lower()` normalizes string casing.',
    ],
    problem: {
      id: 'valid-palindrome',
      title: 'Valid Palindrome',
      difficulty: 'Easy',
      description:
        'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Return `True` if it is a palindrome, or `False` otherwise.',
      constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
      examples: [
        { input: 's = "A man, a plan, a canal: Panama"', output: 'True', explanation: '"amanaplanacanalpanama" is a palindrome.' },
        { input: 's = "race a car"', output: 'False', explanation: '"raceacar" is not a palindrome.' },
      ],
      starterCode: `def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True
`,
      testCases: [
        { input: '"A man, a plan, a canal: Panama"', expected: 'True' },
        { input: '"race a car"', expected: 'False' },
        { input: '" "', expected: 'True' },
      ],
      pythonTips: [
        'Inner `while` loops skip non-alphanumeric characters cleanly without building extra strings.',
        'Use `left < right` bound checks in inner loops to prevent index out of bounds.',
      ],
      solutionCode: `def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
    },
  },
  {
    dayNumber: 4,
    title: 'Sliding Window Pattern (Subarrays & Substrings)',
    phaseId: 'phase3',
    phaseName: 'Phase 3: Master Problem Patterns',
    topic: 'Pattern: Sliding Window',
    conceptSummary:
      'The Sliding Window technique tracks a contiguous range of elements. Instead of recalculating properties from scratch for every window (O(N*K)), we incrementally add the right element and contract the left edge when constraints are violated.',
    bigOExplanation: 'Each index enters and exits the window at most once, resulting in O(N) total operations.',
    pythonTricks: [
      'Track character last-seen index with a `dict` to jump `left` pointer instantly: `left = max(left, last_seen[char] + 1)`.',
      'Use `max()` to maintain peak window size.',
    ],
    problem: {
      id: 'longest-substring-without-repeating-characters',
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      description:
        'Given a string `s`, find the length of the longest substring without repeating characters.',
      constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
      examples: [
        { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length 3.' },
        { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with length 1.' },
      ],
      starterCode: `def length_of_longest_substring(s: str) -> int:
    last_seen = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in last_seen and last_seen[char] >= left:
            left = last_seen[char] + 1
        last_seen[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len
`,
      testCases: [
        { input: '"abcabcbb"', expected: '3' },
        { input: '"bbbbb"', expected: '1' },
        { input: '"pwwkew"', expected: '3' },
      ],
      pythonTips: [
        '`last_seen[char] >= left` ensures we only jump left forward if the repeat occurs inside current window.',
        'Length of current window is `right - left + 1`.',
      ],
      solutionCode: `def length_of_longest_substring(s: str) -> int:
    last_seen = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in last_seen and last_seen[char] >= left:
            left = last_seen[char] + 1
        last_seen[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(K) where K is unique characters',
    },
  },
  {
    dayNumber: 5,
    title: 'Fast & Slow Pointers (Floyd\'s Cycle Finding)',
    phaseId: 'phase3',
    phaseName: 'Phase 3: Master Problem Patterns',
    topic: 'Pattern: Fast & Slow Pointers',
    conceptSummary:
      'Floyds Tortoise and Hare algorithm uses two pointers moving through a sequence or Linked List at different speeds (1 step vs 2 steps). If a cycle exists, the fast pointer will eventually overlap with the slow pointer.',
    bigOExplanation: 'Detects cycles in O(N) time with O(1) auxiliary space without requiring a set to track visited nodes.',
    pythonTricks: [
      'In Python, Multiple Assignment `slow, fast = slow.next, fast.next.next` evaluates right-hand expressions first.',
    ],
    problem: {
      id: 'linked-list-cycle',
      title: 'Linked List Cycle Detection',
      difficulty: 'Easy',
      description:
        'Given head of a linked list represented as array pairs or node references, determine if the linked list has a cycle in it. For problem testing in Python, a list or list representation is supplied.',
      constraints: ['The number of nodes is in range [0, 10^4].', '-10^5 <= Node.val <= 10^5'],
      examples: [
        { input: 'head = [3,2,0,-4], pos = 1', output: 'True', explanation: 'There is a cycle where tail connects to 1st node.' },
      ],
      starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def has_cycle(head: ListNode) -> bool:
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
`,
      testCases: [
        { input: '[3, 2, 0, -4], pos=1', expected: 'True' },
        { input: '[1, 2], pos=-1', expected: 'False' },
      ],
      pythonTips: [
        'Always check `while fast and fast.next:` to avoid `AttributeError: NoneType has no attribute next`.',
      ],
      solutionCode: `def has_cycle(head):
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
    },
  },
  {
    dayNumber: 6,
    title: 'Monotonic Stack Pattern',
    phaseId: 'phase3',
    phaseName: 'Phase 3: Master Problem Patterns',
    topic: 'Data Structure: Stack & Monotonic Stack',
    conceptSummary:
      'A Monotonic Stack maintains its elements in strictly increasing or decreasing order. It is the premier pattern for finding the "next greater element" or "next smaller element" in O(N) time.',
    bigOExplanation: 'Each array element is pushed and popped at most once, yielding O(N) amortized time complexity.',
    pythonTricks: [
      'Python lists serve as native LIFO stacks: `stack.append(val)` to push, `stack.pop()` to pop, and `stack[-1]` to peek.',
    ],
    problem: {
      id: 'daily-temperatures',
      title: 'Daily Temperatures',
      difficulty: 'Medium',
      description:
        'Given an array of integers `temperatures` representing daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i-th` day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0`.',
      constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
      examples: [
        { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
      ],
      starterCode: `def daily_temperatures(temperatures: list[int]) -> list[int]:
    ans = [0] * len(temperatures)
    stack = []  # stores indices of temperatures
    for i, temp in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < temp:
            prev_index = stack.pop()
            ans[prev_index] = i - prev_index
        stack.append(i)
    return ans
`,
      testCases: [
        { input: '[73, 74, 75, 71, 69, 72, 76, 73]', expected: '[1, 1, 4, 2, 1, 1, 0, 0]' },
        { input: '[30, 40, 50, 60]', expected: '[1, 1, 1, 0]' },
      ],
      pythonTips: [
        'Store indices rather than raw values on stack so you can compute distances `i - prev_index`.',
      ],
      solutionCode: `def daily_temperatures(temperatures: list[int]) -> list[int]:
    ans = [0] * len(temperatures)
    stack = []
    for i, temp in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < temp:
            prev_index = stack.pop()
            ans[prev_index] = i - prev_index
        stack.append(i)
    return ans`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
    },
  },
  {
    dayNumber: 7,
    title: 'Binary Search & Python Bisect Module',
    phaseId: 'phase2',
    phaseName: 'Phase 2: Logical Progression',
    topic: 'Basic Algorithms: Binary Search',
    conceptSummary:
      'Binary Search splits a sorted search space in half at each step, yielding logarithmic O(log N) runtime. Python includes a built-in module `bisect` for fast binary search.',
    bigOExplanation: 'Logarithmic O(log N) time complexity. N = 1,000,000 requires only ~20 comparisons!',
    pythonTricks: [
      '`import bisect`: `bisect.bisect_left(arr, x)` returns first index where `x` can be inserted to maintain order.',
      '`mid = (low + high) // 2` in Python handles arbitrary large integers without 32-bit overflow!',
    ],
    problem: {
      id: 'binary-search',
      title: 'Binary Search',
      difficulty: 'Easy',
      description:
        'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1.',
      constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All integers in nums are unique.'],
      examples: [
        { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
        { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' },
      ],
      starterCode: `def search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
`,
      testCases: [
        { input: '[-1, 0, 3, 5, 9, 12], 9', expected: '4' },
        { input: '[-1, 0, 3, 5, 9, 12], 2', expected: '-1' },
      ],
      pythonTips: [
        'Python bisect alternative: `idx = bisect.bisect_left(nums, target); return idx if idx < len(nums) and nums[idx] == target else -1`',
      ],
      solutionCode: `def search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
    },
  },
  {
    dayNumber: 8,
    title: 'Heaps & Priority Queues with Python heapq',
    phaseId: 'phase2',
    phaseName: 'Phase 2: Logical Progression',
    topic: 'Trees & Heaps',
    conceptSummary:
      'A Heap is a binary tree where parent nodes satisfy min-heap or max-heap order. Python module `heapq` implements a Min-Heap. `heappush` and `heappop` take O(log K) time. It is perfect for Top-K items and median tracking.',
    bigOExplanation: 'In-place heap conversion `heapify(arr)` takes O(N) time. Push & Pop take O(log N).',
    pythonTricks: [
      'To build a Max-Heap in Python, negate values: push `-val` and pop `-heappop(heap)`.',
      '`heapq.nlargest(k, nums)` and `heapq.nsmallest(k, nums)` find top K items in O(N log K).',
    ],
    problem: {
      id: 'kth-largest-element-in-an-array',
      title: 'Kth Largest Element in an Array',
      difficulty: 'Medium',
      description:
        'Given an integer array `nums` and an integer `k`, return the `k-th` largest element in the array. Note that it is the `k-th` largest element in sorted order, not the `k-th` distinct element.',
      constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
      examples: [
        { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
        { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' },
      ],
      starterCode: `import heapq

def find_kth_largest(nums: list[int], k: int) -> int:
    # Keep a min-heap of size K
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    return min_heap[0]
`,
      testCases: [
        { input: '[3, 2, 1, 5, 6, 4], 2', expected: '5' },
        { input: '[3, 2, 3, 1, 2, 4, 5, 5, 6], 4', expected: '4' },
      ],
      pythonTips: [
        'A Min-Heap of size K retains the K largest elements overall. The smallest among these K elements is `min_heap[0]`, which is the K-th largest!',
      ],
      solutionCode: `import heapq

def find_kth_largest(nums: list[int], k: int) -> int:
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    return min_heap[0]`,
      timeComplexity: 'O(N log K)',
      spaceComplexity: 'O(K)',
    },
  },
  {
    dayNumber: 9,
    title: 'Graph Traversal (BFS & DFS)',
    phaseId: 'phase2',
    phaseName: 'Phase 2: Logical Progression',
    topic: 'Non-linear Structures: Graphs',
    conceptSummary:
      'Graphs represent nodes connected by edges. BFS (Breadth-First Search) uses a Queue (`collections.deque`) to explore level-by-level (finds shortest path in unweighted graph). DFS (Depth-First Search) uses recursion or a Stack to traverse deep into paths.',
    bigOExplanation: 'Graph traversals run in O(V + E) time where V is vertices and E is edges.',
    pythonTricks: [
      'Use `collections.defaultdict(list)` to construct adjacency lists effortlessly.',
      'Always maintain a `visited = set()` to prevent infinite loops in cyclic graphs.',
    ],
    problem: {
      id: 'number-of-islands',
      title: 'Number of Islands',
      difficulty: 'Medium',
      description:
        'Given an `m x n` 2D binary grid `grid` which represents a map of `"1"`s (land) and `"0"`s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
      constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is "0" or "1".'],
      examples: [
        {
          input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
          output: '1',
        },
      ],
      starterCode: `def num_islands(grid: list[list[str]]) -> int:
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    islands = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != "1":
            return
        grid[r][c] = "0"  # mark as visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                islands += 1
                dfs(r, c)
    return islands
`,
      testCases: [
        {
          input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
          expected: '1',
        },
        {
          input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
          expected: '3',
        },
      ],
      pythonTips: [
        'Mutating `grid[r][c] = "0"` in-place saves memory by eliminating the need for an external visited set!',
      ],
      solutionCode: `def num_islands(grid: list[list[str]]) -> int:
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    islands = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != "1":
            return
        grid[r][c] = "0"
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                islands += 1
                dfs(r, c)
    return islands`,
      timeComplexity: 'O(M * N)',
      spaceComplexity: 'O(M * N) recursion stack in worst case',
    },
  },
  {
    dayNumber: 10,
    title: 'Dynamic Programming & functools.cache',
    phaseId: 'phase2',
    phaseName: 'Phase 2: Logical Progression',
    topic: 'Advanced Design: Dynamic Programming',
    conceptSummary:
      'Dynamic Programming breaks problems down into overlapping subproblems. Top-Down DP uses recursion + memoization. Bottom-Up DP uses iterative array tables. Python `@functools.cache` automates top-down memoization in 1 decorator line!',
    bigOExplanation: 'Transforms exponential O(2ⁿ) recursive algorithms into linear O(N) or polynomial O(N²) execution.',
    pythonTricks: [
      '`from functools import cache`: Add `@cache` above any recursive function to memoize return values automatically.',
      '`import sys; sys.setrecursionlimit(200000)` increases maximum recursion depth for CP problems.',
    ],
    problem: {
      id: 'climbing-stairs',
      title: 'Climbing Stairs',
      difficulty: 'Easy',
      description:
        'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
      constraints: ['1 <= n <= 45'],
      examples: [
        { input: 'n = 2', output: '2', explanation: '1. 1 step + 1 step, 2. 2 steps.' },
        { input: 'n = 3', output: '3', explanation: '1. 1+1+1, 2. 1+2, 3. 2+1.' },
      ],
      starterCode: `from functools import cache

def climb_stairs(n: int) -> int:
    @cache
    def dp(i):
        if i <= 2:
            return i
        return dp(i - 1) + dp(i - 2)
    return dp(n)
`,
      testCases: [
        { input: '2', expected: '2' },
        { input: '3', expected: '3' },
        { input: '5', expected: '8' },
      ],
      pythonTips: [
        'Space optimization: Instead of storing full array, maintain two variables `prev1, prev2 = 1, 1`.',
      ],
      solutionCode: `from functools import cache

def climb_stairs(n: int) -> int:
    @cache
    def dp(i):
        if i <= 2:
            return i
        return dp(i - 1) + dp(i - 2)
    return dp(n)`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N) with memoization, O(1) iterative',
    },
  },
];
