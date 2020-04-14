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

    public sorted(): number[]{
        const result: number[] = [];
        if(!this.root) return result;

        const stack: [TreeNode, Boolean][] = [[this.root, false]];

        while(stack.length){
            const [current, visited] = stack.pop()!;

            if(!visited){ // if I haven't seen this before
                if(current.left){ // and there's a left child
                    stack.push([current, true]); // put me back on the stack
                    stack.push([current.left, false]); // and visit the left child first
                }else{ // but if there's no left child
                    result.push(current.val); // I'm next!
                    if(current.right) stack.push([current.right, false]); // and then visit my right child
                }
            }else{ // I've been visited before! So my left child has already been delt with
                result.push(current.val); // safely deal with me.
                if(current.right) stack.push([current.right, false]); // and then visit my right child*
                // * I know I have to do this because if I'm here, I had a left child, and did not add my right child
            }
        }

        return result;
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
