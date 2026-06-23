// ===== AUTH / SIGN-IN =====
let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

function saveUser(user) {
  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
  updateAuthUI();
}

function updateAuthUI() {
  const btnSignin = document.getElementById('btnSignin');
  const profile = document.getElementById('userProfile');
  const avatar = document.getElementById('userAvatar');
  const name = document.getElementById('userName');
  if (currentUser) {
    btnSignin.style.display = 'none';
    profile.style.display = 'flex';
    avatar.src = currentUser.picture || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="80" x="18">👤</text></svg>';
    name.textContent = currentUser.name || currentUser.email || 'User';
  } else {
    btnSignin.style.display = '';
    profile.style.display = 'none';
  }
}

function openSigninModal() {
  document.getElementById('signinModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSigninModal() {
  document.getElementById('signinModal').classList.remove('open');
  document.body.style.overflow = '';
}

function signInAsGuest() {
  saveUser({
    sub: 'guest_' + Date.now(),
    name: 'Guest',
    email: 'guest@codepglu.local',
    picture: ''
  });
  closeSigninModal();
  reloadPurchased();
  renderNotes();
  showToast('👋 Signed in as Guest');
}

function signOut() {
  if (window.google?.accounts?.id) {
    google.accounts.id.disableAutoSelect();
  }
  saveUser(null);
  reloadPurchased();
  renderNotes();
  showToast('Signed out');
  // Close mobile menu if open
  document.getElementById('navToggle').classList.remove('active');
  document.getElementById('navMenu').classList.remove('active');
}

window.handleGoogleCredential = function(response) {
  const data = jwtDecode(response.credential);
  saveUser({
    sub: data.sub,
    name: data.name,
    email: data.email,
    picture: data.picture
  });
  closeSigninModal();
  reloadPurchased();
  renderNotes();
  showToast(`👋 Welcome, ${data.name}!`);
};

// Google Sign-In callback
window.handleGoogleCredential = function(response) {
  const data = jwtDecode(response.credential);
  saveUser({
    sub: data.sub,
    name: data.name,
    email: data.email,
    picture: data.picture
  });
  closeSigninModal();
  showToast(`👋 Welcome, ${data.name}!`);
};

// Minimal JWT decoder for Google's credential
function jwtDecode(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch(e) {
    return { name: 'User', email: '', sub: '', picture: '' };
  }
}

// ===== NEETCODE 250 DATA =====
const LC_BASE = 'https://leetcode.com/problems/';

function toLCSlug(name) {
  let slug = name.toLowerCase();
  slug = slug.replace(/[^a-z0-9\s-]/g, '');
  slug = slug.replace(/\s+/g, '-');
  slug = slug.replace(/-+/g, '-');
  slug = slug.replace(/^-|-$/g, '');
  return slug;
}

const neetcodeData = [
  { topic: "Arrays & Hashing", count: 22, problems: [
    { name: "Contains Duplicate", difficulty: "Easy" },
    { name: "Valid Anagram", difficulty: "Easy" },
    { name: "Two Sum", difficulty: "Easy" },
    { name: "Group Anagrams", difficulty: "Medium" },
    { name: "Top K Frequent Elements", difficulty: "Medium" },
    { name: "Product of Array Except Self", difficulty: "Medium" },
    { name: "Valid Sudoku", difficulty: "Medium" },
    { name: "Encode and Decode Strings", difficulty: "Medium" },
    { name: "Longest Consecutive Sequence", difficulty: "Medium" },
    { name: "Replace Elements with Greatest Element on Right Side", difficulty: "Easy" },
    { name: "Remove Element", difficulty: "Easy" },
    { name: "Remove Duplicates from Sorted Array", difficulty: "Easy" },
    { name: "Remove Duplicates from Sorted Array II", difficulty: "Medium" },
    { name: "Majority Element", difficulty: "Easy" },
    { name: "Rotate Array", difficulty: "Medium" },
    { name: "Best Time to Buy and Sell Stock", difficulty: "Easy" },
    { name: "Best Time to Buy and Sell Stock II", difficulty: "Medium" },
    { name: "Jump Game", difficulty: "Medium" },
    { name: "H-Index", difficulty: "Medium" },
    { name: "Insert Delete GetRandom O(1)", difficulty: "Medium" },
    { name: "First Missing Positive", difficulty: "Hard" },
    { name: "Longest Substring Without Repeating Characters", difficulty: "Medium" }
  ]},
  { topic: "Two Pointers", count: 13, problems: [
    { name: "Valid Palindrome", difficulty: "Easy" },
    { name: "Two Sum II - Input Array Is Sorted", difficulty: "Medium" },
    { name: "3Sum", difficulty: "Medium" },
    { name: "Container With Most Water", difficulty: "Medium" },
    { name: "Trapping Rain Water", difficulty: "Hard" },
    { name: "Is Subsequence", difficulty: "Easy" },
    { name: "Two Sum Less Than K", difficulty: "Easy" },
    { name: "3Sum Closest", difficulty: "Medium" },
    { name: "3Sum Smaller", difficulty: "Medium" },
    { name: "Subarray Product Less Than K", difficulty: "Medium" },
    { name: "Valid Palindrome II", difficulty: "Easy" },
    { name: "Sort Colors", difficulty: "Medium" },
    { name: "Minimum Size Subarray Sum", difficulty: "Medium" }
  ]},
  { topic: "Sliding Window", count: 9, problems: [
    { name: "Best Time to Buy and Sell Stock", difficulty: "Easy" },
    { name: "Longest Substring Without Repeating Characters", difficulty: "Medium" },
    { name: "Longest Repeating Character Replacement", difficulty: "Medium" },
    { name: "Permutation in String", difficulty: "Medium" },
    { name: "Minimum Window Substring", difficulty: "Hard" },
    { name: "Sliding Window Maximum", difficulty: "Hard" },
    { name: "Minimum Size Subarray Sum", difficulty: "Medium" },
    { name: "Fruit Into Baskets", difficulty: "Medium" },
    { name: "Longest Subarray of 1's After Deleting One Element", difficulty: "Medium" }
  ]},
  { topic: "Stack", count: 14, problems: [
    { name: "Valid Parentheses", difficulty: "Easy" },
    { name: "Min Stack", difficulty: "Medium" },
    { name: "Evaluate Reverse Polish Notation", difficulty: "Medium" },
    { name: "Generate Parentheses", difficulty: "Medium" },
    { name: "Daily Temperatures", difficulty: "Medium" },
    { name: "Car Fleet", difficulty: "Medium" },
    { name: "Largest Rectangle in Histogram", difficulty: "Hard" },
    { name: "Baseball Game", difficulty: "Easy" },
    { name: "Remove All Adjacent Duplicates in String", difficulty: "Easy" },
    { name: "Remove All Adjacent Duplicates in String II", difficulty: "Medium" },
    { name: "Simplify Path", difficulty: "Medium" },
    { name: "Asteroid Collision", difficulty: "Medium" },
    { name: "Decode String", difficulty: "Medium" },
    { name: "Online Stock Span", difficulty: "Medium" }
  ]},
  { topic: "Binary Search", count: 14, problems: [
    { name: "Binary Search", difficulty: "Easy" },
    { name: "Search a 2D Matrix", difficulty: "Medium" },
    { name: "Find Minimum in Rotated Sorted Array", difficulty: "Medium" },
    { name: "Search in Rotated Sorted Array", difficulty: "Medium" },
    { name: "Time Based Key-Value Store", difficulty: "Medium" },
    { name: "Find Peak Element", difficulty: "Medium" },
    { name: "Koko Eating Bananas", difficulty: "Medium" },
    { name: "First Bad Version", difficulty: "Easy" },
    { name: "Search Insert Position", difficulty: "Easy" },
    { name: "Guess Number Higher or Lower", difficulty: "Easy" },
    { name: "Sqrt(x)", difficulty: "Easy" },
    { name: "Find First and Last Position of Element in Sorted Array", difficulty: "Medium" },
    { name: "Find Minimum in Rotated Sorted Array II", difficulty: "Hard" },
    { name: "Median of Two Sorted Arrays", difficulty: "Hard" }
  ]},
  { topic: "Linked List", count: 14, problems: [
    { name: "Reverse Linked List", difficulty: "Easy" },
    { name: "Merge Two Sorted Lists", difficulty: "Easy" },
    { name: "Linked List Cycle", difficulty: "Easy" },
    { name: "Remove Nth Node From End of List", difficulty: "Medium" },
    { name: "Reorder List", difficulty: "Medium" },
    { name: "Add Two Numbers", difficulty: "Medium" },
    { name: "Copy List with Random Pointer", difficulty: "Medium" },
    { name: "Find the Duplicate Number", difficulty: "Medium" },
    { name: "LRU Cache", difficulty: "Medium" },
    { name: "Middle of the Linked List", difficulty: "Easy" },
    { name: "Palindrome Linked List", difficulty: "Easy" },
    { name: "Remove Linked List Elements", difficulty: "Easy" },
    { name: "Intersection of Two Linked Lists", difficulty: "Easy" },
    { name: "Sort List", difficulty: "Medium" }
  ]},
  { topic: "Trees", count: 23, problems: [
    { name: "Maximum Depth of Binary Tree", difficulty: "Easy" },
    { name: "Invert Binary Tree", difficulty: "Easy" },
    { name: "Same Tree", difficulty: "Easy" },
    { name: "Subtree of Another Tree", difficulty: "Easy" },
    { name: "Diameter of Binary Tree", difficulty: "Easy" },
    { name: "Balanced Binary Tree", difficulty: "Easy" },
    { name: "Binary Tree Level Order Traversal", difficulty: "Medium" },
    { name: "Lowest Common Ancestor of BST", difficulty: "Medium" },
    { name: "Binary Tree Right Side View", difficulty: "Medium" },
    { name: "Kth Smallest Element in a BST", difficulty: "Medium" },
    { name: "Construct Binary Tree from Preorder and Inorder", difficulty: "Medium" },
    { name: "Serialize and Deserialize Binary Tree", difficulty: "Hard" },
    { name: "Validate Binary Search Tree", difficulty: "Medium" },
    { name: "Binary Tree Maximum Path Sum", difficulty: "Hard" },
    { name: "Binary Tree Zigzag Level Order Traversal", difficulty: "Medium" },
    { name: "Count Good Nodes in Binary Tree", difficulty: "Medium" },
    { name: "Path Sum", difficulty: "Easy" },
    { name: "Path Sum II", difficulty: "Medium" },
    { name: "Sum Root to Leaf Numbers", difficulty: "Medium" },
    { name: "Flatten Binary Tree to Linked List", difficulty: "Medium" },
    { name: "Populating Next Right Pointers in Each Node", difficulty: "Medium" },
    { name: "Binary Tree Inorder Traversal", difficulty: "Easy" },
    { name: "Unique Binary Search Trees", difficulty: "Medium" }
  ]},
  { topic: "Heap / Priority Queue", count: 12, problems: [
    { name: "Kth Largest Element in a Stream", difficulty: "Easy" },
    { name: "Last Stone Weight", difficulty: "Easy" },
    { name: "K Closest Points to Origin", difficulty: "Medium" },
    { name: "Kth Largest Element in an Array", difficulty: "Medium" },
    { name: "Task Scheduler", difficulty: "Medium" },
    { name: "Design Twitter", difficulty: "Medium" },
    { name: "Find Median from Data Stream", difficulty: "Hard" },
    { name: "Top K Frequent Words", difficulty: "Medium" },
    { name: "Minimum Cost to Connect Sticks", difficulty: "Medium" },
    { name: "Kth Smallest Element in a Sorted Matrix", difficulty: "Medium" },
    { name: "Reorganize String", difficulty: "Medium" },
    { name: "Maximum Performance of a Team", difficulty: "Hard" }
  ]},
  { topic: "Backtracking", count: 17, problems: [
    { name: "Subsets", difficulty: "Medium" },
    { name: "Combinations", difficulty: "Medium" },
    { name: "Permutations", difficulty: "Medium" },
    { name: "Subsets II", difficulty: "Medium" },
    { name: "Combination Sum", difficulty: "Medium" },
    { name: "Combination Sum II", difficulty: "Medium" },
    { name: "Word Search", difficulty: "Medium" },
    { name: "Palindrome Partitioning", difficulty: "Medium" },
    { name: "Letter Combinations of a Phone Number", difficulty: "Medium" },
    { name: "N-Queens", difficulty: "Hard" },
    { name: "Generate Parentheses", difficulty: "Medium" },
    { name: "Permutations II", difficulty: "Medium" },
    { name: "Restore IP Addresses", difficulty: "Medium" },
    { name: "Matchsticks to Square", difficulty: "Medium" },
    { name: "Split Array into Fibonacci Sequence", difficulty: "Medium" },
    { name: "Rat in a Maze", difficulty: "Medium" },
    { name: "Sudoku Solver", difficulty: "Hard" }
  ]},
  { topic: "Tries", count: 4, problems: [
    { name: "Implement Trie (Prefix Tree)", difficulty: "Medium" },
    { name: "Design Add and Search Words Data Structure", difficulty: "Medium" },
    { name: "Word Search II", difficulty: "Hard" },
    { name: "Longest Word in Dictionary", difficulty: "Medium" }
  ]},
  { topic: "Graphs", count: 21, problems: [
    { name: "Number of Islands", difficulty: "Medium" },
    { name: "Max Area of Island", difficulty: "Medium" },
    { name: "Clone Graph", difficulty: "Medium" },
    { name: "Course Schedule", difficulty: "Medium" },
    { name: "Course Schedule II", difficulty: "Medium" },
    { name: "Pacific Atlantic Water Flow", difficulty: "Medium" },
    { name: "Surrounded Regions", difficulty: "Medium" },
    { name: "Rotting Oranges", difficulty: "Medium" },
    { name: "Word Ladder", difficulty: "Hard" },
    { name: "Alien Dictionary", difficulty: "Hard" },
    { name: "Redundant Connection", difficulty: "Medium" },
    { name: "Graph Valid Tree", difficulty: "Medium" },
    { name: "Number of Connected Components", difficulty: "Medium" },
    { name: "Minimum Height Trees", difficulty: "Medium" },
    { name: "Walls and Gates", difficulty: "Medium" },
    { name: "Flood Fill", difficulty: "Easy" },
    { name: "01 Matrix", difficulty: "Medium" },
    { name: "Island Perimeter", difficulty: "Easy" },
    { name: "Find the Town Judge", difficulty: "Easy" },
    { name: "All Paths From Source to Target", difficulty: "Medium" },
    { name: "Shortest Path in Binary Matrix", difficulty: "Medium" }
  ]},
  { topic: "Advanced Graphs", count: 10, problems: [
    { name: "Reconstruct Itinerary", difficulty: "Hard" },
    { name: "Min Cost to Connect All Points", difficulty: "Medium" },
    { name: "Network Delay Time", difficulty: "Medium" },
    { name: "Swim in Rising Water", difficulty: "Hard" },
    { name: "Cheapest Flights Within K Stops", difficulty: "Medium" },
    { name: "Find Critical and Pseudo-Critical Edges", difficulty: "Hard" },
    { name: "Minimum Cost to Make at Least One Valid Path", difficulty: "Hard" },
    { name: "Minimum Obstacle Removal to Reach Corner", difficulty: "Hard" },
    { name: "Maximum Number of Accepted Invitations", difficulty: "Hard" },
    { name: "Bus Routes", difficulty: "Hard" }
  ]},
  { topic: "1-D Dynamic Programming", count: 17, problems: [
    { name: "Climbing Stairs", difficulty: "Easy" },
    { name: "Min Cost Climbing Stairs", difficulty: "Easy" },
    { name: "House Robber", difficulty: "Medium" },
    { name: "House Robber II", difficulty: "Medium" },
    { name: "Longest Palindromic Substring", difficulty: "Medium" },
    { name: "Palindromic Substrings", difficulty: "Medium" },
    { name: "Decode Ways", difficulty: "Medium" },
    { name: "Coin Change", difficulty: "Medium" },
    { name: "Maximum Product Subarray", difficulty: "Medium" },
    { name: "Word Break", difficulty: "Medium" },
    { name: "Longest Increasing Subsequence", difficulty: "Medium" },
    { name: "Partition Equal Subset Sum", difficulty: "Medium" },
    { name: "Best Time to Buy and Sell Stock with Cooldown", difficulty: "Medium" },
    { name: "Best Time to Buy and Sell Stock IV", difficulty: "Hard" },
    { name: "Russian Doll Envelopes", difficulty: "Hard" },
    { name: "Maximal Square", difficulty: "Medium" },
    { name: "Target Sum", difficulty: "Medium" }
  ]},
  { topic: "2-D Dynamic Programming", count: 16, problems: [
    { name: "Unique Paths", difficulty: "Medium" },
    { name: "Longest Common Subsequence", difficulty: "Medium" },
    { name: "Edit Distance", difficulty: "Medium" },
    { name: "Distinct Subsequences", difficulty: "Hard" },
    { name: "Interleaving String", difficulty: "Medium" },
    { name: "Best Time to Buy and Sell Stock III", difficulty: "Hard" },
    { name: "Burst Balloons", difficulty: "Hard" },
    { name: "Regular Expression Matching", difficulty: "Hard" },
    { name: "Minimum Path Sum", difficulty: "Medium" },
    { name: "Triangle", difficulty: "Medium" },
    { name: "Coin Change II", difficulty: "Medium" },
    { name: "Target Sum", difficulty: "Medium" },
    { name: "Ones and Zeroes", difficulty: "Medium" },
    { name: "Stone Game", difficulty: "Medium" },
    { name: "Knight Probability in Chessboard", difficulty: "Medium" },
    { name: "Cherry Pickup", difficulty: "Hard" }
  ]},
  { topic: "Greedy", count: 14, problems: [
    { name: "Maximum Subarray", difficulty: "Medium" },
    { name: "Jump Game", difficulty: "Medium" },
    { name: "Jump Game II", difficulty: "Medium" },
    { name: "Gas Station", difficulty: "Medium" },
    { name: "Hand of Straights", difficulty: "Medium" },
    { name: "Merge Triplets to Form Target", difficulty: "Medium" },
    { name: "Partition Labels", difficulty: "Medium" },
    { name: "Valid Parenthesis String", difficulty: "Medium" },
    { name: "Assign Cookies", difficulty: "Easy" },
    { name: "Can Place Flowers", difficulty: "Easy" },
    { name: "Minimum Number of Arrows to Burst Balloons", difficulty: "Medium" },
    { name: "Non-overlapping Intervals", difficulty: "Medium" },
    { name: "Maximum Units on a Truck", difficulty: "Easy" },
    { name: "Minimum Time to Make Rope Colorful", difficulty: "Medium" }
  ]},
  { topic: "Intervals", count: 7, problems: [
    { name: "Insert Interval", difficulty: "Medium" },
    { name: "Merge Intervals", difficulty: "Medium" },
    { name: "Non-overlapping Intervals", difficulty: "Medium" },
    { name: "Meeting Rooms", difficulty: "Easy" },
    { name: "Meeting Rooms II", difficulty: "Medium" },
    { name: "Minimum Interval to Include Each Query", difficulty: "Hard" },
    { name: "Employee Free Time", difficulty: "Hard" }
  ]},
  { topic: "Math & Geometry", count: 13, problems: [
    { name: "Happy Number", difficulty: "Easy" },
    { name: "Plus One", difficulty: "Easy" },
    { name: "Rotate Image", difficulty: "Medium" },
    { name: "Spiral Matrix", difficulty: "Medium" },
    { name: "Set Matrix Zeroes", difficulty: "Medium" },
    { name: "Pow(x, n)", difficulty: "Medium" },
    { name: "Multiply Strings", difficulty: "Medium" },
    { name: "Detect Squares", difficulty: "Medium" },
    { name: "Sell Diminishing-Valued Colored Balls", difficulty: "Medium" },
    { name: "Rectangle Area", difficulty: "Medium" },
    { name: "Minimum Time Visiting All Points", difficulty: "Easy" },
    { name: "Check If It Is a Straight Line", difficulty: "Easy" },
    { name: "Angle Between Hands of a Clock", difficulty: "Medium" }
  ]},
  { topic: "Bit Manipulation", count: 10, problems: [
    { name: "Single Number", difficulty: "Easy" },
    { name: "Number of 1 Bits", difficulty: "Easy" },
    { name: "Counting Bits", difficulty: "Easy" },
    { name: "Reverse Bits", difficulty: "Easy" },
    { name: "Missing Number", difficulty: "Easy" },
    { name: "Sum of Two Integers", difficulty: "Medium" },
    { name: "Reverse Integer", difficulty: "Medium" },
    { name: "Power of Two", difficulty: "Easy" },
    { name: "Subsets", difficulty: "Medium" },
    { name: "Maximum XOR of Two Numbers in an Array", difficulty: "Medium" }
  ]}
];

// ===== NOTES DATA =====
const notesData = [
  { title: "Arrays & Hashing", desc: "Comprehensive notes on array manipulations and hashing techniques.", file: "arrays-neetcode-notes(by ishu).pdf", icon: "📊", tag: "NeetCode", price: 0 },
  { title: "Dynamic Programming", desc: "Master DP with state definitions, recursion, and tabulation.", file: "dp-notes-by-ishu.pdf", icon: "🧠", tag: "Advanced", price: 9 },
  { title: "Linked List", desc: "Pointer manipulation, reversal, cycle detection and more.", file: "linkedlistbyishu.pdf", icon: "🔗", tag: "NeetCode", price: 9 },
  { title: "Stacks", desc: "LIFO operations, monotonic stack patterns, and problem solving.", file: "stacks by ishu for ishu.pdf", icon: "📚", tag: "NeetCode", price: 9 },
  { title: "Khidki (Window)", desc: "Sliding window patterns with two pointers and optimization.", file: "khidki-notes-by-ishu.pdf", icon: "🪟", tag: "Extra", price: 9 }
];

// ===== DOM REFS =====
const notesGrid = document.getElementById('notesGrid');
const ncTopics = document.getElementById('ncTopics');
const pdfModal = document.getElementById('pdfModal');
const pdfFrame = document.getElementById('pdfFrame');
const modalTitle = document.getElementById('modalTitle');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const toast = document.getElementById('toast');

// ===== NAVBAR =====
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  // Highlight active nav link
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 150;
    if (window.scrollY >= top) current = s.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
  // Baddie floats glow brighter on scroll — FULL DOMINATION MODE
  const floats = document.querySelector('.baddie-floats');
  if (floats) {
    const scrollPercent = Math.min(window.scrollY / (window.innerHeight * 0.3), 1);
    floats.style.setProperty('--scroll-glow', scrollPercent);
    if (scrollPercent > 0.35) {
      floats.classList.add('intense');
    } else {
      floats.classList.remove('intense');
    }
  }
});

