import { useState } from "react";
import { baseUrl, Product, Products } from "../../../Services/Api";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";
import TableShow from "../../../Components/Dashboard/Table";
import useSWR from "swr";


export default function ProductsPage() {
  // States
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);

  // Cookies
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  // Fetcher function for SWR
  const fetchProducts = async (url) => {
    setLoading(true);
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(data); 
    setLoading(false);
    return data;
  };

  // Use SWR with dynamic key
  const { mutate } = useSWR(
    `${baseUrl}/${Products}?limit=${limit}&page=${page}`,
    fetchProducts,
    {
      revalidateOnFocus: false, 
    }
  );

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
        mutate={mutate}
        data={products}
        title={Product}
        deleteIcon={true}
        currentUser=""
        page={page} 
        limit={limit} 
        setPage={setPage} 
        setLimit={setLimit} 
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}
