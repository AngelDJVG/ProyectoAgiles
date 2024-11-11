package com.itson.controlinventario.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itson.controlinventario.modelos.Inventario;
@Repository
public interface InventarioRepositorio extends JpaRepository<Inventario, Long> { 
    List<Inventario> findByProductoNombreContainingIgnoreCase(String producto);
    Inventario findByProductoId(Long id);
}
