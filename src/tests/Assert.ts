export class Assert {

    static equal(a: number[], b: number[]): boolean {
        if(a.length !== b.length){
            console.log(`Inputs differ in length and cannot be equal`);
            return false;
        }

        for(let i=0; i<a.length; i++){
            if(a[i] !== b[i]){
                console.log(`${a[i]} is not equal to ${b[i]}`);
                console.log('-'.repeat(i) + 'x');
                return false;
            }
        }

        return true;
    }

    static isTrue(val: any){
        if(val === true) return true;
        throw new Error(`Expected ${val} === true but got something else`);
    }
}