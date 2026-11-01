import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";

const PRODUCTOS_LOCALES = [
  { id: 1, title: "Apple AirPods Max Silver", category: "mobile-accessories", price: 549.99, description: "The Apple AirPods Max Silver are high-quality headphones designed for premium audio.", thumbnail: "https://unsplash.com" },
  { id: 2, title: "Apple iPhone Charger", category: "mobile-accessories", price: 25.99, description: "The Apple iPhone Charger is a high-quality charger designed for fast and efficient charging of your iPhone. Ensure your device stays powered up and ready to go.", thumbnail: "https://unsplash.com" },
  { id: 3, title: "Apple MagSafe Battery Pack", category: "mobile-accessories", price: 99.99, description: "Compact design makes on-the-go charging easy.", thumbnail: "https://unsplash.com" },
  { id: 4, title: "Beats Flex Wireless Earphones", category: "mobile-accessories", price: 49.99, description: "Magnetic earbuds with Auto-Pause.", thumbnail: "https://unsplash.com" }
];

const CATEGORIAS_LOCALES = [
  { slug: "mobile-accessories", name: "Mobile Accessories" }
];

function Products() {
  const [allProducts, setAllProducts] = useState(PRODUCTOS_LOCALES);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  function handleCreateOrUpdate(event) {
    event.preventDefault();
    if (editingProduct) {
      setAllProducts(allProducts.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
    } else {
      if (!title || !price) return;
      const newProd = {
        id: Date.now(),
        title,
        price: parseFloat(price),
        description,
        category: "mobile-accessories",
        thumbnail: "https://unsplash.com"
      };
      setAllProducts([newProd, ...allProducts]);
      setTitle(""); setPrice(""); setDescription("");
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    if (search.trim() === "") {
      setProducts(allProducts);
    } else {
      setProducts(allProducts.filter(p => p.title.toLowerCase().includes(search.toLowerCase())));
    }
  }

  return (
    <section>
      <h2>Buscando productos:</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input type="text" placeholder="phone" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Todas las categorías</option>
        {CATEGORIAS_LOCALES.map(cat => <option key={cat.slug} value={cat.slug}>{cat.name}</option>)}
      </select>

      {/* Formulario con clase oficial .product-form */}
      <div className="product-form">
        <h3 style={{ width: "100%", margin: "0 0 10px 0" }}>
          {editingProduct ? `Modificando:` : "Agregar producto"}
        </h3>
        <form onSubmit={handleCreateOrUpdate} style={{ display: "flex", flexWrap: "wrap", gap: "10px", width: "100%" }}>
          <input 
            type="text" placeholder="Nombre" required 
            value={editingProduct ? editingProduct.title : title}
            onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, title: e.target.value}) : setTitle(e.target.value)}
          />
          <input 
            type="number" placeholder="Precio" required 
            value={editingProduct ? editingProduct.price : price}
            onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, price: parseFloat(e.target.value)}) : setPrice(e.target.value)}
          />
          <textarea 
            placeholder="Descripción"
            value={editingProduct ? editingProduct.description : description}
            onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, description: e.target.value}) : setDescription(e.target.value)}
          />
          <button type="submit" style={{ backgroundColor: "#e5e5e5", color: "#222" }}>
            {editingProduct ? "Actualizar" : "Guardar"}
          </button>
        </form>
      </div>

      <ProductList 
        products={products} 
        onEdit={(prod) => setEditingProduct(prod)} 
        onDelete={(id) => setAllProducts(allProducts.filter(p => p.id !== id))} 
      />
    </section>
  );
}

export default Products;