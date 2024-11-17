package com.itson.controlinventario.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

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

    @JsonValue
    public String getAbreviatura() {
        return abreviatura;
    }

    @JsonCreator
    public static UnidadMedida fromAbreviatura(String abreviatura) {
        for (UnidadMedida unidad : UnidadMedida.values()) {
            if (unidad.abreviatura.equalsIgnoreCase(abreviatura)) {
                return unidad;
            }
        }
        throw new IllegalArgumentException("Abreviatura no válida: " + abreviatura);
    }
}