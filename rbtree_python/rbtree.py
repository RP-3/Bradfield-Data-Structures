"""
Please implement a red-black tree.

This starter code contains a working binary search tree in which all nodes are
simply colored RED.  Although this will work reasonably for random inputs,
you'll need to implement the red-black tree invariants / balancing operations
before it can handle more challenging inputs (e.g. already sorted).

Good luck!
"""

RED = 'RED'
BLACK = 'BLACK'


class Node:
    def __init__(self, value: int, color, L, R):
        self.value = value
        self.color = color
        self.L = L
        self.R = R

    def render(self, indent=0):
        """
        Helper function for printing a tree to the console.  You will need to
        turn your head sideways to look at the output :)
        """
        if self.R is not None:
            self.R.render(indent + 1)
        print('\t' * indent + '{}({})'.format(self.value, self.color))
        if self.L is not None:
            self.L.render(indent + 1)


def find(node: Node, value: int) -> bool:
    if node is None:
        return False
    if value < node.value:
        return find(node.L, value)
    elif value == node.value:
        return True
    else:
        return find(node.R, value)

def insert(root: Node, value: int) -> Node:
    if not root: return Node(value, BLACK, None, None)
    rtn = _insert(root, value)
    rtn.color = BLACK
    return rtn

def _insert(node: Node, value: int) -> Node:
    if node is None:
        return Node(value, RED, None, None)
    if value <= node.value:
        node.L = _insert(node.L, value)
    else:
        node.R = _insert(node.R, value)

    return rebalanced(node)

def rebalanced(node: Node) -> Node:
    case = twoReds(node)
    if not case: return node

    if case == 1:
        mid, smallest, biggest = node.L, node.L.L, node
        biggest.L = mid.R
        mid.R = biggest
    elif case == 2:
        mid, smallest, biggest = node.L.R, node.L, node
        smallest.R = mid.L
        mid.L = smallest
        biggest.L = mid.R
        mid.R = biggest
    elif case == 3:
        mid, smallest, biggest = node.R.L, node, node.R
        smallest.R = mid.L
        mid.L = smallest
        biggest.L = mid.R
        mid.R = biggest
    else: # case == 4
        mid, smallest, biggest = node.R, node, node.R.R
        smallest.R = mid.L
        mid.L = smallest

    mid.color, biggest.color, smallest.color = RED, BLACK, BLACK
    return mid

def twoReds(node: Node) -> int:
    if node.L and node.L.L and node.L.color == RED and node.L.L.color == RED: return 1
    if node.L and node.L.R and node.L.color == RED and node.L.R.color == RED: return 2
    if node.R and node.R.L and node.R.color == RED and node.R.L.color == RED: return 3
    if node.R and node.R.R and node.R.color == RED and node.R.R.color == RED: return 4
    return 0
