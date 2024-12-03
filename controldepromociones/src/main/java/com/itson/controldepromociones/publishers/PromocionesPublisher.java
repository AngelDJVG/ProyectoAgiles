package com.itson.controldepromociones.publishers;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itson.controldepromociones.modelos.Promocion;
import org.springframework.beans.factory.annotation.Value;

@Component
public class PromocionesPublisher {

    private final AmqpTemplate amqpTemplate;
    private final ObjectMapper objectMapper;

    @Value("${promociones.exchange.name}")
    private String exchangeName;

    public PromocionesPublisher(AmqpTemplate amqpTemplate, ObjectMapper objectMapper) {
        this.amqpTemplate = amqpTemplate;
        this.objectMapper = objectMapper;
    }

    public void publicarPromocion(Promocion promocion) {
        try {
            String message = objectMapper.writeValueAsString(promocion);
            amqpTemplate.convertAndSend(exchangeName, "", message);
        } catch (JsonProcessingException ex) {
            System.out.println("Error al convertir a JSON");
        }
    }

}
