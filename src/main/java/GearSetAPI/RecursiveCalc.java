package main.java.GearSetAPI;

import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.Optional;

public class RecursiveCalc {


    //limit should be implemented so that overly complex compound ratios are not chosen
    //positive integer only
    public static final int levelLimit = 3;

    ArrayList<ChangeGearCombi> results = new ArrayList<>();

    Optional<ChangeGearCombi> recursiveStarter = Optional.empty();


    private void recursiveCalc(Optional<ChangeGearCombi> prevIteration, Deque<Integer> remainingToothCounts)
            throws ChangeGear.InvalidChangeGearException {

        //remove compound with cancelling out ratio eg 100,5,20 and 25,20,5 (20 5 twice opposite cancels out)
        // try to optimize 100,20,5 + 25,20,5  three combinations, two of which produce 1:1 ratio
        //only add if not a duplicate in the OTHER list.

        ChangeGear a;
        ChangeGear b;

        if (remainingToothCounts.size() > 1) {

            a = ChangeGear.create(remainingToothCounts.pop());
            b = ChangeGear.create(remainingToothCounts.pop());

            ArrayList<ChangeGear> newDriverList = new ArrayList<>();
            ArrayList<ChangeGear> newDrivenList = new ArrayList<>();

            //if(!newDrivenList.contains(a) && !newDriverList.contains(a)) {//isSameToothCount test
                newDrivenList.add(a);
                newDriverList.add(b);
           // }

            if(prevIteration.isPresent()){
                newDrivenList.addAll(prevIteration.get().getDrivenList());
                newDriverList.addAll(prevIteration.get().getDriverList());
            }

            //remove any gears in both lists
           // cleanInvalidCombinations(newDriverList, newDrivenList);

            ChangeGearCombi newPrev = ChangeGearCombi.createChangeGearCombi(newDriverList, newDrivenList);

            results.add(newPrev);

            recursiveCalc(Optional.of(newPrev), remainingToothCounts);
        }

    }

        public ArrayList<ChangeGearCombi> getFullResults(Deque<Integer> gears)
                throws ChangeGear.InvalidChangeGearException {

        results = new ArrayList<>();


            for (int i = 0; i < gears.size(); i++) {

                //call recursive
                recursiveCalc(recursiveStarter, gears);

                //rotate stack 1 element
                if(gears.size()>1){
                gears.addLast(gears.getFirst());
                }

            }
        return results;
        }
//list needs to be thread safe and allow but ignore duplicate gears
    void cleanInvalidCombinations(List<ChangeGearCombi> drivers, List<ChangeGearCombi> drivens){

        //remove combinations that have more gears but same overall ratio as other combinations
        //this method in future should be a toggle option for the end user
        //remove any identical combinations that got in somehow
        //future: remove combinations that cannot be implemented in the real world due to
        //physical constraints
        

    }
}
