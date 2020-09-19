package main.java.GearSetAPI;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

public class Main {

    public static final int DECIMAL_ACCURACY = 10;
    public static final RoundingMode GLOBAL_ROUNDING_MODE = RoundingMode.HALF_UP;

    //Threads Per Inch of the leadscrew on the lathe. Positive only, usually an integer
    public static BigDecimal LEADSCREW_TPI = new BigDecimal("10").setScale(DECIMAL_ACCURACY, GLOBAL_ROUNDING_MODE);

    //The Threads Per Inch we are aiming to cut. Positive only, usually an integer
    public static BigDecimal PREF_TPI = new BigDecimal("6").setScale(DECIMAL_ACCURACY, GLOBAL_ROUNDING_MODE);
    public static final BigDecimal targetRatio = LEADSCREW_TPI.divide(PREF_TPI, DECIMAL_ACCURACY, GLOBAL_ROUNDING_MODE);

    // this is a ratio, user probably would prefer a percentage input
    public static final BigDecimal errorTolerance = new BigDecimal("0.1").setScale(DECIMAL_ACCURACY, GLOBAL_ROUNDING_MODE);

    public static boolean containsDuplicateGears(ChangeGearCombi cwc1, ChangeGearCombi cwc2){

        for (int i = 0; i < cwc1.getDrivenList().size(); i++) {
            for (int j = 0; j < cwc2.getDriverList().size(); j++) {
                if(cwc1.getDrivenList().get(i).getToothCount() == cwc2.getDriverList().get(i).getToothCount()){
                    return true;
                }
            }
        }

        for (int i = 0; i < cwc2.getDrivenList().size(); i++) {
            for (int j = 0; j < cwc2.getDriverList().size(); j++) {
                if(cwc2.getDrivenList().get(i).getToothCount() == cwc1.getDriverList().get(i).getToothCount()){
                    return true;
                }
            }
        }

        return false;

    }

    public static void main(String[] args) {

       System.out.println("Starting GearSet Calculator. Target Ratio: " + targetRatio.stripTrailingZeros());

       // take space delimited input numbers and create an array for the number of teeth on available gears
        List<Integer> changeGearToothNumbers = new ArrayList<>();
        for (String arg : args) {
            changeGearToothNumbers.add(Integer.parseInt(arg));
        }

        RecursiveCalc recursiveCalc = new RecursiveCalc();

        Deque<Integer> changeGearIntegers = new LinkedList<>(changeGearToothNumbers);

        ArrayList<ChangeGearCombi> newCompoundList = new ArrayList<>();
        try {
            newCompoundList = recursiveCalc.getFullResults(changeGearIntegers);
        }catch (ChangeGear.InvalidChangeGearException ex){

            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }

        //Fine Feed is the highest possible ratio from the available gears. Used to provide a smooth finish
        //when cutting diameters (not strictly related to screwcutting)
        ChangeGearCombi fineFeed = new ChangeGearCombi();
        try {
            fineFeed = ChangeGearCombi.createChangeGearCombi(
                    ChangeGear.create(changeGearToothNumbers.get(0)),
                    ChangeGear.create(changeGearToothNumbers.get(0)));
        }catch (ChangeGear.InvalidChangeGearException ex){
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }

        boolean validCombinationFound = false;

        for (int i = 0; i < newCompoundList.size(); i++) {

            //if a higher ratio is found, set it as the new fine feed ration
            if(newCompoundList.get(i).getRatio().compareTo(fineFeed.getRatio())>0){
                fineFeed = newCompoundList.get(i);
            }

            if (newCompoundList.get(i).getRatio().subtract(targetRatio).abs().compareTo(errorTolerance) <= 0) {
                System.out.println("Result: Use Driver gears: ");

                        for(int x = 0; x<newCompoundList.get(i).getDriverList().size();x++){
                            System.out.println(newCompoundList.get(i).getDriverList().get(x).getToothCount()
                            + ", ");
                }

                System.out.println(" and Driven gears: ");
                for(int y = 0; y<newCompoundList.get(i).getDriverList().size();y++){
                    System.out.println(newCompoundList.get(i).getDrivenList().get(y).getToothCount() + ", ");


                }
                System.out.println(" with overall ratio: "
                        + newCompoundList.get(i).getRatio().stripTrailingZeros());
                validCombinationFound = true;
            }
        }
        if (!validCombinationFound) {
            System.out.println("No compound gear combinations within error range were found. "
                    + newCompoundList.size() + " invalid combinations found.");
        }
        System.out.println("fine feed ratio: " + fineFeed.getRatio() +" which is: "+fineFeed.getRatio().multiply(LEADSCREW_TPI)+"TPI");
        System.out.println("driver gears: ");
            for(int x = 0; x<fineFeed.getDriverList().size();x++){
                System.out.println(fineFeed.getDriverList().get(x).getToothCount()
                        + ", ");
            }

            System.out.println(" and Driven gears: ");
            for(int y = 0; y<fineFeed.getDriverList().size();y++){
                System.out.println(fineFeed.getDrivenList().get(y).getToothCount() + ", ");

            }

    }
}
