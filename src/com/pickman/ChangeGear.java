package com.pickman;

/**
 * Represents one change gear with a fixed number of teeth
 * tooth count must be a positive integer between the max and min values specified below
 */

public class ChangeGear {

    public static final Integer MINIMUM_TOOTH_COUNT = 7;
    public static final Integer MAXIMUM_TOOTH_COUNT = 250;

    private Integer toothCount;

    public int getToothCount() {
        return toothCount;
    }

    @Override
    public String toString() {
        return "ChangeGear{" +
                ", toothCount=" + toothCount +
                '}';
    }

    public static ChangeGear create(int toothCount) throws InvalidChangeGearException {
        if (toothCount <= MAXIMUM_TOOTH_COUNT
                && toothCount >= MINIMUM_TOOTH_COUNT) {
            ChangeGear cw = new ChangeGear();
            cw.toothCount = toothCount;
            return cw;
        } else throw new InvalidChangeGearException("toothCount is not within allowable range: " + toothCount);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChangeGear that = (ChangeGear) o;
        return this.toothCount.equals(that.getToothCount());
    }

    @Override
    public int hashCode() {
        return toothCount.hashCode();
    }

    public static class InvalidChangeGearException extends Exception {
        public InvalidChangeGearException(String errorMessage) {
            super(errorMessage);
        }
    }

}
