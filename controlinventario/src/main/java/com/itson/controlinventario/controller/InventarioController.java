package com.itson.controlinventario.controller;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.itson.controlinventario.modelos.Inventario;
import com.itson.controlinventario.modelos.Producto;
import com.itson.controlinventario.servicios.InventarioServicio;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin(origins = "http://localhost:4000", originPatterns = "*")
@RequestMapping({ "/api/inventario" })
public class InventarioController {

    @Autowired
    private InventarioServicio inventarioServicio;

    @GetMapping("/")
    public ResponseEntity<List<Inventario>> obtenerInventario() {
        List<Inventario> inventario = inventarioServicio.obtenerInventario();
        if (inventario.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(inventario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventario> obtenerInventarioPorId(@RequestParam Long id) {
        Inventario inventario = inventarioServicio.obtenerPorId(id);
        if (inventario == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(inventario);
    }

    @PostMapping
    public ResponseEntity<Inventario> crearInventario(@Valid @RequestBody Inventario inventario) {
        Inventario nuevoInventario = inventarioServicio.crear(inventario);
        return ResponseEntity.ok(nuevoInventario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarInventario(@PathVariable Long id) {
        Inventario inventario = inventarioServicio.obtenerPorId(id);
        if (inventario == null) {
            return ResponseEntity.notFound().build();
        }
        inventarioServicio.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inventario> actualizarInventario(@RequestBody Inventario inventario) {
        Inventario inventarioActualizado = inventarioServicio.actualizar(inventario);
        return ResponseEntity.ok(inventarioActualizado);
    }

    @GetMapping("/nombre/{producto}")
    public ResponseEntity<List<Inventario>> buscarPorProductoNombre(@PathVariable String producto) {
        List<Inventario> inventario = inventarioServicio.buscarPorProductoNombre(producto);
        if (inventario.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(inventario);
    }

    @GetMapping("/producto/{id}")
    public ResponseEntity<Inventario> buscarPorProductoId(@PathVariable Long id) {
        Inventario inventario = inventarioServicio.buscarPorProductoId(id);
        if (inventario == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(inventario);
    }
}
