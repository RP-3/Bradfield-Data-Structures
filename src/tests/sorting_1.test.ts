import { Assert } from './Assert';
import { quicksort, iQuicksort } from '../sorting_1';

/*
1. Review and implement a “textbook” quicksort.
*/

// It works with unique elements
const unique = [1, 2, 9, 3, 8, 4, 7, 5, 6];
quicksort(unique);
Assert.equal(unique, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

// It works with duplicate elements
const withDuplicates = [1, 2, 4, 2, 3, 3, 5];
quicksort(withDuplicates);
Assert.equal(withDuplicates, [1, 2, 2, 3, 3, 4, 5]);

// Extra: also do an iterative quicksort

// It works with unique elements
const unique2 = [1, 2, 9, 3, 8, 4, 7, 5, 6];
iQuicksort(unique2);
Assert.equal(unique2, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

// It works with duplicate elements
const withDuplicates2 = [1, 2, 4, 2, 3, 3, 5];
iQuicksort(withDuplicates2);
Assert.equal(withDuplicates2, [1, 2, 2, 3, 3, 4, 5]);

/*
2. How long does your implementation take to sort 100,000
integers that are (i) randomly generated, (ii) all equal,
and (iii) already sorted?
*/

const maxInt = 1_000_000; // use ints up to 1m

//  (i) 100k random ints from 1 - 10^6
(() => {
    const random100k = new Array(100_000);
    for(let i=0; i<random100k.length; i++) random100k[i] = Math.floor(Math.random()*maxInt);
    const start = Date.now();
    iQuicksort(random100k);
    console.log(`100k random: ${Date.now() - start}ms`); // ~50ms
})();

// (ii) 100k equal ints
(() => {
    const equal100k = new Array(100_000).fill(Math.floor(Math.random()*maxInt));
    const start = Date.now();
    iQuicksort(equal100k);
    console.log(`100k equal: ${Date.now() - start}ms`); // ~20ms
})();

// (iii) 100k sorted ints
(() => {
    const sorted100k = new Array(100_000);
    for(let i=0; i<sorted100k.length; i++) sorted100k[i] = i;
    const start = Date.now();
    iQuicksort(sorted100k);
    console.log(`100k sorted: ${Date.now() - start}ms`); // ~10 seconds
})();
