import { useState } from "react";
import {  Product } from "../../../Services/Api";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
import { useProducts } from "../../../hooks/useProducts";
import LoadingSubmit from './../../../Components/Loading/loading';


export default function ProductsPage() {
  // States
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const {paginatedProducts: products, isPaginatedLoading: loading} = useProducts(page, limit);

  // Passing Headers
  const header = [
    {
      value: "title",
      name: "Title",
    },
    {
      value: "description",
      name: "Description",
    },
    {
      value: "price",
      name: "Price",
    },
    {
      value: "images",
      name: "Images",
    },
    {
      value: "rating",
      name: "Rating"
    },
      {
      value: "stock",
      name: "Stock"
    },
    {
        value: "created_at",
        name: "Created"
    },
    {
        value: "updated_at",
        name: "Updated"
    }
  ];

  return (
    <div
      className="bg-white p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products Page</h1>
        <Link
          className="btn btn-primary"
          to="/dashboard/product/add"
          style={{ color: "black" }}
        >
          Add Product
        </Link>
      </div>
      <TableShow
        header={header}
        data={products}
        title={Product}
        deleteIcon={true}
        currentUser=""
        page={page} 
        limit={limit} 
        setPage={setPage} 
        setLimit={setLimit} 
        loading={loading}
      />
    </div>
  );
}
