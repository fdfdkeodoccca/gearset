import {GearRatio} from "../../main/GearRatio";

test('toothCount of 50, 40 should return true', () => {
    const gr = new GearRatio;
    expect(gr.addGearPair(50,40)).toBe(true);
    expect(gr.Drivens.length).toBe(1);
    expect(gr.Drivers.length).toBe(1);
});

test('toothCount of 2, 2 should return false', () => {
    const gr = new GearRatio;
    expect(gr.addGearPair(2,2)).toBe(false);
    expect(gr.Drivens.length).toBe(0);
    expect(gr.Drivers.length).toBe(0);
});

test('toothCount of 300, 200 should return false', () => {
    const gr = new GearRatio;
    expect(gr.addGearPair(300, 200)).toBe(false);
});

test('Add duplicate gears should reduce', () => {
    const gr = new GearRatio;
    gr.addGearPair(100, 58);
    gr.addGearPair(100, 58);
    expect(gr.Drivens.length).toBe(2);
    expect(gr.Drivers.length).toBe(2);
});

test('4 gears added should have correct ratio', () => {
    const gr = new GearRatio;
    gr.addGearPair(100, 58);
    gr.addGearPair(100, 58);
    expect(gr.ratio[0]).toBe(2500);
    expect(gr.ratio[1]).toBe(841);
    expect(gr.Drivers.length).toBe(2);
});

test('6 gears added should have correct ratio', () => {
    const gr = new GearRatio;
    gr.addGearPair(100, 58);
    gr.addGearPair(100, 58);
    gr.addGearPair(12, 33);
    expect(gr.ratio[0]).toBe(10000);
    expect(gr.ratio[1]).toBe(9251);
    expect(gr.Drivers.length).toBe(3);
});


test('Redundant gear pairs should be removed', () => {
    const gr = new GearRatio;
    gr.addGearPair(42, 42);
    gr.addGearPair(100, 58);
    gr.addGearPair(12, 33);
    expect(gr.ratio[0]).toBe(200);
    expect(gr.ratio[1]).toBe(319);
    expect(gr.Drivers.length).toBe(2);
});

test('adding non integer toothCount should return false', () => {
    const gr = new GearRatio;
    expect(gr.addGearPair(1.7,40)).toBe(false);
        expect(gr.addGearPair(20,22.3)).toBe(false);

});

test('adding negative toothCount should return false', () => {
    const gr = new GearRatio;
    expect(gr.addGearPair(-20,40)).toBe(false);
        expect(gr.addGearPair(30,-33)).toBe(false);

});