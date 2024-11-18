
export default class ProductoService{
    static getProductos(){
        return fetch('http://localhost:4000/api/productos')
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log("Error al obtener los productos"));
    }

    static crearProducto(producto){
      ProductoService.getImagePexels(producto.nombre).then((imageUrl) => {
        producto.imageUrl = imageUrl;}).catch((error) => 
        producto.imageUrl= "https://img.freepik.com/vector-premium/ilustracion-dibujos-animados-vectoriales-caja-plana-2d-colorida_1120558-24362.jpg");
        return fetch('http://localhost:4000/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        })
        .then(response => response.json())
        .catch(error => console.log("Error al crear el producto"));
    }


    static deleteProducto(id){
        return fetch(`http://localhost:4000/api/productos/${id}`, {
            method: 'DELETE'
        })
        .then(response => response)
        .catch(error => console.log("Error al eliminar el producto"));
    }

    static getImagePexels = async (nombreProducto) => {
        const apiKey = process.env.IMAGES_API;
        const url = `${process.env.IMAGES_API_URL}${encodeURIComponent(nombreProducto)}&per_page=1`;
        try {
          const response = await fetch(url, {
            headers: {
              Authorization: apiKey
            }
          });
          if (!response.ok) {
            return "https://img.freepik.com/vector-premium/ilustracion-dibujos-animados-vectoriales-caja-plana-2d-colorida_1120558-24362.jpg";
          }
          const data = await response.json();
          const imageUrl = data.photos[0]?.src?.medium; 
          return imageUrl;
        } catch (error) {
          return "https://img.freepik.com/vector-premium/ilustracion-dibujos-animados-vectoriales-caja-plana-2d-colorida_1120558-24362.jpg";
        }
      };
}