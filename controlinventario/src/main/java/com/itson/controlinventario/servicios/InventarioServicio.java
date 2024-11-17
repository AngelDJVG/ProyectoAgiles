package com.itson.controlinventario.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itson.controlinventario.modelos.Inventario;
import com.itson.controlinventario.repository.InventarioRepositorio;

@Service
public class InventarioServicio {
    @Autowired
    private InventarioRepositorio inventarioRepositorio;

    public List<Inventario> obtenerInventario() {
        return inventarioRepositorio.findAll();
    }

    public Inventario obtenerPorId(Long id) {
        return inventarioRepositorio.findById(id).orElse(null);
    }

    public Inventario crear(Inventario inventario) {
        return inventarioRepositorio.save(inventario);
    }

    public void eliminar(Long id) {
        inventarioRepositorio.deleteById(id);
    }

    public Inventario actualizar(Inventario inventario) {
        return inventarioRepositorio.save(inventario);
    }

    public List<Inventario> buscarPorProductoNombre(String producto) {
        return inventarioRepositorio.findByProductoNombreContainingIgnoreCase(producto);
    }

    public Inventario buscarPorProductoId(Long id) {
        return inventarioRepositorio.findByProductoId(id);
    }


}
