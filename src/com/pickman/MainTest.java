package com.pickman;

class MainTest {

    @org.junit.jupiter.api.BeforeEach
    void setUp() {
    }

    @org.junit.jupiter.api.AfterEach
    void tearDown() {
    }

    @org.junit.jupiter.api.Test
    void main() {

        System.out.println("test running");

        String[] testInput = {"40", "30", "20", "20", "34", "55"};

        Main.main(testInput);


    }
}