// ===== ANIMATE ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ===== STATS COUNTER =====
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));

function animateCounter(el, target) {
  let current = 0;
  const step = Math.max(1, Math.floor(target / 60));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(interval); }
    el.textContent = current;
  }, 25);
}

// ===== PURCHASED TRACKING =====
function getPurchasedKey() {
  return 'purchased_' + (currentUser ? currentUser.sub : 'guest');
}

let purchased = JSON.parse(localStorage.getItem(getPurchasedKey()) || '{}');

function reloadPurchased() {
  purchased = JSON.parse(localStorage.getItem(getPurchasedKey()) || '{}');
}

function savePurchased() {
  localStorage.setItem(getPurchasedKey(), JSON.stringify(purchased));
}

function isPurchased(noteTitle) {
  return noteTitle === 'Arrays & Hashing' || purchased[noteTitle] === true;
}

// ===== NOTES GRID =====
// (renderNotes() is called at the end of the script)

// ===== CHECKOUT MODAL =====
function showCheckout(note) {
  document.getElementById('checkoutTitle').textContent = note.title;
  document.getElementById('checkoutAmount').textContent = '₹' + note.price;
  document.getElementById('checkoutAmountBtn').textContent = '₹' + note.price;
  document.getElementById('checkoutNote').value = note.title;
  document.getElementById('checkoutModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('upiInput').value = '';
  document.querySelector('.checkout-pay-btn').disabled = false;
  document.querySelector('.checkout-pay-btn').textContent = 'Pay ₹' + note.price;
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
  document.body.style.overflow = '';
}

function processPayment() {
  const upiId = document.getElementById('upiInput').value.trim();
  const noteTitle = document.getElementById('checkoutNote').value;

  if (!upiId || !upiId.includes('@')) {
    showToast('Please enter a valid UPI ID (e.g. name@upi).');
    return;
  }

  const btn = document.querySelector('.checkout-pay-btn');
  btn.textContent = '⏳ Processing...';
  btn.disabled = true;

  // Simulate payment
  setTimeout(() => {
    if (!currentUser) {
      showToast('⚠️ Please sign in first so your purchases are saved.');
      btn.disabled = false;
      btn.textContent = 'Pay ₹9';
      return;
    }
    purchased[noteTitle] = true;
    savePurchased();
    closeCheckout();
    showToast(`✅ Payment successful! ${noteTitle} is now unlocked.`);
    btn.textContent = '✅ Paid - View Notes';
    btn.disabled = false;
    document.getElementById('upiInput').value = '';
    // Re-render notes to show unlocked state
    renderNotes();
  }, 2000);
}

function renderNotes() {
  notesGrid.innerHTML = '';
  notesData.forEach((note, idx) => {
    const card = document.createElement('div');
    card.className = 'note-card animate-on-scroll';
    card.style.animationDelay = `${idx * 0.08}s`;
    const free = note.price === 0;
    const bought = isPurchased(note.title);
    const canAccess = free || bought;
    card.innerHTML = `
      <div class="note-card-top">
        <div class="note-icon">${note.icon}</div>
        <span class="price-badge ${free ? 'price-free' : (bought ? 'price-bought' : 'price-paid')}">
          ${free ? 'Free' : (bought ? '✓ Owned' : '₹' + note.price)}
        </span>
      </div>
      <h3>${note.title}</h3>
      <p>${note.desc}</p>
      <div class="note-card-footer">
        <span class="note-tag">${note.tag}</span>
        ${canAccess
          ? `<button class="btn-note btn-view">📖 View Notes</button>`
          : `<button class="btn-note btn-buy" data-title="${note.title}">🛒 Buy Now - ₹${note.price}</button>`
        }
      </div>
    `;

    if (canAccess) {
      card.querySelector('.btn-view').addEventListener('click', (e) => {
        e.stopPropagation();
        openPDF(note);
      });
    } else {
      card.querySelector('.btn-buy').addEventListener('click', (e) => {
        e.stopPropagation();
        showCheckout(note);
      });
    }

    notesGrid.appendChild(card);
    observer.observe(card);
  });
}

// ===== PDF VIEWER =====
const pdfFallback = document.getElementById('pdfFallback');
const pdfDownloadLink = document.getElementById('pdfDownloadLink');

function openPDF(note) {
  modalTitle.textContent = note.title + ' Notes';
  pdfFrame.src = note.file;
  pdfDownloadLink.href = note.file;
  pdfModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  pdfFallback.classList.remove('show');

  pdfFrame.onerror = () => {
    pdfFallback.classList.add('show');
    pdfFrame.style.display = 'none';
  };

  pdfFrame.onload = () => {
    pdfFrame.style.display = '';
    pdfFallback.classList.remove('show');
  };

  setTimeout(() => {
    if (pdfFallback.classList.contains('show')) return;
    try {
      const doc = pdfFrame.contentDocument || pdfFrame.contentWindow?.document;
      if (!doc || doc.body.innerHTML === '' || doc.body.children.length === 0) {
        pdfFallback.classList.add('show');
        pdfFrame.style.display = 'none';
      }
    } catch(e) {
      // Cross-origin error means PDF loaded successfully from different context
    }
  }, 2000);
}

function closePDF() {
  pdfModal.classList.remove('open');
  document.body.style.overflow = '';
  pdfFallback.classList.remove('show');
  pdfFrame.style.display = '';
  setTimeout(() => { pdfFrame.src = ''; }, 300);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closePDF(); closeSigninModal(); closeCheckout(); }
});

