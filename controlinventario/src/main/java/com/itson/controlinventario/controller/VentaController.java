package com.itson.controlinventario.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.itson.controlinventario.modelos.ProductoVenta;
import com.itson.controlinventario.modelos.Venta;
import com.itson.controlinventario.servicios.VentaServicio;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin(origins = "http://localhost:4000", originPatterns = "*")
@RequestMapping({ "/api/venta" })
public class VentaController {
@Autowired    
private VentaServicio ventaServicio;

@PostMapping(value = "/", consumes = {"application/xml","application/json"}) 
public ResponseEntity<Venta> crearVenta(@Valid @RequestBody Venta venta) {
    if (venta.getVentaProductos() != null) {
        for (ProductoVenta productoVenta : venta.getVentaProductos()) {
            productoVenta.setVenta(venta); 
        }
    }
    Venta nuevaVenta = ventaServicio.guardarVenta(venta);
    return ResponseEntity.ok(nuevaVenta);
}

@GetMapping("/")
public ResponseEntity<List<Venta>> obtenerTodasLasVentas() {
    List<Venta> ventas = ventaServicio.obtenerTodasLasVentas();
    if (ventas.isEmpty()) {
        return ResponseEntity.noContent().build();
    }
    return ResponseEntity.ok(ventas);
}

@GetMapping("/{id}")
public ResponseEntity<Venta> obtenerVentaPorId(@PathVariable Long id) {
    Venta venta = ventaServicio.obtenerVentaPorId(id);
    if (venta == null) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(venta);
}
}