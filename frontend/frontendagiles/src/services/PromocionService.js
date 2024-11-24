export default class PromocionService {
    static crearPromocion(promocion) {
        return fetch('http://localhost:4002/api/promociones/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(promocion),
        }).then(response => response.ok ? response.json() : null)
        .catch(error => null);
    }

}