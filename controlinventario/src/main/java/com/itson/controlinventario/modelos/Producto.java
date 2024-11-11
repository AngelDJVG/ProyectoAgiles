package com.itson.controlinventario.modelos;


import com.itson.controlinventario.enums.UnidadMedida;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre del producto es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 50 caracteres")
    private String nombre;

    @NotBlank(message = "La descripción del producto es obligatoria")
    @Size(max = 255, message = "La descripción no puede exceder 100 caracteres")
    private String descripcion;

    @NotBlank(message = "La marca del producto es obligatoria")
    @Size(max = 50, message = "La marca no puede exceder 50 caracteres")
    private String marca;

    @NotBlank(message = "La categoría del producto es obligatoria")
    @Size(max = 50, message = "La categoría no puede exceder 50 caracteres")
    private String categoria;

    @PositiveOrZero(message = "La cantidad debe ser un número positivo o cero")
    private float cantidad;

    @NotNull(message = "La unidad de medida del producto es obligatoria")
    private UnidadMedida unidadMedida;


    public Producto(String nombre, String descripcion, String marca, String categoria, float cantidad, UnidadMedida unidadMedida) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.marca = marca;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.unidadMedida = unidadMedida;
    }


}
