package com.itson.controlinventario.repository;


import com.itson.controlinventario.modelos.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepositorio extends JpaRepository<Producto, Long> {

    List<Producto> findByNombreContainingIgnoreCase(String nombre);
    List<Producto> findByMarcaContainingIgnoreCase(String marca);
    List<Producto> findByCategoriaContainingIgnoreCase(String categoria);
}
