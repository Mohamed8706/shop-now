import { useState } from "react";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
import { useAuth } from "../../../hooks/useAuth";
import { USER } from "../../../services/api";

export default function Users() {
    // States
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(1);

    // Enable user fetching only when this component is loaded
    const { users, isFetchingUsers: loading } = useAuth(page,limit);

    const {user: currentUser} = useAuth();
    console.log(users)
    // Passing Headers
    const header = [
        {
        value: "name",
        name: "Username",
        },
        {
        value: "email",
        name: "Email",
        },
        {
        value: "role",
        name: "Role",
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
        <div className="flex justify-center w-full">
        <div className="bg-white rounded p-3 shadow w-[100%]">
            <div className="d-flex align-items-center justify-content-between">
            <h1>Users Page</h1>
            <Link
                className="btn btn-primary"
                to="/dashboard/user/add"
                style={{ color: "black" }}
            >
                Add User
            </Link>
            </div>
            <TableShow
            header={header}
            data={users}
            title={USER}
            currentUser={currentUser}
            page={page}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
            loading={loading}
            />
        </div>
        </div>
    );
}
