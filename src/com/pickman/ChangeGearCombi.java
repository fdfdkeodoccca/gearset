package com.pickman;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.pickman.Main.DECIMAL_ACCURACY;
import static com.pickman.Main.GLOBAL_ROUNDING_MODE;

/**
 * Represents one or more change gear sets that produce a compound ratio
 * Mathematically no limit on how many compound ratios can be set, but phyiscally
 * more than 3 or 4 compound ratios is unusual on a lathe due to practical constraints
 */
public class ChangeGearCombi {

    private BigDecimal ratio = new BigDecimal(1).setScale(DECIMAL_ACCURACY, GLOBAL_ROUNDING_MODE);

    private final ArrayList<ChangeGear> driverList = new ArrayList<>();

    private final ArrayList<ChangeGear> drivenList = new ArrayList<>();


    public BigDecimal getRatio() {
        return ratio;
    }

    public ArrayList<ChangeGear> getDriverList() {
        return driverList;
    }

    public ArrayList<ChangeGear> getDrivenList() {
        return drivenList;
    }


    public static ChangeGearCombi createChangeGearCombi(ChangeGear Driver, ChangeGear Driven) {

        ChangeGearCombi cwc = new ChangeGearCombi();
        cwc.driverList.add(Driver);
        cwc.drivenList.add(Driven);

        cwc.ratio =
                BigDecimal.valueOf(Driven.getToothCount()).divide
                        (BigDecimal.valueOf(Driver.getToothCount()), DECIMAL_ACCURACY, GLOBAL_ROUNDING_MODE);
        return cwc;
    }

    public static ChangeGearCombi createChangeGearCombi(List<ChangeGear> Drivers, List<ChangeGear> Drivens) {
        ChangeGearCombi cwc = new ChangeGearCombi();
        cwc.driverList.addAll(Drivers);
        cwc.drivenList.addAll(Drivens);

        for (ChangeGear changeGear :
                Drivers
        ) {
            cwc.ratio = cwc.ratio.multiply(BigDecimal.valueOf(changeGear.getToothCount()))
                    .setScale(DECIMAL_ACCURACY, GLOBAL_ROUNDING_MODE);
            ;
        }

        for (ChangeGear changeGear :
                Drivens
        ) {
            cwc.ratio = cwc.ratio.divide(BigDecimal.valueOf(changeGear.getToothCount()),
                    DECIMAL_ACCURACY, GLOBAL_ROUNDING_MODE);
        }

        return cwc;
    }

    //needs to return true if toothcounts are all the same
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChangeGearCombi that = (ChangeGearCombi) o;
        return Objects.equals(ratio, that.ratio) &&
                drivenList.equals(that.drivenList) &&
                driverList.equals(that.driverList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(driverList, drivenList);
    }

    @Override
    public String toString() {
        return "ChangeWheelCombi{" +
                "ratio=" + ratio +
                ", driverList=" + driverList +
                ", drivenList=" + drivenList +
                '}' + System.lineSeparator();
    }
}
