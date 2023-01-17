function findListOfFactors(toothCount: number) {
    let factors: number[] = [];
    for (let i = 1; i <= toothCount; i++) {
        if (toothCount % i === 0) {
            factors.push(i);
        }
    }
    return factors;
}

function findLargestCommonFactor(l1: number[], l2: number[]) {
    let lcf: number = 1;
    for (let i = 0; i < l1.length; i++) {
        if (l2.includes(l1[i]) && l1[i] > lcf) {
            lcf = l1[i];
        }
    }
    return lcf;
}

export function simplifyFraction(input: [number, number]): [number, number] {

    while (!Number.isInteger(input[0])
        || !Number.isInteger(input[1])) {

        input[0] = input[0] * 10;
        input[1] = input[1] * 10;
    }

    let lcf = findLargestCommonFactor(findListOfFactors(input[0]),
        findListOfFactors(input[1]));
        return [(input[0] / lcf),
                (input[1] / lcf)];

}