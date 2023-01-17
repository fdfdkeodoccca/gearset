import {simplifyFraction} from './Calc'

export class GearRatio {

    Drivers: number[] = [];
    Drivens: number[] = [];
    ratio: [number, number] = [1, 1];

    private updateRatio(Driver: number, Driven: number) {
        this.ratio[0] = this.ratio[0] * Driver;
        this.ratio[1] = this.ratio[1] * Driven;
        this.ratio = simplifyFraction(this.ratio);
    }

    addGearPair(Driver: number, Driven: number) {
        if (this.isValidToothCount(Driver)
            && this.isValidToothCount(Driven)) {
            this.Drivers.push(Driver);
            this.Drivens.push(Driven);
            this.removeDuplicatePairs();
            this.updateRatio(Driver, Driven);
        } else {
            console.error('Driver or Driven not valid: '
                + Driver + ' and ' + Driven);
        }
    }

    minToothCount: number = 10;
    maxToothCount: number = 150;

    private isValidToothCount(toothCount: number): boolean {
        if (!Number.isInteger(toothCount)) {
            return false;
        }
        return (toothCount > this.minToothCount)
            && (toothCount < this.maxToothCount);
    }

    //any gears that are in both lists should be removed in
    // pairs as they make no impact on the overall ratio
    //duplicates within one list is acceptable
    removeDuplicatePairs() {
        for (let i = 0; i < this.Drivers.length; i++) {
            if (this.Drivens.includes(this.Drivers[i])) {
                this.Drivers.splice(i, 1);
                this.Drivens.splice(this.Drivens.indexOf(
                    this.Drivers[i]), 1);
            }
        }
    }
}
