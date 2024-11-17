package com.itson.controlinventario.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EstadoVenta {
    COMPLETADA("Completada"),
    PENDIENTE("Pendiente"),
    CANCELADA("Cancelada");

    private final String estado;

    EstadoVenta(String estado) {
        this.estado = estado;
    }

    @JsonValue
    public String getEstado() {
        return estado;
    }

    @JsonCreator
    public static EstadoVenta fromEstado(String estado) {
        for (EstadoVenta e : EstadoVenta.values()) {
            if (e.estado.equalsIgnoreCase(estado)) {
                return e;
            }
        }
        throw new IllegalArgumentException("Estado no válido: " + estado);
    }
}
