// ProductCard.js
import { useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product?.images[0]?.src);
  const hasSalePrice = product?.sale_price || product?.variations?.some((variation) => variation?.sale_price);

  return (
    <div className=" product-card position-relative">
      {!hasSalePrice && (
        <span className="badge bg-danger position-absolute top-0 start-0 m-2">Sale</span>
      )}
      <Link href={`/Collection/${product.slug}`} className="text-decoration-none">
        <div
          className="card-img-top product-image"
          style={{ backgroundImage: `url(${currentImage})` }}
          onMouseEnter={() => setCurrentImage(product.images?.[1]?.src || currentImage)}
          onMouseLeave={() => setCurrentImage(product.images?.[0]?.src)}
        >
          <div className="overlay text-center">
            <span className="btn btn-dark">Quick View</span>
          </div>
        </div>
      </Link>
      <div className="card-body text-center">
        <h5 className="card-title">
          <Link href={`/Collection/${product.slug}`} className="text-dark text-decoration-none">
            {product?.name}
          </Link>
        </h5>
        <p className="card-text" dangerouslySetInnerHTML={{ __html: product.price_html }} />
      </div>
    </div>
  );
};
export default ProductCard;