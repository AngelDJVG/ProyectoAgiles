
export default class ProductoService{
    static getProductos(){
        return fetch('http://localhost:4000/api/productos')
        .then(response => response.json())
        .then(data => data);
    }

    static deleteProducto(id){
        return fetch(`http://localhost:4000/api/productos/${id}`, {
            method: 'DELETE'
        })
        .then(response => response); 
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
            return null;
          }
          const data = await response.json();
          const imageUrl = data.photos[0]?.src?.medium; 
          return imageUrl;
        } catch (error) {
          return null;
        }
      };
}