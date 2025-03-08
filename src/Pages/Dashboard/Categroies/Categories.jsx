import {  useState } from "react";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
import { useCategories } from "../../../hooks/useCategories";
import { Cat } from "../../../Services/Api";


export default function Categories() {
    // States
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);


    const {paginatedCategories: cat , isPaginatedLoading: loading} = useCategories(page, limit);



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
                    page={page}
                    limit={limit}
                    loading={loading}
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
