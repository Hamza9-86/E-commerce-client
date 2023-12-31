import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "./redux/categorySlice";
import Collection from "./pages/collection/Collection";
import Payments from "./components/payments/Payments";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId?" element={<Collection />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/payments/:status" element={<Payments />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
