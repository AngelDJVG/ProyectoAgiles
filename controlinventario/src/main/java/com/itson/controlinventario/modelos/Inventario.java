package com.itson.controlinventario.modelos;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

import org.springframework.web.bind.annotation.RequestMapping;

@Getter
@Setter

public class Inventario {
    private Producto producto;
    private int cantidadDisponible;
    private Date fechaActualizacion;

    public Inventario(Producto producto, int cantidadDisponible, Date fechaActualizacion) {
        this.producto = producto;
        this.cantidadDisponible = cantidadDisponible;
        this.fechaActualizacion = fechaActualizacion;
    }
}
