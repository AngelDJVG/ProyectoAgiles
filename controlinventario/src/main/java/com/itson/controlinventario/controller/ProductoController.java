package com.itson.controlinventario.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.itson.controlinventario.modelos.Producto;

import java.util.ArrayList;
import java.util.List;


@RestController
public class ProductoController {


    private List<Producto> productos = new ArrayList<>(
            List.of(
                    new Producto("Coca Cola", "Bebida gaseosa", "Coca Cola Company", "Bebidas", 1.5f),
                    new Producto("Galletas Oreo", "Galletas rellenas de crema", "Nabisco", "Galletas", 0.3f),
                    new Producto("Sabritas", "Papas fritas clásicas", "Sabritas", "Botanas", 0.15f)
            )
    );

    @GetMapping("/producto")
    public List<Producto> getProductos() {
        return productos;

    }
}