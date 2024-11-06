package com.itson.controlinventario;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.itson.controlinventario.controller.ProductoController;
import com.itson.controlinventario.modelos.Producto;

@SpringBootApplication
public class ControlinventarioApplication {

	public static void main(String[] args) {
		SpringApplication.run(ControlinventarioApplication.class, args);
		ProductoController productoController = new ProductoController();
		for (Producto producto : productoController.getProductos()) {
			System.out.println(producto.getNombre());
		}

	}

}
