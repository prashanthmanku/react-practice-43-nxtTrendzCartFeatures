import {Link} from 'react-router-dom'
import './index.css'

const SimilarProductItem = props => {
  const {productDetails, getSimilarProductData} = props
  const {title, brand, imageUrl, rating, id, price} = productDetails

  const onClickSimilarProduct = () => {
    getSimilarProductData(id)
  }

  return (
    <li className="similar-product-item">
      <Link
        to={`/products/${id}`}
        className="similar-product-nav-link"
        onClick={onClickSimilarProduct}
      >
        <img
          src={imageUrl}
          className="similar-product-img"
          alt={`similar product ${title}`}
        />
        <p className="similar-product-title">{title}</p>
        <p className="similar-products-brand">by {brand}</p>
        <div className="similar-product-price-rating-container">
          <p className="similar-product-price">Rs {price}/-</p>
          <div className="similar-product-rating-container">
            <p className="similar-product-rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="similar-product-star"
            />
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SimilarProductItem
