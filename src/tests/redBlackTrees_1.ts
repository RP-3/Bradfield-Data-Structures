import { Assert } from './Assert';
import { BinarySearchTree } from '../redBlackTrees_1';

/**
 * 1. Implement a basic binary search tree with the two operations find
 * (determine whether a value exists in the tree) and insert (add a
 * value to the tree).
 */

// it works with unique values
(() => {
    const bst = new BinarySearchTree();
    const vals = [5, 4, 6, 3, 7, 2, 8, 1, 9];
    vals.forEach((v) => bst.insertIterative(v));
    vals.forEach((v) => Assert.isTrue(bst.find(v)));
    [0, 10, 4.9, 5.1].forEach((v) => Assert.isTrue(!bst.find(v)));
})();

// it works with duplicate values
(() => {
    const bst = new BinarySearchTree();
    const vals = [5, 4, 6, 4, 7, 3, 8, 3, 8];
    vals.forEach((v) => bst.insertIterative(v));
    vals.forEach((v) => Assert.isTrue(bst.find(v)));
    [0, 10, 4.9, 5.1].forEach((v) => Assert.isTrue(!bst.find(v)));
})();

/**
 * 2. How long does it take to insert 100,000 random values? What about
 * 100,000 values in sorted order?
 */
const maxInt = 10_000_000; // use ints up to 10m
// random values
(() => {
    const bst = new BinarySearchTree();
    const vals = new Array(100_000).fill(0).map(() => Math.floor(Math.random()*maxInt));
    const start = Date.now();
    vals.forEach((v) => bst.insertIterative(v));
    const time = Date.now() - start;
    console.log(`Completed 100k random insertions in ${time}ms`); // ~100ms
})();

// sorted order
(() => {
    const bst = new BinarySearchTree();
    const vals = new Array(100_000).fill(0).map((_, i) => i);
    const start = Date.now();
    vals.forEach((v) => bst.insertIterative(v));
    const time = Date.now() - start;
    console.log(`Completed 100k sorted insertions in ${time}ms`); // 100,000ms. 1,000x slower!
})();

/**
 * 3. Let’s define the height of a tree as the number of nodes on a longest path
 *  from the root down to a leaf.
 *
 * (a) Given a binary search tree with height h, what are the minimum and maximum
 * number of nodes the tree could possibly contain?
 *
 * (b) On the other hand, given a binary search tree with n nodes, what’s the
 * minimum and maximum possible height of the tree?
 */

/**
 * By drawing a few examples I came up with the following.
 * 3(a) Max number of nodes is 2^(h)-1. Min number of nodes is h.
 * 3(b) Max height is n. Min height is log2(n+1).
 */
