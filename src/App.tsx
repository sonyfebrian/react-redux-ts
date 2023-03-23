import './App.css';
import { Routes, Route } from "react-router-dom";
import { LoginPage, Category, Home, Product, ProductLists} from './App/pages';
import CategoryForm from './App/pages/Category/CategoryForm';
import ProductForm from './App/pages/Product/ProductForm'
import ProductsForm from './App/pages/ProductList/ProductListForm';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div >
     
     <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/addCategory" element={<CategoryForm/>} />
        <Route
            path="/edit/:id"
            element={<CategoryForm isEditForm={true} />}
          ></Route>
          <Route path="/product" element={<Product />} />
        <Route path="/addProduct" element={<ProductForm/>} />
        <Route
            path="/editProduct/:id"
            element={<ProductForm isEditProduct={true} />}
          ></Route>
           <Route path="/products" element={<ProductLists />} />
        <Route path="/addProducts" element={<ProductsForm/>} />
        <Route
            path="/editProducts/:id"
            element={<ProductsForm isEditProducts={true} />}
          ></Route>
        {/* <Route path="productCategory" element={<ProductCategorys />} /> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
