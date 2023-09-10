import React, { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import Category from "../../components/category/Category";
import './Home.scss'
import Products from '../../components/products/Products'
import { axiosClient } from "../../utils/axiosClient";

function Home() {
  const [categories , setCategories] = useState(null);
  const [topProducts , setTopProducts] = useState(null);

  async function fetchData(){
    const categoryResponse = await axiosClient.get('/categories?populate=image');
    const productRepsonse = await axiosClient.get('/products?filters[isTopPick][$eq]=true&populate=image');
    setCategories(categoryResponse.data.data);
    setTopProducts(productRepsonse.data.data);
  }
  useEffect(() => {
    fetchData();
  },[])
  return (
    <div className="Home">
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Shop By Categories</h2>
          <p className="subheading">
            Shop from the best , our Film and TV poster collection
          </p>
        </div>
        <div className="content">
         {categories?.map(category => <Category key={category.id} category={category}/>)}
        </div>
      </section>

      <section className="collection container">
        <div className="info">
          <h2 className="heading">Our Top Picks</h2>
          <p className="subheading">
            All New Design , Same Old Details!
          </p>
        </div>
        <div className="content">
        {topProducts?.map(product => <Products key={product.id} product={product}/>)}
        </div>
      </section>
    </div>
  );
}

export default Home;
