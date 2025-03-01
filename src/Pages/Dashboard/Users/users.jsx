import { useEffect } from "react";
import { useState } from "react";
import { baseUrl, USER, USERS } from "../../../Services/Api";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";
import TableShow from "../../../Components/Dashboard/Table";
import useSWR from "swr";

export default function Users() {
    // States
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(1);
    const [loading, setLoading] = useState(false);

    // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce");

    // Get Current User
    useEffect(() => {
        axios
        .get(`${baseUrl}/${USER}`, {
            headers: {
            Authorization: "Bearer " + token,
            },
        })
        .then((res) => setCurrentUser(res.data));
    }, []);

    // Fetcher function for SWR
    const fetchUsers = async (url) => {
        setLoading(true);
        const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(data);
        setLoading(false);

        return data;
    };

    // Use SWR with dynamic key
    const { mutate } = useSWR(
        `${baseUrl}/${USERS}?limit=${limit}&page=${page}`,
        fetchUsers,
        {
        revalidateOnFocus: false,
        }
    );

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
            mutate={mutate}
            title={USER}
            currentUser={currentUser}
            page={page}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
            loading={loading}
            setLoading={setLoading}

        
            />
        </div>
        </div>
    );
}
