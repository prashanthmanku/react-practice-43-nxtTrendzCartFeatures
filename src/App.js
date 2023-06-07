import {Component, useEffect} from 'react'
import {Route, Switch, Redirect, useHistory} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

function ScrollToTop() {
  const history = useHistory()

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })

    return () => {
      unlisten()
    }
  }, [history])

  return null
}

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeCartItem = id => {
    const {cartList} = this.state
    const index = cartList.findIndex(each => {
      if (each.id === id) {
        return true
      }
      return false
    })
    cartList.splice(index, 1)
    this.setState({cartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const index = cartList.findIndex(each => {
      if (each.id === product.id) {
        return true
      }
      return false
    })
    if (index === -1) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      cartList[index].quantity += product.quantity
      this.setState({cartList})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const index = cartList.findIndex(each => {
      if (each.id === id) {
        return true
      }
      return false
    })
    cartList[index].quantity += 1
    this.setState({cartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const index = cartList.findIndex(each => {
      if (each.id === id) {
        return true
      }
      return false
    })
    cartList[index].quantity -= 1
    if (cartList[index].quantity === 0) {
      this.removeCartItem(id)
    } else {
      this.setState({cartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <div>
          <ScrollToTop />
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </div>
      </CartContext.Provider>
    )
  }
}

export default App
