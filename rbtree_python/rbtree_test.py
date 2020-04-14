from collections import deque
from random import randint
from rbtree import RED, BLACK, find, insert

import unittest


def valid_bst_order(root):
    """
    Flatten the elements of the tree using in-order traversal and ensure that
    the result is sorted.  This should be the case for a valid BST.
    """
    elements = []

    def flatten(node):
        if node is None:
            return
        flatten(node.L)
        elements.append(node.value)
        flatten(node.R)

    flatten(root)

    for i in range(len(elements) - 1):
        if elements[i] > elements[i + 1]:
            return False

    return True


def valid_rbtree_paths(root):
    """
    Perform BFS, ensure that every path from the root to an empty node has the
    same number of black nodes along the way.
    """
    counts = set()
    q = deque()
    q.append((root, 0))
    while len(q) > 0:
        node, count = q.popleft()
        if node is None:
            counts.add(count)
        else:
            if node.color == BLACK:
                count += 1
            q.append((node.L, count))
            q.append((node.R, count))
    return len(counts) == 1


def valid_rbtree_colors(node, parent_color=BLACK):
    """
    Perform DFS, ensure that no red node has a red parent.
    """
    if node is None:
        return True
    if node.color == RED and parent_color == RED:
        return False
    return valid_rbtree_colors(node.L, node.color) and \
        valid_rbtree_colors(node.R, node.color)


class TestRedBlackTree(unittest.TestCase):

    def test_insert(self):
        N = 10

        test_cases = [
            ("sorted", range(N)),
            ("reversed", reversed(range(N))),
            ("random 1", [randint(1, N) for i in range(N)]),
            ("random 2", [randint(1, 10 * N) for i in range(N)])
        ]
        for name, values in test_cases:
            root = None
            for value in values:
                root = insert(root, value)
            print('\nTest case "{}":'.format(name))
            root.render()

            assert valid_bst_order(root)

            # TODO: Uncomment these once you believe you've implemented a
            # working red-black tree.
            # assert valid_rbtree_paths(root)
            # assert valid_rbtree_colors(root)

    def test_find(self):
        N = 100

        in_tree = range(0, N, 2)
        not_in_tree = range(1, N, 2)

        root = None
        for value in in_tree:
            root = insert(root, value)

        for value in in_tree:
            assert find(root, value)

        for value in not_in_tree:
            assert not find(root, value)

    # TODO: Uncomment this once you believe you've implemented a working
    # red-black tree.  This should finish in a reasonable amount of time,
    # say, 10 seconds.
    # def test_scale(self):
    #     N = 100000
    #     root = None
    #     for i in range(N):
    #         root = insert(root, i)
    #     assert valid_bst_order(root)
    #     assert valid_rbtree_paths(root)
    #     assert valid_rbtree_colors(root)

if __name__ == '__main__':
    unittest.main()