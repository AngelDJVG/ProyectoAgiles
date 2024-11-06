package com.itson.controlinventario.modelos;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Producto {

    private String nombre;
    private String descripcion;
    private String marca;
    private String categoria;
    private float cantidad;

    public Producto(String nombre, String descripcion, String marca, String categoria, float cantidad) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.marca = marca;
        this.categoria = categoria;
        this.cantidad = cantidad;
    }



}
