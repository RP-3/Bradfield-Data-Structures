import { Assert } from './Assert';
import { insertionSort, Heap } from '../sorting_2';

// Insertion Sort
(()=>{
    // It works with unique elements
    const unique = [1, 2, 9, 3, 8, 4, 7, 5, 6];
    insertionSort(unique);
    Assert.equal(unique, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // It works with duplicate elements
    const withDuplicates = [1, 2, 4, 2, 3, 3, 5];
    insertionSort(withDuplicates);
    Assert.equal(withDuplicates, [1, 2, 2, 3, 3, 4, 5]);
})();

// Heap Sort
(() => {
    // Not in place
    // It works with unique elements
    const unique = [1, 2, 9, 3, 8, 4, 7, 5, 6];
    Assert.equal(Heap.sorted(unique), [1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // It works with duplicate elements
    const withDuplicates = [1, 2, 4, 2, 3, 3, 5];
    Assert.equal(Heap.sorted(withDuplicates), [1, 2, 2, 3, 3, 4, 5]);

    // In place...ish
    const t = [1, 2, 9, 3, 8, 4, 7, 5, 6];
    Assert.equal(new Heap(t).sort(), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
})();

