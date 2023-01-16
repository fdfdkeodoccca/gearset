import {simplifyFraction} from "./Calc";
import {GearRatio} from "./model/GearRatio";

export class Main {

        MM_PER_INCH = 25.4;

    //must all be integers between max and min allowed values. Duplicates are acceptable. Minimum of 2 values
    originalGearList: number[] = [20, 20, 33, 48, 127, 55];

    //leadscrew threads per inch, decimal acceptable
    leadScrewTPI: number = 8;

    intendedTPI: number = 6;

    intendedMetricPitch: number = 1;

    //leadscrew pitch in mm if metric
    leadScrewMetricPitch: number = 2;

    isImperialLeadscrew: boolean = true;

    isImperialOutput: boolean = true;

    intendedRatio: [number, number] = [0, 0];

    filteredCombinations: GearRatio[];

    allAvailableRatios: GearRatio[];

    setIntendedRatio() {

        if (this.isImperialLeadscrew) {
            this.intendedRatio[0] = this.intendedTPI;
        } else {
            this.intendedRatio[0] = 1 / (this.intendedMetricPitch * MM_PER_INCH);//might be simpler
        }

        if (this.isImperialOutput) {
            this.intendedRatio[1] = this.leadScrewTPI;
        } else {
            this.intendedRatio[1] = 1 / (this.leadScrewMetricPitch * MM_PER_INCH);
        }

        this.intendedRatio = simplifyFraction(this.intendedRatio);
    }

    //is this simple ratios only?
        generateRatioList(gearList: number[]) {

            for (let i = 0; i < gearList.length; i++) {

               let currentGear: number = gearList.pop();

                for (let j = 0; j < gearList.length; j++) {

                    let newgear: GearRatio = new GearRatio();
                    newgear.addGearPair(currentGear, gearList[j]);
                    this.allAvailableRatios.push(newgear);
                    this.generateRatioList(gearList);
                }
            }
        }

        filterNoError() {

            for (let i = 0; i < this.allAvailableRatios.length; i++) {

                if(this.allAvailableRatios[i].ratio[0]===this.intendedRatio[0]
                && this.allAvailableRatios[i].ratio[1]===this.intendedRatio[1]) {

                   this.filteredCombinations.push(this.allAvailableRatios[i]);

                }
            }
        }

        consoleOutput() {

            console.log("Possible exact combinations from gears: " + this.originalGearList);

            if(this.filteredCombinations.length===0){console.log("No valid combinations found");
            return;
            }

            for (let i = 0; i < this.filteredCombinations.length; i++) {

                console.log('Solution ' + (i+1) + ' Drivens: '
                    + this.filteredCombinations[i].Drivens + '\r\n' + 'Drivers: ' + this.filteredCombinations[i].Drivers);

            }

        }

}