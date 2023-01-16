import {simplifyFraction} from '../../main/Calc'

test('simplify Fraction 20/50 should give 2/5', () => {
    expect(simplifyFraction([20,50])).toStrictEqual([2,5]);
});

test('simplify Fraction 33/77 should give 3/7', () => {
    expect(simplifyFraction([33,77])).toStrictEqual([3,7]);
});

test('simplify Fraction 2349/32 should not reduce', () => {
    expect(simplifyFraction([2349,32])).toStrictEqual([2349,32]);
});

test('simplify Fraction 38502/12834 should give 3/1', () => {
    expect(simplifyFraction([38502,12834])).toStrictEqual([3,1]);
});

test('simplify Fraction 1/1 should not reduce', () => {
    expect(simplifyFraction([1,1])).toStrictEqual([1,1]);
});

test('simplify Fraction 1/1 should not reduce', () => {
    expect(simplifyFraction([1,1])).toStrictEqual([1,1]);
});

test('Fraction with decimal components 1.2/1 should be fixed', () => {
    expect(simplifyFraction([1.2,1])).toStrictEqual([6,5]);
});

test('Fraction with decimal components 15/1.80005 should be fixed', () => {
    expect(simplifyFraction([15,1.80005])).toStrictEqual([300000,36001]);
});


test('Fraction with decimal components 15.2/15.4 should be fixed', () => {
    expect(simplifyFraction([15.2,15.4])).toStrictEqual([76,77]);
});