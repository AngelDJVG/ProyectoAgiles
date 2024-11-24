package com.itson.controldepromociones.modelos;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@NoArgsConstructor
@Getter
@Setter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Promocion {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@PositiveOrZero(message = "El id debe ser un número positivo o cero")
@NotNull(message = "El id de producto es obligatorio")
private Long id_producto;

@PositiveOrZero(message = "El monto debe ser un número positivo o cero")
@NotNull(message = "El monto es obligatorio")
private Float monto;

@NotNull(message = "La fecha de inicio es obligatoria")
@Temporal(TemporalType.TIMESTAMP)
private Date fechaInicio;

@NotNull(message = "La fecha de fin es obligatoria")
@Temporal(TemporalType.TIMESTAMP)
private Date fechaFin;
}
