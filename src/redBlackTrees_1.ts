/**
 * Basic Binary Search Tree.
 * A wrapper class for TreeNode, which is private and contains
 * most of the smarts.
 */
export class BinarySearchTree {

    root: TreeNode | null;
    constructor(){
        this.root = null;
    }

    public insert(val: number){
        if(!this.root) this.root = new TreeNode(val);
        else this.root.insert(val);
    }

    /**
     * Because recursion fails when the stack gets too deep.
     */
    public insertIterative(val: number){
        if(!this.root) this.root = new TreeNode(val);
        else this.root.insertIterative(val);
    }

    public find(val: number): boolean {
        if(!this.root) return false;
        return this.root.find(val);
    }
}

class TreeNode {
    public left: TreeNode | null;
    public right: TreeNode | null;
    constructor(public val: number){}

    insert(val: number){
        if(val <= this.val){
            if(this.left) this.left.insert(val);
            else this.left = new TreeNode(val);
        }else{
            if(this.right) this.right.insert(val);
            else this.right = new TreeNode(val);
        }
    }

    // defend against stack size exceptions
    insertIterative(val: number){
        let current: TreeNode = this;
        while(true){
            if(val <= current.val){
                if(current.left) current = current.left;
                else return current.left = new TreeNode(val);
            }else{
                if(current.right) current = current.right;
                else return current.right = new TreeNode(val);
            }
        }
    }

    find(val: number): boolean{
        if(this.val === val) return true;
        if(val <= this.val){
            return this.left ? this.left.find(val) : false;
        }else{
            return this.right?  this.right.find(val) : false;
        }
    }
}
