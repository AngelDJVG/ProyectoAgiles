package com.itson.controldepromociones.repository;

import org.springframework.stereotype.Repository;
import com.itson.controldepromociones.modelos.Promocion;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface PromocionRepositorio extends JpaRepository<Promocion, Long>{

 @Query("SELECT p FROM Promocion p WHERE p.id_producto = :idProducto")
    List<Promocion> findByProductoId(@Param("idProducto") Long idProducto);
}
