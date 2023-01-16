import {simplifyFraction} from '../Calc'
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
            this.removeNotNeeded();
            this.updateRatio(Driver, Driven);
            return true;
        } else {
            console.log('Driver or Driven not within valid max and min tooth counts: ' + Driver + ' and ' + Driven)
            return false;
        }
    }

    //Minimum acceptable number of teeth on a gear. It is not normally possible to manufacture a gear with less than 3 or 5 teeth
    minTeeth: number = 10;
    //Maximum acceptable number of teeth on a gear. A large number of teeth may make the gear physically too large to use
    maxTeeth: number = 150;

    private isValidToothCount(toothCount: number): boolean {

            if(!Number.isInteger(toothCount)){return false;}

        return toothCount > this.minTeeth && toothCount < this.maxTeeth;

    }

    //any gears that are in both lists should be removed in pairs as they make no impact on the overall ratio
    //duplicates within one list is acceptable
    removeNotNeeded() {

        for (let i = 0; i < this.Drivers.length; i++) {

            if(this.Drivens.includes(this.Drivers[i])) {
                this.Drivers.splice(i, 1);
                this.Drivens.splice(this.Drivens.indexOf(this.Drivers[i]), 1);
            }
        }
    }
}
