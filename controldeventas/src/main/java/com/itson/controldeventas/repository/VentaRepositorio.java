package com.itson.controldeventas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itson.controldeventas.modelos.Venta;

@Repository
public interface VentaRepositorio extends JpaRepository<Venta, Long> {

    List<Venta> findByIdCliente(Long id);
    
}
