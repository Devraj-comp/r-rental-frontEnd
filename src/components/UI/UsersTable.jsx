import { useState, useEffect } from "react";

const UsersTable = () => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [originalOrders, setOriginalOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10); // Number of orders per page
    const [userData, setUserData] = useState([]);
    // Fetch data on component mount
    useEffect(() => {
        const fetchOrders = async () => {
            const fetchDetailUrl =
                role === "admin"
                    ? "http://localhost:8000/user/list-user/"
                    : "http://localhost:8000/user/current/";

            try {
                const response = await fetch(fetchDetailUrl, {
                    method: "GET",
                    headers: {
                        Authorization: `JWT ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                const processedData = data.map((item) => ({
                    id: item.id,
                    username: item.username || null,
                    email: item.email || null,
                    role: item.role || null,
                }));
                setOriginalOrders(processedData);
                setFilteredOrders(processedData);
                console.log("users table data: ", processedData)
            } catch (error) {
                console.error("Error fetching bookings: ", error);
            }
        };

        fetchOrders();
    }, [role, token]); // Re-run fetch if role or token changes

    // Update order status
    // const handleUpdateOrderStatus = async (orderId, newStatus) => {
    //     try {
    //         const response = await fetch(
    //             `http://localhost:8000/api/bookings/${orderId}/update/`,
    //             {
    //                 method: "PATCH",
    //                 headers: {
    //                     Authorization: `JWT ${token}`,
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({ status: newStatus }),
    //             }
    //         );

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }

    //         const updatedOrder = await response.json();

    //         // Update the order status in the local state
    //         setFilteredOrders((prevOrders) =>
    //             prevOrders.map((order) =>
    //                 order.id === updatedOrder.id
    //                     ? { ...order, status: updatedOrder.status }
    //                     : order
    //             )
    //         );

    //         alert(`Order ${orderId} updated to ${newStatus}`);
    //     } catch (error) {
    //         console.error("Error updating order status: ", error);
    //     }
    // };

    // Search functionality
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        if (term === "") {
            setFilteredOrders(originalOrders);
        } else {
            const filtered = originalOrders.filter(
                (order) =>
                    String(order.id).toLowerCase().includes(term) ||
                    order.username.toLowerCase().includes(term)
            );
            setFilteredOrders(filtered);
        }
    };

    // Calculate the orders to display based on current page
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(
        indexOfFirstOrder,
        indexOfLastOrder
    );

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get the total number of pages
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-400">
                    User List
                </h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                User ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Username
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide divide-gray-700">
                        {currentOrders.map((order) => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                                    {order.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                                    {order.username}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                                    {order.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            order.role === "admin"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {order.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <button
                                        className="text-indigo-400 hover:text-indigo-300"
                                    >
                                        Update Status
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                >
                    Previous
                </button>

                <div className="flex items-center space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 ${
                                currentPage === index + 1
                                    ? "bg-blue-500"
                                    : "bg-gray-700"
                            } text-white rounded-md hover:bg-gray-600`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default UsersTable;
