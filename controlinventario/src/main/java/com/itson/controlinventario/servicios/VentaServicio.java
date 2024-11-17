package com.itson.controlinventario.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itson.controlinventario.modelos.Venta;
import com.itson.controlinventario.repository.VentaRepositorio;

@Service
public class VentaServicio {

    @Autowired
    private VentaRepositorio ventaRepositorio;
    
    public Venta guardarVenta(Venta venta) {
        return ventaRepositorio.save(venta);
    }

    public void eliminarVenta(Long id) {
        ventaRepositorio.deleteById(id);
    }

    public void actualizarVenta(Venta venta) {
        ventaRepositorio.save(venta);
    }

    public List<Venta> obtenerVentasPorUsuario(Long idCliente) {
        return ventaRepositorio.findByIdCliente(idCliente);
    }

    public Venta obtenerVentaPorId(Long id) {
        return ventaRepositorio.findById(id).orElse(null);
    }
    
    public List<Venta> obtenerTodasLasVentas() {
        return ventaRepositorio.findAll();
    }
    
    
}
