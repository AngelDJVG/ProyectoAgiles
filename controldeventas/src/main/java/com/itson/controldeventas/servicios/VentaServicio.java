package com.itson.controldeventas.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itson.controldeventas.modelos.Venta;
import com.itson.controldeventas.repository.VentaRepositorio;
import com.itson.controldeventas.enums.EstadoVenta;

@Service
public class VentaServicio {

    @Autowired
    private VentaRepositorio ventaRepositorio;
    
    public Venta guardarVenta(Venta venta) {
        return ventaRepositorio.save(venta);
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

    public Venta cancelarVenta(Long id) {
        Venta venta = obtenerVentaPorId(id);
        
        if (venta == null) {
            return null;
        }

        if(venta.getEstado() == EstadoVenta.CANCELADA || venta.getEstado() == EstadoVenta.COMPLETADA){
            return null;
        }

        venta.setEstado(EstadoVenta.CANCELADA);
        ventaRepositorio.save(venta);
        return venta;
    }
    
    
}
