import React, { useEffect, useState } from "react";
import "./Collection.scss";
import Products from "../../components/products/Products";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";

function Collection() {
  const sortOptions = [
    {
      sort: "price",
      value: "Price ~ Low to High",
    },
    {
      sort: "createdAt",
      value: "Newest First",
    },
  ];

  const navigate = useNavigate();
  const params = useParams();
  const categories = useSelector((state) => state.categoryReducer?.categories);
  const [categoryId, setCategoryId] = useState("");
  const [product, setProduct] = useState([]);
  const [sortBy, setSortBy] = useState(sortOptions[0].sort);

  async function fetchProduct() {
    const url = params.categoryId
      ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
      : `/products?populate=image&sort=${sortBy}`;

    const response = await axiosClient.get(url);
    setProduct(response.data.data);
  }

  function handleSort(e) {
    const sortKey = e.target.value;
    setSortBy(sortKey);
  }

  useEffect(() => {
    setCategoryId(params.categoryId);
    //api call
    fetchProduct();
  }, [params, sortBy]);

  function updateChange(e) {
    navigate(`/category/${e.target.value}`); //comics/tv-shows and sports milega
  }
  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore All Art & PrintWork</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sunt
              illo officiis totam facilis expedita laudantium nesciunt enim nisi
              eum!
            </p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <h3 className="sort-by-text">Sort By</h3>
              <select
                className="select-sort-by"
                name="sort-by"
                id="sort-by"
                onChange={handleSort}
              >
                {sortOptions?.map((item) => (
                  <option value={item.sort}>{item.value}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Categories</h3>
              {categories.map((item) => [
                <div key={item.id} className="filter-radio">
                  <input
                    name="category"
                    type="radio"
                    id={item.id}
                    value={item.attributes.key}
                    onChange={updateChange}
                    checked={item.attributes.key === categoryId}
                  />
                  <label htmlFor={item.id}>{item.attributes.title}</label>
                </div>,
              ])}
              {/* 
              <div className="filter-radio">
                <input name="category" type="radio" id="tv-shows" />
                <label htmlFor="tv-shows">TV Shows</label>
              </div>
              <div className="filter-radio">
                <input name="category" type="radio" id="sports" />
                <label htmlFor="sports">Sports</label>
              </div> */}
            </div>
          </div>
          <div className="product-box">
            {product?.map((product) => (
              <Products key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
