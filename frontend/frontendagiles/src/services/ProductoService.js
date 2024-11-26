export default class ProductoService {
  static DEFAULT_IMAGE_URL =
    "https://img.freepik.com/vector-premium/ilustracion-dibujos-animados-vectoriales-caja-plana-2d-colorida_1120558-24362.jpg";

  static getProductosInventario() {
    return fetch('http://localhost:4000/api/inventario/')
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log("Error al obtener los producto inventario"));
  }

  static getProductos() {
    return fetch('http://localhost:4000/api/productos')
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log("Error al obtener los producto inventario"));
  }

  static crearProductoInventario(producto, stock) {
    return ProductoService.getImagePexels(producto.nombre)
      .then(imageUrl => {
        producto.imageUrl = imageUrl || ProductoService.DEFAULT_IMAGE_URL;
        return fetch("http://localhost:4000/api/productos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(producto),
        });
      })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error("Error al crear el producto"));
        } else {
          return response.json();
        }
      })
      .then(data => {
        const inventario = { producto: data, cantidadDisponible: stock };
        return fetch("http://localhost:4000/api/inventario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inventario),
        }).then(response => {
          if (!response.ok) {
            return Promise.reject(new Error("Error al crear el inventario"));
          }
          return response.json();
        });
      })
      .catch(error => {
        console.error("Error al crear producto:", error.message);
        throw error;
      });
  }

  static actualizarInventario(idInventario, stock) {
    return fetch(`http://localhost:4000/api/inventario/${idInventario}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: idInventario, cantidadDisponible: stock })
    })
      .then(response => response.status === 200 ? response.json() : null)
      .catch(error => console.log("Error al actualizar el producto inventario"));
  }

  static deleteInventario(id) {
    return fetch(`http://localhost:4000/api/inventario/${id}`, {
      method: 'DELETE'
    })
      .then(response => response)
      .catch(error => console.log("Error al eliminar el producto inventario"));
  }

  static getImagePexels(nombreProducto) {
    const apiKey = "qPJnkC9xvyBpdhgYIAQrJenU3CsqBFebC9yf9kLebTtHnJAhoHHjBDtB";
    const url = `https://api.pexels.com/v1/search?query=${nombreProducto}&per_page=1`;
    return fetch(url, {
      headers: { Authorization: apiKey },
    }).then(response => {
      if (!response.ok) {
        return null;
      }
      return response.json();
    })
      .then(data => {
        return data.photos[0]?.src?.medium || null;
      })
      .catch(error => {
        return null;
      });
  }

  static buscarPorNombre(nombre) {
    return fetch(`http://localhost:4000/api/productos/nombre/${nombre}`)
      .then(async (response) => {
        if (!response.ok) {
          return [];
        }

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          return [];
        }

        return await response.json();
      })
      .catch((error) => {
        console.error("Error al buscar productos por nombre:", error.message);
        return [];
      });
  }

  static buscarPorMarca(marca) {
    return fetch(`http://localhost:4000/api/productos/marca/${marca}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Error al buscar productos por marca");
        }

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("La respuesta no es JSON");
        }

        return await response.json(); // Intentar parsear la respuesta JSON
      })
      .catch((error) => {
        console.error("Error al buscar productos por marca:", error.message);
        return [];
      });
  }

  static buscarPorCategoria(categoria) {
    return fetch(`http://localhost:4000/api/productos/categoria/${categoria}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Error al buscar productos por categoría");
        }

        // Verificar que el contenido sea JSON
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("La respuesta no es JSON");
        }

        return await response.json(); // Intentar parsear la respuesta JSON
      })
      .catch((error) => {
        console.error("Error al buscar productos por categoría:", error.message);
        return []; // Devolver un arreglo vacío en caso de error
      });
  }


}