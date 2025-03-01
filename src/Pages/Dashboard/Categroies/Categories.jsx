import {  useState } from "react";
import { baseUrl, Cat, CAT } from "../../../Services/Api";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";
import TableShow from "../../../Components/Dashboard/Table";
import useSWR from "swr";


export default function Categories() {
    // States
    const [cat, setCat] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [loading, setLoading] = useState(false);
    // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce");

    
    const fetchCategories = async (url) => {
        setLoading(true);
        const { data } = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setCat(data);
        setLoading(false);
        return data;
    };

    
    const { mutate } = useSWR(
        `${baseUrl}/${CAT}?limit=${limit}&page=${page}`,
        fetchCategories,
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
            value: "image",
            name: "Image",
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
        <div className="flex justify-center flex-col w-full" id="container">
            <div className="bg-white rounded p-3 shadow w-[100%] ">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <h1>Categories Page</h1>
                    <Link
                        className="btn btn-primary"
                        to="/dashboard/category/add"
                        style={{ color: "black" }}
                    >
                        Add Category
                    </Link>
                </div>

                <TableShow
                    header={header}
                    mutate={mutate}
                    page={page}
                    limit={limit}
                    loading={loading}
                    setLoading={setLoading}
                    data={cat}
                    deleteIcon={true}
                    currentUser=""
                    setPage={setPage}
                    setLimit={setLimit}
                    title={Cat}
                />
            </div>
        </div>
    );
}
