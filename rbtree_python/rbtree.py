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
    def __init__(self, value: int, color, L: Node, R: Node):
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


def insert(node: Node, value: int) -> Node:
    if node is None:
        return Node(value, RED, None, None)
    if value <= node.value:
        node.L = insert(node.L, value)
    else:
        node.R = insert(node.R, value)

    twoRedCase = twoReds(node)
    return node if not twoRedCase else rebalance(node, twoRedCase)

def rebalance(node: Node, case: int) -> Node:
    pass
    # should rebalance depending on given case and return the
    # new root node (taking the place of the given node)

def twoReds(node: Node) -> int:
    pass
    # 0: no two reds
    # 1: case 1
    # 2: case 2
    # 3: case 3
    # 4: case 4