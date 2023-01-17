import {GearRatio} from "../../main/GearRatio";


    test('22/58 and 14/127 should produce correct ratio', () => {
    const gr = new GearRatio;
    gr.addGearPair(22, 58);
    gr.addGearPair(14, 127);
    expect(gr.Drivens.length).toBe(2);
    expect(gr.Drivers.length).toBe(2);
    expect(gr.ratio[0]).toBe(154);
    expect(gr.ratio[1]).toBe(3683);
});


test('Add duplicate gears should reduce1', () => {
    const gr = new GearRatio;
    gr.addGearPair(100, 58);
    gr.addGearPair(100, 58);
    expect(gr.Drivens.length).toBe(2);
    expect(gr.Drivers.length).toBe(2);
    expect(gr.ratio[0]).toBe(2500);
    expect(gr.ratio[1]).toBe(841);
});

test('Add duplicate gears should reduce2', () => {
    const gr = new GearRatio;
    gr.addGearPair(100, 58);
    gr.addGearPair(100, 58);
    expect(gr.Drivens.length).toBe(2);
    expect(gr.Drivers.length).toBe(2);
    expect(gr.ratio[0]).toBe(2500);
    expect(gr.ratio[1]).toBe(841);
});