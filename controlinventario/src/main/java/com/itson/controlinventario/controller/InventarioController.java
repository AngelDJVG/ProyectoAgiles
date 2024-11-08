package com.itson.controlinventario.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.itson.controlinventario.modelos.Inventario;
import com.itson.controlinventario.modelos.Producto;
@RestController
@RequestMapping({"/api/inventario"})
public class InventarioController {

private List<Inventario> inventario = new ArrayList<>(
    List.of(new Inventario(new Producto("Papas", "Papas con aire", "Aire", "Botanas", 0.20f), 2500, new Date()))
);

@GetMapping("/")
public List<Inventario> getInventario() {
    return inventario;
}
}
