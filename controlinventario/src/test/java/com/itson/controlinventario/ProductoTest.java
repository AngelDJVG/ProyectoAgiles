package com.itson.controlinventario;

import com.itson.controlinventario.modelos.Producto;
import com.itson.controlinventario.repository.ProductoRepositorio;
import com.itson.controlinventario.servicios.ProductoServicio;
import com.itson.controlinventario.enums.UnidadMedida;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import jakarta.validation.ConstraintViolation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class ProductoTest {

    private Validator validator;

    @Mock
    private ProductoRepositorio productoRepositorio;

    @InjectMocks
    private ProductoServicio productoServicio;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
        MockitoAnnotations.openMocks(this); 

    }

    @Test
    void testProductoValido() {
        Producto producto = new Producto(
                "Producto 1", // Nombre
                "Descripción del producto", // Descripción
                "Marca X", // Marca
                "Categoría A", // Categoría
                10.5f, // Cantidad
                UnidadMedida.KILOGRAMO // Unidad de medida
        );

        Set<ConstraintViolation<Producto>> violations = validator.validate(producto);

        assertTrue(violations.isEmpty(), "El producto debe ser válido");
    }

    @Test
    void testProductoNombreVacio() {
        Producto producto = new Producto(
                "", // Nombre vacío
                "Descripción del producto", // Descripción
                "Marca X", // Marca
                "Categoría A", // Categoría
                10.5f, // Cantidad
                UnidadMedida.KILOGRAMO // Unidad de medida
        );

        Set<ConstraintViolation<Producto>> violations = validator.validate(producto);

        assertFalse(violations.isEmpty(), "El nombre no puede estar vacío");
        assertEquals("El nombre del producto es obligatorio", violations.iterator().next().getMessage());
    }

    @Test
    void testProductoCantidadNegativa() {
        Producto producto = new Producto(
                "Producto 1", // Nombre
                "Descripción del producto", // Descripción
                "Marca X", // Marca
                "Categoría A", // Categoría
                -10.5f, // Cantidad negativa
                UnidadMedida.KILOGRAMO // Unidad de medida
        );

        Set<ConstraintViolation<Producto>> violations = validator.validate(producto);

        assertFalse(violations.isEmpty(), "La cantidad debe ser positiva o cero");
        assertEquals("La cantidad debe ser un número positivo o cero", violations.iterator().next().getMessage());
    }

    @Test
    void testProductoUnidadMedidaNula() {
        Producto producto = new Producto(
                "Producto 1", // Nombre
                "Descripción del producto", // Descripción
                "Marca X", // Marca
                "Categoría A", // Categoría
                10.5f, // Cantidad
                null // Unidad de medida nula
        );

        Set<ConstraintViolation<Producto>> violations = validator.validate(producto);

        assertFalse(violations.isEmpty(), "La unidad de medida es obligatoria");
        assertEquals("La unidad de medida del producto es obligatoria", violations.iterator().next().getMessage());
    }

    @Test
    void testGuardar() {
        Producto producto = new Producto("Producto 1", "Descripción", "Marca A", "Categoría A", 10.0f,
                UnidadMedida.KILOGRAMO);

        when(productoRepositorio.save(any(Producto.class))).thenAnswer(invocation -> {
            Producto p = invocation.getArgument(0);
            p.setId(1L);
            return p;
        });

        Producto productoGuardado = productoServicio.guardar(producto);

        assertNotNull(productoGuardado.getId(), "El producto debe ser guardado con un ID asignado");
        assertEquals(1L, productoGuardado.getId(), "El ID del producto debe ser 1");
        verify(productoRepositorio).save(any(Producto.class)); 
    }

    @Test
    void testActualizarProducto() {
        Producto productoOriginal = new Producto("Producto 1", "Descripción", "Marca A", "Categoría A", 10.0f,
                UnidadMedida.KILOGRAMO);
        productoOriginal.setId(1L);

        Producto productoActualizado = new Producto("Producto Actualizado", "Descripción Actualizada", "Marca B",
                "Categoría B", 15.0f, UnidadMedida.LITRO);

        when(productoRepositorio.save(any(Producto.class))).thenReturn(productoActualizado);

        Producto productoRetornado = productoServicio.actualizar(productoOriginal);

        assertNotNull(productoRetornado, "El producto actualizado no debe ser nulo");
        assertEquals("Producto Actualizado", productoRetornado.getNombre(), "El nombre debe ser actualizado");
        assertEquals(15.0f, productoRetornado.getCantidad(), "La cantidad debe ser 15 después de la actualización");
        assertEquals(UnidadMedida.LITRO, productoRetornado.getUnidadMedida(),
                "La unidad de medida debe ser LITRO después de la actualización");
        verify(productoRepositorio).save(any(Producto.class)); 
    }

    @Test
    void testBorrarProducto() {
        Producto producto = new Producto("Producto 1", "Descripción", "Marca A", "Categoría A", 10.0f,
                UnidadMedida.KILOGRAMO);
        producto.setId(1L);

        when(productoRepositorio.existsById(producto.getId())).thenReturn(true);

        productoServicio.eliminar(producto.getId());

        verify(productoRepositorio).deleteById(producto.getId());
    }

}
