package com.itson.controldepromociones.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.itson.controldepromociones.modelos.Promocion;
import com.itson.controldepromociones.servicios.PromocionServicio;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin(origins = "http://localhost:4002", originPatterns = "*")
@RequestMapping({ "/api/promociones" })
public class PromocionController {
@Autowired
private PromocionServicio promocionServicio;

@PostMapping(value = "/", consumes = {"application/xml","application/json"})
public ResponseEntity<Promocion> crearPromocion(@Valid @RequestBody Promocion promocion) {
    Promocion nuevaPromocion = promocionServicio.guardarPromocion(promocion);
    return ResponseEntity.ok(nuevaPromocion);
}

@PutMapping(value = "/", consumes = {"application/xml","application/json"})
public ResponseEntity<Promocion> actualizarPromocion(@Valid @RequestBody Promocion promocion) {
    promocionServicio.actualizarPromocion(promocion);
    return ResponseEntity.ok(promocion);
}

@DeleteMapping(value = "/{id}")
public ResponseEntity<Promocion> eliminarPromocion(@PathVariable Long id) {
    Promocion promocion = promocionServicio.obtenerPromocionPorId(id);
    if (promocion == null) {
        return ResponseEntity.notFound().build();
    }
    promocionServicio.eliminarPromocion(promocion);
    return ResponseEntity.ok(promocion);
}

@GetMapping("/producto/{idProducto}")
public ResponseEntity<List<Promocion>> obtenerPromocionesPorProducto(@PathVariable Long idProducto) {
    List<Promocion> promociones = promocionServicio.obtenerPromocionesPorProducto(idProducto);
    if (promociones.isEmpty()) {
        return ResponseEntity.noContent().build();
    }
    return ResponseEntity.ok(promociones);
}

@GetMapping("/{id}")
public ResponseEntity<Promocion> obtenerPromocionPorId(@PathVariable Long id) {
    Promocion promocion = promocionServicio.obtenerPromocionPorId(id);
    if (promocion == null) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(promocion);
}

@GetMapping("/")
public ResponseEntity<List<Promocion>> obtenerTodasLasPromociones() {
    List<Promocion> promociones = promocionServicio.obtenerTodasLasPromociones();
    if (promociones.isEmpty()) {
        return ResponseEntity.noContent().build();
    }
    return ResponseEntity.ok(promociones);
}


}
