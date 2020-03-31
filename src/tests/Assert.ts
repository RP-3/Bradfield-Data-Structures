export class Assert {

    static equal(a: number[], b: number[]): boolean {
        if(a.length !== b.length) return false;

        for(let i=0; i<a.length; i++){
            if(a[i] !== b[i]){
                console.log(`${a[i]} is not equal to ${b[i]}`);
                console.log('-'.repeat(i) + 'x');
                return false;
            }
        }

        return true;
    }
}