package com.itson.controlinventario.modelos;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
@Entity
@NoArgsConstructor
@Getter
@Setter

public class Inventario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El producto es obligatorio")
    @OneToOne
    @JoinColumn(name = "producto_id", referencedColumnName = "id")
    private Producto producto;

    @PositiveOrZero(message = "La cantidad disponible debe ser un número positivo o cero")
    private int cantidadDisponible;

    @NotNull(message = "La fecha de actualización es obligatoria")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaActualizacion;

    public Inventario(Producto producto, int cantidadDisponible, Date fechaActualizacion) {
        this.producto = producto;
        this.cantidadDisponible = cantidadDisponible;
        this.fechaActualizacion = fechaActualizacion;
    }
}
