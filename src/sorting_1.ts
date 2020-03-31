// Utils
/**
 * Partitions the given array a from l to r about a randomly-selected pivot.
 * Returns the index of that pivot in the partitioned array.
 */
const partition = (l: number, r: number, a: number[]): number => {
    // const pivotIndex = l + Math.floor(Math.random()*(r-l)); // choose a random pivot
    const pivotIndex = r; // always pick the right corner as the pivot
    const pivot = a[pivotIndex];
    const rightEnd = r;

    [a[pivotIndex], a[r]] = [a[r], a[pivotIndex]]; // move the pivot to the end
    r--; // and only operate on the remainder of the array

    // partition by the pivot
    // everything >= pivot on the right, and everything < pivot on the left
    while(l<=r){ // finish when l === r
        if(a[r] >= pivot){ // if a[r] is in the correct partition
            r--; // decrement r
        }
        else if(a[l] >= pivot){ // if a[l] is in the wrong partition
            [a[l], a[r]] = [a[r], a[l]]; // swap elements
            r--; // then safely decrement r
        }else{ // a[l] is in the correct position
            l++; // increment l
        }
    }

    // N.B.: At this point l *is always* > r. Since:
    // 1. everything AFTER r is >= r
    // 2. l is now where r should be
    // we swap the pivot element with the element at l
    [a[l], a[rightEnd]] = [a[rightEnd], a[l]]; // move pivot to the correct point, where l met r
    return l;
};

/**
 * Textbook quicksort
 * @param array number[]
 */
export const quicksort = (array: number[]): void => {

    const _quicksort = (l: number, r: number): void => {
        if(l>=r) return;
        const pivotIndex = partition(l, r, array);
        _quicksort(l, pivotIndex-1); // recurse on the left hand side
        _quicksort(pivotIndex+1, r); // recurse on the right hand side
    };

    _quicksort(0, array.length-1);
};

/**
 * Iterative Quicksort. Because recursion exceeds max stack size
 * when sorting 100k equal nums. Otherwise identical to recursive
 * quicksort.
 * @param array number[]
 */
export const iQuicksort = (array: number[]): void => {

    const stack: number[][] = [[0, array.length-1]];

    while(stack.length){
        const [l, r] = stack.pop()!;

        if(l>=r) continue;

        const pivotIndex = partition(l, r, array);
        stack.push([l, pivotIndex-1]); // recurse on the left hand side
        stack.push([pivotIndex+1, r]); // recurse on the right hand side
    }
};
