import { Link } from "react-router-dom";

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="product-card">
      <img
        src={product.thumbnail || "https://placeholder.com"}
        alt={product.title}
      />

      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <strong>${product.price}</strong>

      <div className="actions">
        {/* Fila superior con Ver detalle y Editar distribuidos de manera equitativa */}
        <div className="actions-row">
          <Link to={`/products/${product.id}`}>
            Ver detalle
          </Link>
          <button onClick={() => onEdit(product)}>
            Editar
          </button>
        </div>

        {/* Fila inferior exclusiva para el botón Eliminar */}
        <button className="btn-delete" onClick={() => onDelete(product.id)}>
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default ProductCard;