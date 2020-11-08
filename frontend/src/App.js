import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/shared/HomeScreen'
import ProductScreen from './screens/product/ProductScreen'
import Header from './components/Header'
import Footer from './components/Footer'
import CartScreen from './screens/cart/CartScreen'
import LoginScreen from './screens/user/LoginScreen'
import RegisterScreen from './screens/user/RegisterScreen'
import ProfileScreen from './screens/user/ProfileScreen'
import userListScreen from './screens//user/UserListScreen'
import UserEditScreen from './screens/user/UserEditScreen'
import ProductListScreen from './screens/product/ProductListScreen'
import ProductEditScreen from './screens/product/ProductEditScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/admin/userlist" component={userListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/productlist" component={ProductListScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
