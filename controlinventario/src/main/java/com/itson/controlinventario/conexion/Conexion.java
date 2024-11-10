package com.itson.controlinventario.conexion;

public class Conexion {

    private static Conexion instancia;

    private Conexion() {
    }



    public void conectar() {

    }

    public void desconectar() {
        System.out.println("Desconectando de la base de datos");
    }
}
