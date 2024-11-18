package com.itson.controlinventario;

import com.itson.controlinventario.enums.UnidadMedida;
import com.itson.controlinventario.modelos.Inventario;
import com.itson.controlinventario.modelos.Producto;
import com.itson.controlinventario.repository.InventarioRepositorio;
import com.itson.controlinventario.servicios.InventarioServicio;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import jakarta.validation.ConstraintViolation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Date;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class InventarioTest {

    private Validator validator;

    @Mock
    private InventarioRepositorio inventarioRepositorio; 

    @InjectMocks
    private InventarioServicio inventarioServicio; 

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testInventarioValido() {
        Producto producto = new Producto("Producto 1", "Descripción del producto", "Marca X", "Categoría A", 10.5f,
                UnidadMedida.KILOGRAMO, 100f, "imagen.jpg");
        Inventario inventario = new Inventario(producto, 50, new Date());

        Set<ConstraintViolation<Inventario>> violations = validator.validate(inventario);

        assertTrue(violations.isEmpty(), "El inventario debe ser válido");
    }

    @Test
    void testInventarioCantidadNegativa() {
        Producto producto = new Producto("Producto 1", "Descripción del producto", "Marca X", "Categoría A", 10.5f,
                UnidadMedida.KILOGRAMO, 100f, "imagen.jpg");
        Inventario inventario = new Inventario(producto, -5, new Date());

        Set<ConstraintViolation<Inventario>> violations = validator.validate(inventario);

        assertFalse(violations.isEmpty(), "La cantidad disponible debe ser positiva o cero");
        assertEquals("La cantidad disponible debe ser un número positivo o cero",
                violations.iterator().next().getMessage());
    }

    @Test
    void testInventarioFechaNula() {
        Producto producto = new Producto("Producto 1", "Descripción del producto", "Marca X", "Categoría A", 10.5f,
                UnidadMedida.KILOGRAMO, 100f, "imagen.jpg");
        Inventario inventario = new Inventario(producto, 50, null);

        Set<ConstraintViolation<Inventario>> violations = validator.validate(inventario);

        assertFalse(violations.isEmpty(), "La fecha de actualización es obligatoria");
        assertEquals("La fecha de actualización es obligatoria", violations.iterator().next().getMessage());
    }

    @Test
    void testGuardar() {
        Producto producto = new Producto("Producto 1", "Descripción", "Marca A", "Categoría A", 10.0f,
                UnidadMedida.KILOGRAMO, 100f, "imagen.jpg");
        Inventario inventario = new Inventario(producto, 30, new Date());

        when(inventarioRepositorio.save(any(Inventario.class))).thenAnswer(invocation -> {
            Inventario inv = invocation.getArgument(0);
            inv.setId(1L); 
            return inv;
        });

        Inventario inventarioGuardado = inventarioServicio.crear(inventario);

        assertNotNull(inventarioGuardado.getId(), "El inventario debe ser guardado con un ID asignado");
        assertEquals(1L, inventarioGuardado.getId(), "El ID del inventario debe ser 1");
        verify(inventarioRepositorio).save(any(Inventario.class)); 
    }

    @Test
    void testActualizarInventario() {
        Producto producto = new Producto("Producto 1", "Descripción", "Marca A", "Categoría A", 10.0f,
                UnidadMedida.KILOGRAMO, 100f, "imagen.jpg");
        Inventario inventarioOriginal = new Inventario(producto, 30, new Date());

        inventarioOriginal.setId(1L);

        Inventario inventarioActualizado = new Inventario(producto, 50, new Date());

        when(inventarioRepositorio.save(any(Inventario.class))).thenReturn(inventarioActualizado);

        Inventario inventarioRetornado = inventarioServicio.actualizar(inventarioOriginal);

        assertNotNull(inventarioRetornado, "El inventario actualizado no debe ser nulo");
        assertEquals(50, inventarioRetornado.getCantidadDisponible(),
                "La cantidad debe ser 50 después de la actualización");
        verify(inventarioRepositorio).save(any(Inventario.class)); 
    }

    @Test
    void testBorrarInventario() {
        Producto producto = new Producto("Producto 1", "Descripción", "Marca A", "Categoría A", 10.0f,
                UnidadMedida.KILOGRAMO, 100f, "imagen.jpg");
        Inventario inventario = new Inventario(producto, 30, new Date());

        inventario.setId(1L);

        when(inventarioRepositorio.existsById(inventario.getId())).thenReturn(true);
                                                                                    
        inventarioServicio.eliminar(inventario.getId());

        verify(inventarioRepositorio).deleteById(inventario.getId());
    }

}
