package com.itson.controlinventario.modelos;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.itson.controlinventario.enums.EstadoVenta;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

@Entity
@NoArgsConstructor
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Venta {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@NotNull(message = "La id del usuario es obligatoria")
private Long idCliente;

@NotNull(message = "La id del tipo de pago es obligatoria")
private Long idPago;

@PositiveOrZero(message = "La cantidad disponible debe ser un número positivo o cero")
@NotNull(message = "El total de la venta es obligatorio")
private Float total;

@NotNull(message = "La fecha de venta es obligatoria")
@Temporal(TemporalType.TIMESTAMP)
private Date fechaVenta;

@NotNull(message = "El estado de la venta es obligatorio")
@Enumerated(EnumType.STRING)
private EstadoVenta estado;

@OneToMany(mappedBy = "venta", cascade = CascadeType.ALL)
    private List<ProductoVenta> ventaProductos;

}

