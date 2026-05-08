import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import About from './components/About/About';
import NotFound from './components/NotFound/NotFound';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import ProductDetails from './components/ProductDetails/ProductDetails';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { UserContextProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { CartContextProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'about', element: <ProtectedRoute><About /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'products/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
      ],
    },
    { path: '*', element: <NotFound /> },
  ]);

  return (
    <CartContextProvider>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <RouterProvider router={router} />
          <Toaster/>
          <ReactQueryDevtools initialIsOpen={false} />
        </UserContextProvider>
      </QueryClientProvider>
    </CartContextProvider>
  );
}

export default App;