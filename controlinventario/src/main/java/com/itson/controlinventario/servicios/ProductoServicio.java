package com.itson.controlinventario.servicios;


import com.itson.controlinventario.modelos.Producto;
import com.itson.controlinventario.repository.ProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoServicio {

    @Autowired
    private ProductoRepositorio productoRepositorio;

    public List<Producto> obtenerTodos() {
        return productoRepositorio.findAll();
    }

    public Producto obtenerPorId(Long id) {
        return productoRepositorio.findById(id).orElse(null);
    }

    public Producto guardar(Producto producto) {
        return productoRepositorio.save(producto);
    }

    public void eliminar(Long id) {
        productoRepositorio.deleteById(id);
    }

    public Producto actualizar(Producto producto) {
        return productoRepositorio.save(producto);
    }

    public List<Producto> buscarPorNombre(String nombre) {
        return productoRepositorio.findByNombreContainingIgnoreCase(nombre);
    }

    public List<Producto> buscarPorMarca(String marca) {
        return productoRepositorio.findByMarcaContainingIgnoreCase(marca);
    }

    public List<Producto> buscarPorCategoria(String categoria) {
        return productoRepositorio.findByCategoriaContainingIgnoreCase(categoria);
    }

}
