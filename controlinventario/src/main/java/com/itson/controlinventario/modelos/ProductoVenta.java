package com.itson.controlinventario.modelos;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class ProductoVenta {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

    @ManyToOne
    @JoinColumn(name = "id_venta")
    private Venta venta;

    @ManyToOne
    @JoinColumn(name = "id_producto")
    private Producto producto;

    @PositiveOrZero(message = "La cantidad debe ser un número positivo o cero")
    @NotNull(message = "La cantidad es obligatoria")
    private Integer cantidad;

    @PositiveOrZero(message = "El precio de venta debe ser un número positivo o cero")
    @NotNull(message = "El precio de venta es obligatorio")
    private Float precioVenta;

    @PositiveOrZero(message = "El subtotal debe ser un número positivo o cero")
    @NotNull(message = "El subtotal es obligatorio")
    private Float subtotal;

    @PrePersist
    @PreUpdate
    public void calcularSubtotal() {
        if (producto != null && cantidad != null) {; 
            this.subtotal = this.cantidad * this.precioVenta;
        }
    }
}
