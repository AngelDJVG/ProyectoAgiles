package com.itson.controldepromociones.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.itson.controldepromociones.modelos.Promocion;
import com.itson.controldepromociones.repository.PromocionRepositorio;

@Service
public class PromocionServicio {
@Autowired
private PromocionRepositorio promocionRepositorio;

public Promocion guardarPromocion(Promocion promocion) {
    return promocionRepositorio.save(promocion);
}

public void actualizarPromocion(Promocion promocion) {
    promocionRepositorio.save(promocion);
}

public void eliminarPromocion(Promocion promocion) {
    promocionRepositorio.delete(promocion);
}

public List<Promocion> obtenerPromocionesPorProducto(Long idProducto) {
    return promocionRepositorio.findByProductoId(idProducto);
}

public Promocion obtenerPromocionPorId(Long id) {
    return promocionRepositorio.findById(id).orElse(null);
}

public List<Promocion> obtenerTodasLasPromociones() {
    return promocionRepositorio.findAll();
}

}
