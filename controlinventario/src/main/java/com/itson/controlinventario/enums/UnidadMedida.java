package com.itson.controlinventario.enums;

public enum UnidadMedida {
    PIEZA("pz"),
    KILOGRAMO("kg"),
    LITRO("lt"),
    MILILITRO("ml"),
    UNIDAD("und");


    private final String abreviatura;

    UnidadMedida(String abreviatura) {
        this.abreviatura = abreviatura;
    }

    public String getAbreviatura() {
        return abreviatura;
    }
}
