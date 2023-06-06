import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartItemsCount = cartList.length
      const cartPriceList = cartList.map(each => each.price * each.quantity)

      console.log(cartPriceList)
      const sumOfCartPrice = cartPriceList.reduce((acc, curr) => acc + curr)

      return (
        <div className="cart-summery-container">
          <div>
            <h1 className="cart-price-heading">
              Order Total:
              <span className="cart-price"> Rs {sumOfCartPrice}/-</span>
            </h1>

            <p className="items-count">{cartItemsCount} items in cart</p>
            <button className="checkout-btn desktop-view-btn" type="button">
              Checkout
            </button>
          </div>
          <button className="checkout-btn mobile-view-btn" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