// ===== TOAST =====
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== DARK MODE =====
function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
}

initTheme();

document.getElementById('themeToggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===== NOTIFY ME =====
function notifyMe(course) {
  const email = document.getElementById(course + 'Email').value.trim();
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email address.');
    return;
  }
  const btn = document.querySelector(`#${course} .cs-notify .btn`);
  const original = btn.textContent;
  btn.textContent = '✓ Subscribed!';
  btn.style.pointerEvents = 'none';
  showToast(`You'll be notified when ${course === 'react' ? 'React JS' : 'Node JS'} launches!`);
  // Save to localStorage for demo
  const subs = JSON.parse(localStorage.getItem('subs') || '{}');
  subs[course] = email;
  localStorage.setItem('subs', JSON.stringify(subs));
  setTimeout(() => { btn.textContent = original; btn.style.pointerEvents = ''; }, 2000);
}

// ===== NEETCODE 250 =====
let ncSolved = JSON.parse(localStorage.getItem('ncSolved') || '{}');

function updateNCStats() {
  const solved = Object.values(ncSolved).filter(v => v).length;
  let easy = 0, med = 0, hard = 0;
  neetcodeData.forEach(t => {
    t.problems.forEach(p => {
      const key = t.topic + '|' + p.name;
      if (ncSolved[key]) {
        if (p.difficulty === 'Easy') easy++;
        else if (p.difficulty === 'Medium') med++;
        else hard++;
      }
    });
  });
  document.getElementById('solvedCount').textContent = solved;
  document.getElementById('easyCount').textContent = easy;
  document.getElementById('medCount').textContent = med;
  document.getElementById('hardCount').textContent = hard;
  const pct = Math.round((solved / 250) * 100);
  const fill = document.getElementById('ncProgressFill');
  fill.style.width = pct + '%';
  fill.textContent = pct + '%';
}

