package com.itson.controlinventario.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itson.controlinventario.modelos.Venta;

@Repository
public interface VentaRepositorio extends JpaRepository<Venta, Long> {    

List<Venta> findByIdCliente(Long id);
/*
@Query("SELECT v FROM Venta v JOIN v.productos p WHERE LOWER(p.nombre) LIKE LOWER(CONCAT('%', :producto, '%'))")
List<Venta> findByProductoNombreContainingIgnoreCase(String producto);

@Query("SELECT v FROM Venta v JOIN v.productos p WHERE LOWER(p.nombre) LIKE LOWER(CONCAT('%', :producto, '%')) AND v.idCliente = :idCliente")
    List<Venta> findByProductoNombreContainingIgnoreCaseAndIdCliente(@Param("producto") String producto, @Param("idCliente") Long idCliente);
*/

}
