/**
 * Textbook insertion sort. Operates in-place in O(n*k), where:
 * n = length of input
 * k = average distance of each element from it's sorted position.
 * Should outperform quicksort, assuming quicksort averages
 * O(n*log(n)), whenever n*k < n*log(n), i.e., when k < log(n).
 *
 * Concretely, this will occur whenever the average distance of
 * an element from its sorted position is less than log(n). E.g.,
 * when for a n=128 length array, each item is less than 8 places
 * from its sorted position.
 * @param nums
 */
export const insertionSort = (nums: number[]): void => {

    for(let i=1; i<nums.length; i++){
        if(nums[i] >= nums[i-1]) continue;
        let insertAt = i-1;
        while(nums[insertAt-1] > nums[i]) insertAt--;

        const tmp = nums[i];
        for(let j=i-1; j>=insertAt; j--) nums[j+1] = nums[j];
        nums[insertAt] = tmp;
    }
};

/**
 * Textbook simple Heap. Stores only ints and always sifts min value to root.
 * It seems to me that this is guaranteed to be n*log(n). In big-O terms,
 * this seems better than quicksort which is n*log(n) in the very best case but
 * probably is worse. I know from reading that quicksort is generally faster
 * but I don't have a strong grasp of why. Is it that in a mostly-sorted input
 * with a good pivot-selection strategy and partition function that
 * quicksort will do n*log(n) 'work' but very few swaps, whereas heapsort will
 * *always* butcher the input into a heap whether warranted or not?
 */
export class Heap {
    private storage: number[] = [-Infinity];
    private size = 0;

    /**
     * Accepts an input array that will be 'heapified', but will otherwise
     * initialise to an empty heap.
     */
    constructor(array?: number[]){
        if(array){
            this.storage = array;

            this.storage.push(this.storage[0]);
            this.storage[0] = -Infinity;
            this.size = this.storage.length-1;

            for(let i=this.storage.length-1; i>0; i--) this.siftDown(i);
        }else{
            this.storage = [-Infinity];
            this.size = 0;
        }
    }

    /**
     * will empty itself and return a new sorted array.
     * This is a bit of a cheat but I realised too late in the day that I should've
     * made this a max heap to sort it it in place in ascending order tidily.
     * I also shouldn't have used the length of my storage when sifting and working
     * out parent/child positions since that now prevents me from partitioning
     * off a 'sorted' section of my storage to use as a sorted array, and leaving
     * the rest as my 'heap'.
     */
    public sort(): number[] {
        const result = [];
        while(this.length()){
            result.push(this.pop()!);
        }
        return result;
    }

    /**
     * Will return a new sorted array, treating the input as read-only
     */
    static sorted(nums: number[]): number[]{
        const result: number[] = [];
        const heap = new Heap();
        nums.forEach((n) => heap.push(n));
        while(heap.length()){
            result.push(heap.pop()!);
        }
        return result;
    }

    /**The number of items in my heap */
    public length(){
        return this.size;
    }

    public push(num: number){
        this.storage.push(num);
        this.size++;
        this.siftUp();
    }

    public pop(): number | null {
        if(this.size === 0) return null;

        if(this.size > 1){
            const rtn = this.storage[1];
            this.size--;
            this.storage[1] = this.storage.pop()!;
            this.siftDown(1);
            return rtn;
        }
        this.size = 0; // only one item remaining
        return this.storage.pop()!;
    }

    // MARK: Private Helpers
    private childIndex(i: number, storage: number[]): number | null{
        if(storage.length -1 < i*2) return null; // should not have relied on length here.
        if(storage.length -1 < i*2+1) return i*2;

        let [leftChildIndex, rightChildIndex] = [i*2, i*2+1];
        if(storage[leftChildIndex] < storage[rightChildIndex]){
            return leftChildIndex;
        }else{
            return rightChildIndex;
        }
    }

    private siftDown(i=1): void {
        const storage = this.storage; // just shorthand
        let parentIndex = i;
        let childIndex = Heap.prototype.childIndex(i, storage);
        while(childIndex && storage[childIndex] < storage[parentIndex]){
            [storage[childIndex], storage[parentIndex]] = [storage[parentIndex], storage[childIndex]];
            [parentIndex, childIndex] = [childIndex, Heap.prototype.childIndex(childIndex, storage)];
        }
    }

    private siftUp(): void {
        const storage = this.storage; // just shorthand
        let childIndex = storage.length-1;
        let parentIndex = Math.floor(childIndex/2);
        while(storage[childIndex] < storage[parentIndex]){
            [storage[childIndex], storage[parentIndex]] = [storage[parentIndex], storage[childIndex]];
            [childIndex, parentIndex] = [parentIndex, Math.floor(parentIndex/2)];
        }
    }
}
