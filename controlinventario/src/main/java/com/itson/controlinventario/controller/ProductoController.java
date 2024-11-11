package com.itson.controlinventario.controller;


import com.itson.controlinventario.servicios.ProductoServicio;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.itson.controlinventario.modelos.Producto;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4000", originPatterns = "*")
@RequestMapping({"/api/productos"})
public class ProductoController {

    @Autowired
    private ProductoServicio productoServicio;


    @GetMapping
    public ResponseEntity<List<Producto>> obtenerProductos() {
        List<Producto> productos = productoServicio.obtenerTodos();
        if (productos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProducto(@PathVariable Long id) {
        Producto producto = productoServicio.obtenerPorId(id);
        if (producto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(producto);
    }

    @PostMapping
    public ResponseEntity<Producto> crearProducto(@Valid @RequestBody Producto producto) {
        Producto nuevoProducto = productoServicio.guardar(producto);
        return ResponseEntity.ok(nuevoProducto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @Valid @RequestBody Producto producto) {
        Producto productoActual = productoServicio.obtenerPorId(id);
        if (productoActual == null) {
            return ResponseEntity.notFound().build();
        }
        producto.setId(id);
        Producto productoActualizado = productoServicio.guardar(producto);
        return ResponseEntity.ok(productoActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        Producto producto = productoServicio.obtenerPorId(id);
        if (producto == null) {
            return ResponseEntity.notFound().build();
        }
        productoServicio.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<List<Producto>> buscarPorNombre(@PathVariable String nombre) {
        List<Producto> productos = productoServicio.buscarPorNombre(nombre);
        if (productos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/marca/{marca}")
    public ResponseEntity<List<Producto>> buscarPorMarca(@PathVariable String marca) {
        List<Producto> productos = productoServicio.buscarPorMarca(marca);
        if (productos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Producto>> buscarPorCategoria(@PathVariable String categoria) {
        List<Producto> productos = productoServicio.buscarPorCategoria(categoria);
        if (productos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(productos);
    }

}