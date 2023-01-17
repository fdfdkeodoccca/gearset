import {GearRatio} from "../../main/GearRatio";
import {simplifyFraction} from '../../main/Calc';
import {Main} from "../../main/Main";

test('22/58 and 14/127 should produce correct ratio', () => {
    const gr = new GearRatio;
    gr.addGearPair(22, 58);
    gr.addGearPair(14, 127);
    expect(gr.ratio).toStrictEqual([154,3683]);
});

test('Add many gears should work', () => {
    const gr = new GearRatio;
    gr.addGearPair(100, 58);
    gr.addGearPair(42, 38);
    gr.addGearPair(26, 28);
    gr.addGearPair(22, 56);
    gr.addGearPair(32, 30);
    gr.addGearPair(60, 44);
    gr.addGearPair(34, 24);
    gr.addGearPair(50, 20);
    expect(gr.Drivens.length).toBe(8);
    expect(gr.Drivers.length).toBe(8);
    expect(gr.ratio).toStrictEqual([27625,7714]);
});

test('Add valid tooCounts should have correct ratio', () => {
    const gr = new GearRatio;
    gr.addGearPair(42, 48);
    gr.addGearPair(32, 58);
    expect(gr.ratio).toStrictEqual([14,29]);
});

test('adding valid toothCounts of 50, 40 should pass', () => {
    const gr = new GearRatio;
    gr.addGearPair(50,40);
    expect(gr.Drivens.length).toBe(1);
    expect(gr.Drivers.length).toBe(1);
});

test('adding invalid toothCounts of 2, 2 should fail', () => {
    const gr = new GearRatio;
    gr.addGearPair(2,2)
    expect(gr.Drivens.length).toBe(0);
    expect(gr.Drivers.length).toBe(0);
});

test('adding invalid toothCounts of 300, 200 should fail', () => {
    const gr = new GearRatio;
    gr.addGearPair(300, 200)
    expect(gr.Drivens.length).toBe(0);
    expect(gr.Drivers.length).toBe(0);
});

test('Valid gear counts should have correct ratio', () => {
    const gr = new GearRatio;
    gr.addGearPair(20, 127);
    gr.addGearPair(40, 52);
    expect(gr.ratio).toStrictEqual([200, 1651]);
});

test('4 gears added should have correct ratio', () => {
    const gr = new GearRatio;
    gr.addGearPair(42, 58);
    gr.addGearPair(60, 50);
    expect(gr.ratio).toStrictEqual([126, 145]);

});

test('6 gears added should have correct ratio', () => {
    const gr = new GearRatio;
    gr.addGearPair(100, 58);
    gr.addGearPair(100, 58);
    gr.addGearPair(12, 33);
    expect(gr.ratio).toStrictEqual([10000,9251]);
});

test('Redundant gear pairs should be removed', () => {
    const gr = new GearRatio;
    gr.addGearPair(42, 42);
    gr.addGearPair(100, 58);
    gr.addGearPair(12, 33);
    expect(gr.Drivers.length).toBe(2);
    expect(gr.Drivens.length).toBe(2);
});

test('adding non integer toothCount 22.3 should fail', () => {
    const gr = new GearRatio;
    gr.addGearPair(20,22.3)
    expect(gr.Drivers.length).toBe(0);
    expect(gr.Drivens.length).toBe(0);
});

test('adding non integer toothCount 1.7 should fail', () => {
    const gr = new GearRatio;
    gr.addGearPair(1.7,40);
    expect(gr.Drivers.length).toBe(0);
    expect(gr.Drivens.length).toBe(0);
});

test('adding negative toothCount -20 should fail', () => {
    const gr = new GearRatio;
    gr.addGearPair(-20,40)
    expect(gr.Drivers.length).toBe(0);
    expect(gr.Drivens.length).toBe(0);
});

test('adding negative toothCount -33 should return false', () => {
    const gr = new GearRatio;
    gr.addGearPair(30,-33);
    expect(gr.Drivers.length).toBe(0);
    expect(gr.Drivens.length).toBe(0);
});

test('adding negative toothCounts -12 and -48 should return false', () => {
    const gr = new GearRatio;
    gr.addGearPair(-12,-48);
    expect(gr.Drivers.length).toBe(0);
    expect(gr.Drivens.length).toBe(0);
});

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

test('simplify Fraction 23489/110000 should not reduce', () => {
    expect(simplifyFraction([23489,110000])).toStrictEqual([23489,110000]);
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

test('Full test', () => {
    const main = new Main();
    main.generateRatioList([20,40,32,48]);
    main.intendedRatio = [1,2];
    main.filterNoError();
    main.consoleOutput();
    expect(main.allAvailableRatios.length).toBe(3);
    expect(main.allAvailableRatios[0].ratio).toStrictEqual([12,5]);
});