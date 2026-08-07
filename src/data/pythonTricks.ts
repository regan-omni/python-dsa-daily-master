import { PythonTrick } from '../types';

export const pythonTricks: PythonTrick[] = [
  {
    id: 'trick-1',
    title: 'collections.defaultdict for O(1) Missing Key Handling',
    category: 'Data Structures',
    code: `from collections import defaultdict

# Instead of checking 'if key not in d: d[key] = []'
graph = defaultdict(list)
graph['A'].append('B')  # Automatically initializes [] for missing key

counts = defaultdict(int)
counts['apple'] += 1    # Automatically defaults to 0`,
    explanation:
      '`defaultdict` takes a factory function (`list`, `int`, `set`, `dict`) and automatically populates missing keys with default values upon access.',
    whenToUse: 'Graph adjacency lists, frequency counting, grouping items by key.',
    timeSavingNote: 'Saves 3 lines of boilerplate check per dict insert.',
  },
  {
    id: 'trick-2',
    title: 'collections.Counter Multi-Set Magic & .most_common()',
    category: 'Data Structures',
    code: `from collections import Counter

nums = [1, 1, 2, 3, 3, 3, 4]
counts = Counter(nums)

# Get top K frequent elements:
top_2 = counts.most_common(2) # [(3, 3), (1, 2)]

# Counter arithmetic:
c1 = Counter('aab')
c2 = Counter('abc')
print(c1 & c2) # Counter({'a': 1, 'b': 1}) - Intersection`,
    explanation:
      '`Counter` is an optimized dict subclass designed specifically for tallying elements. It offers set-like operations (`&`, `|`, `+`, `-`) and `.most_common(k)`.',
    whenToUse: 'Frequency distribution, anagrams, top-K frequent elements, string matching.',
    timeSavingNote: 'Turns multi-line counting algorithms into a 1-line standard call.',
  },
  {
    id: 'trick-3',
    title: 'collections.deque for O(1) Double-Ended Queue Operations',
    category: 'Data Structures',
    code: `from collections import deque

queue = deque([1, 2, 3])
queue.append(4)       # O(1) right push
first = queue.popleft() # O(1) left pop (DO NOT use list.pop(0) which is O(N))

# Fixed length sliding window:
window = deque(maxlen=3)
window.extend([10, 20, 30, 40]) # Automatically drops 10`,
    explanation:
      'Standard Python lists are dynamic arrays, making `list.pop(0)` an $O(N)$ memory shift operation. `deque` is built as a doubly-linked block array with $O(1)$ appends and pops on both ends.',
    whenToUse: 'Breadth-First Search (BFS), Sliding Window, Queue simulation.',
    timeSavingNote: 'Avoids Time Limit Exceeded (TLE) in BFS graph problems.',
  },
  {
    id: 'trick-4',
    title: 'heapq Min-Heap & Max-Heap Inversion Hack',
    category: 'Algorithms',
    code: `import heapq

# Min-Heap (default)
heap = [5, 1, 3]
heapq.heapify(heap)    # O(N) in-place transformation
smallest = heapq.heappop(heap) # 1

# Max-Heap Trick: Negate all values!
max_heap = [-x for x in [5, 1, 3]]
heapq.heapify(max_heap)
largest = -heapq.heappop(max_heap) # 5`,
    explanation:
      'Python only provides a Min-Heap by default. To simulate a Max-Heap, multiply numbers by `-1` upon insertion and multiply by `-1` again when popping.',
    whenToUse: 'Priority queues, Median tracking, Kth largest/smallest elements, Dijkstra algorithm.',
    timeSavingNote: 'Zero external library required for priority queue operations.',
  },
  {
    id: 'trick-5',
    title: 'bisect Binary Search (bisect_left vs bisect_right)',
    category: 'Algorithms',
    code: `import bisect

arr = [1, 2, 4, 4, 4, 7, 9]

# Find index of first element >= 4
left = bisect.bisect_left(arr, 4)  # Index 2

# Find index of first element > 4
right = bisect.bisect_right(arr, 4) # Index 5

# Count occurrences of 4 in sorted array:
count = right - left               # 3`,
    explanation:
      '`bisect` performs C-optimized binary search on sorted Python sequences in $O(\\log N)$ time.',
    whenToUse: 'Searching insertion points in sorted arrays, range queries, Longest Increasing Subsequence (LIS).',
    timeSavingNote: 'Prevents writing manual binary search loops with off-by-one errors.',
  },
  {
    id: 'trick-6',
    title: 'functools.cache Automatic Top-Down DP Memoization',
    category: 'Syntax Magic',
    code: `from functools import cache

@cache
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

# Calling fib(100) takes milliseconds instead of 1000 years!`,
    explanation:
      'The `@cache` decorator (Python 3.9+) wraps a function with an unbounded LRU cache, memoizing return values based on input arguments automatically.',
    whenToUse: 'Dynamic Programming, recursive tree exploration, backtracking with memoization.',
    timeSavingNote: 'Eliminates manually instantiating `memo = {}` dicts.',
  },
  {
    id: 'trick-7',
    title: 'Bitwise Hacks: Clear Lowest Set Bit & Parity',
    category: 'Bitwise',
    code: `n = 12 # 1100 in binary

# 1. Clear lowest set bit:
n_cleared = n & (n - 1)  # 1000 (8)

# 2. Extract lowest set bit:
lowest_bit = n & (-n)     # 0100 (4)

# 3. Check power of two:
is_pow_of_2 = (n > 0) and (n & (n - 1) == 0)

# 4. XOR Swap without extra variable:
a, b = 5, 9
a ^= b; b ^= a; a ^= b`,
    explanation:
      'Bitwise operations operate directly at binary bit level in $O(1)$ CPU cycles. `n & (n - 1)` removes the lowest 1-bit in constant time.',
    whenToUse: 'Counting set bits (Hamming Weight), subset generation, bitmasks, Fenwick trees.',
    timeSavingNote: 'Reduces loop iterations from bit length down to the count of 1-bits.',
  },
  {
    id: 'trick-8',
    title: 'Matrix Transposition & 2D Slicing with zip(*grid)',
    category: 'Syntax Magic',
    code: `matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

# Transpose matrix (swap rows and columns):
transposed = list(zip(*matrix))
# [(1, 4, 7), (2, 5, 8), (3, 6, 9)]

# Rotate 90 degrees clockwise:
rotated = [list(row[::-1]) for row in zip(*matrix)]`,
    explanation:
      'Unpacking `*matrix` passes each row as an argument to `zip()`, grouping column elements together into tuples.',
    whenToUse: 'Matrix manipulation, grid rotation, Sudoku checkers, Word Search problems.',
    timeSavingNote: 'Turns a nested 2-level loop matrix flip into 1 pythonic line.',
  },
  {
    id: 'trick-9',
    title: 'itertools Permutations, Combinations & Accumulate',
    category: 'Standard Library',
    code: `import itertools

items = [1, 2, 3]

# Generate all permutations (order matters):
perms = list(itertools.permutations(items, 2)) # [(1,2), (1,3), ...]

# Generate all combinations (order doesn't matter):
combs = list(itertools.combinations(items, 2)) # [(1,2), (1,3), (2,3)]

# Prefix sums in 1 line:
prefix = list(itertools.accumulate([1, 2, 3, 4])) # [1, 3, 6, 10]`,
    explanation:
      '`itertools` provides highly optimized iterator building blocks implemented in C.',
    whenToUse: 'Prefix sum arrays, combinatorial searches, brute-force state generators.',
    timeSavingNote: 'Avoids writing complex recursive backtracking code for simple subset permutations.',
  },
  {
    id: 'trick-10',
    title: 'Fast I/O & Recursion Depth Customization',
    category: 'Speed & Memory',
    code: `import sys

# 1. Increase recursion limit for deep DFS (default is 1000):
sys.setrecursionlimit(200000)

# 2. Fast Input Reading for competitive programming:
input_data = sys.stdin.read().split() # Reads all tokens into memory at once`,
    explanation:
      'Competitive programming platforms test against deep trees (up to 10^5 depth) and heavy input files (10^6 lines). Custom recursion depth prevents `RecursionError`.',
    whenToUse: 'Large input competitive programming, deep tree/graph DFS traversals.',
    timeSavingNote: 'Prevents standard `sys.stdin.readline` I/O bottlenecks and recursion stack crashes.',
  },
];