function toggleProblem(topicName, problemName) {
  const key = topicName + '|' + problemName;
  ncSolved[key] = !ncSolved[key];
  localStorage.setItem('ncSolved', JSON.stringify(ncSolved));
  renderNCSheet();
}

function renderNCSheet(filter = 'all') {
  ncTopics.innerHTML = '';
  let grandTotal = 0, grandSolved = 0;

  neetcodeData.forEach(topic => {
    const filtered = filter === 'all'
      ? topic.problems
      : topic.problems.filter(p => p.difficulty === filter);

    if (filtered.length === 0) return;

    let solvedCount = 0;
    filtered.forEach(p => {
      if (ncSolved[topic.topic + '|' + p.name]) solvedCount++;
    });
    grandTotal += filtered.length;
    grandSolved += solvedCount;

    const div = document.createElement('div');
    div.className = 'nc-topic';
    div.innerHTML = `
      <div class="nc-topic-header">
        <h3>${topic.topic}</h3>
        <div class="nc-topic-progress">
          <span>${solvedCount}/${filtered.length}</span>
          <span class="nc-topic-arrow">▼</span>
        </div>
      </div>
      <div class="nc-topic-body">
        ${filtered.map(p => {
          const key = topic.topic + '|' + p.name;
          const checked = ncSolved[key] || false;
          const slug = toLCSlug(p.name);
          return `<div class="nc-problem">
            <a href="${LC_BASE}${slug}/" target="_blank" class="nc-problem-name" title="Solve on LeetCode">${p.name} ↗</a>
            <span class="nc-problem-difficulty diff-${p.difficulty}">${p.difficulty}</span>
            <div class="nc-problem-check ${checked ? 'checked' : ''}" data-topic="${topic.topic}" data-problem="${p.name}"></div>
          </div>`;
        }).join('')}
      </div>
    `;

    const header = div.querySelector('.nc-topic-header');
    header.addEventListener('click', () => {
      div.classList.toggle('open');
      // Smooth open
      if (div.classList.contains('open')) {
        const body = div.querySelector('.nc-topic-body');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });

    // Checkbox clicks (stop propagation)
    div.querySelectorAll('.nc-problem-check').forEach(cb => {
      cb.addEventListener('click', (e) => {
        e.stopPropagation();
        const topic_ = cb.dataset.topic;
        const problem = cb.dataset.problem;
        toggleProblem(topic_, problem);
      });
    });

    ncTopics.appendChild(div);
  });

  updateNCStats();
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderNCSheet(btn.dataset.filter);
  });
});

// Init Auth UI, Notes Grid, NeetCode
updateAuthUI();
renderNotes();
renderNCSheet();

// ===== KEYBOARD SHORTCUT: Close modal with Escape =====
console.log('%c🔥 Baddies Resorces loaded!', 'font-size:1.5rem; font-weight:bold; color:#FF2079;');
console.log('%cGrind mode: ON 🚀', 'font-size:1rem; color:#00F0FF;');
