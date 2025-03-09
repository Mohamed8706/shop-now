import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookie from "cookie-universal";
import TableLoading from "./../Loading/tableLoading";
import PaginatedItems from "./Pagination/Pagination";
import { useEffect, useState } from "react";
import TransformDate from "../../helpers/TransformDate";
import { baseUrl } from "../../Services/Api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


export default function TableShow(props) {
    const {
        data,
        header,
        limit,
        page,
        setLimit,
        setPage,
        loading,
        title,
        queryK
    } = props;
    const currentUser = props.currentUser || {
        name: "",
    };

    const queryClient = useQueryClient();   

    

    // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce");

    // State
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [searchedData, setSearchedData] = useState([]);
    
    // Pagination
    const start = (page - 1) * limit;
    const end = page * limit;
    const filterdByName = searchedData.slice(start, end).filter(
        (item) => (date ? TransformDate(item.created_at) === date : item)
    );
    const filterdByDate = data?.data?.filter(
        (item) => (date ? TransformDate(item.created_at) === date : item)
    );
    const filterdData = search.length > 0 ? filterdByName : filterdByDate;

    // Search Query
    const { refetch: refetchSearch } = useQuery({
        queryKey: ['search', title, search],
        queryFn: async () => {
            const res = await axios.post(
                `${baseUrl}/${title}/search`,
                { title: search },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSearchedData(res.data);
            return res.data;
        },
        enabled: false, // Manual trigger only
    });

// Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => axios.delete(`${baseUrl}/${title}/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
            },
            
        }),
        onSuccess: () => {
            queryClient.invalidateQueries([queryK]);
        },
    });

    // Handle Delete
    const handleDelete = (id) => {
            deleteMutation.mutate(id);
    };

    // Search Effect
    useEffect(() => {
        const debounce = setTimeout(() => {
            if (search.length > 0) {
                refetchSearch();
            }
        }, 600);

        return () => clearTimeout(debounce);
    }, [search, refetchSearch]);

    // Mapping over data 
    const headerShow = header.map((item, key) => <th key={key}>{item.name}</th>);
    const dataShow = filterdData?.map((item) => (
        <tr key={item.id}>
            <td>
                <div className="flex flex-row w-full h-full items-center justify-center">
                    {item.id}
                </div>
            </td>
            {header.map((item2) => (
                <td key={item2.value}>
                    <div className="flex flex-row h-full gap-2 items-center justify-center flex-wrap text-xl">

                        {item[item2.value] === "1995" ? (
                            "Admin"
                        ) : item[item2.value] === "2001" ? (
                            "User"
                        ) : item[item2.value] === "1999" ? (
                            "Product Manager"
                        ) : item2.value === "image" ? (
                            <img
                                className="object-contain w-12"
                                src={(`https://ecommerce-backend-production-5ad6.up.railway.app` + item[item2.value])}
                                alt="image"
                            />
                        ) : item2.value === "images" ? (
                            item[item2.value].map((i, idx) => (
                                <img key={idx} src={(`https://ecommerce-backend-production-5ad6.up.railway.app` + i.image)} 
                                alt="in" className="w-12" />
                            ))
                        ) : item2.value === "created_at" || item2.value === "updated_at" ? (
                            TransformDate(item[item2.value])
                        ) : (
                            <>
                                {item[item2.value]}
                                {currentUser &&
                                    item[item2.value] === props.currentUser.name &&
                                    " (You)"}
                            </>
                        )}
                    </div>
                </td>
            ))}
            <td key={`action-${item.id}`} style={{ textAlign: "center" }}>
                <div className="flex flex-row w-full h-full items-center justify-center">
                    {item.name !== currentUser.name && (
                        <FontAwesomeIcon
                            icon={faTrash}
                            style={{
                                marginRight: "8px",
                                color: "orangered",
                                cursor: "pointer",
                                width: "30px",
                                height: "30px",
                            }}
                            onClick={() => handleDelete(item.id)}
                            disabled={deleteMutation.isLoading}
                        />
                    )}
                    <Link to={`${item.id}`}>
                        <FontAwesomeIcon
                            icon={faEdit}
                            style={{ cursor: "pointer", width: "30px", height: "30px" }}
                        />
                    </Link>
                </div>
            </td>
        </tr>
    ));


    return (
        <>
            <div className="flex flex-row flex-wrap justify-between">
                <div className="col-3">
                    <FormControl
                        type="search"
                        className="my-2 shadow-sm"
                        aria-label="input example"
                        placeholder="search"
                        onChange={(e) => setSearch(e.target.value)}
                    ></FormControl>
                </div>

                <div className="col-3">
                    <FormControl
                        type="date"
                        className="my-2 shadow-sm"
                        aria-label="input example"
                        placeholder="search"
                        onChange={(e) => setDate(e.target.value)}
                    ></FormControl>
                </div>
            </div>
            <div className="rounded-[12px] overflow-x-auto ">
                <Table striped hover>
                    <thead className="f-cairo">
                        <tr>
                            <th>ID</th>
                            {headerShow}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading || deleteMutation.isLoading ? (
                            <tr>
                                <TableLoading />
                                <TableLoading />
                                {header.map((item, key) => (
                                    <TableLoading key={key} />
                                ))}
                            </tr>
                        ) : (
                            dataShow
                        )}
                    </tbody>
                </Table>
                <div className="flex w-full justify-end gap-3 flex-wrap items-center ">
                    <select
                        id="number-select"
                        value={limit}
                        onChange={(e) => setLimit(+e.target.value)}
                        className="border w- text-center py-2 rounded-lg"
                    >
                        <option value="" disabled>
                            --Choose a number
                        </option>
                        <option value={1}>1</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                    <PaginatedItems
                        searchedData={searchedData}
                        searchLength={search.length}
                        data={data}
                        limit={limit}
                        setPage={setPage}
                        page={page}
                    />
                </div>
            </div>
        </>
    );
}