// File: src/pages/OrdersPage.jsx
import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import OrderForm from "../components/OrderForm";
// Impor dari data.json yang telah kita isi tadi
import data from "../data/data.json"; 

export default function Orders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Ambil array dari key "orders" di dalam data.json
  const [orders, setOrders] = useState(data.orders);

  const handleAddOrder = (newData) => {
    // Menambahkan data baru ke urutan paling atas
    setOrders([newData, ...orders]);
    setIsModalOpen(false); // Tutup modal setelah submit
  };

  return (
    <div className="p-6">
      <PageHeader title="Order List" breadcrumb={["Dashboard", "Orders"]}>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Add Orders
        </button>
      </PageHeader>

      {/* Bagian Tabel */}
      <div className="mt-6 overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Order ID</th>
              <th className="p-4 font-semibold text-gray-700">Customer Name</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700">Total Price</th>
              <th className="p-4 font-semibold text-gray-700">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                {/* Akses menggunakan item.details.xxx */}
                <td className="p-4 font-medium text-blue-600">
                  {item.details.orderId}
                </td>
                <td className="p-4">{item.details.customerName}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium 
            ${
              item.details.status === "Completed"
                ? "bg-green-100 text-green-700"
                : item.details.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
                  >
                    {item.details.status}
                  </span>
                </td>
                <td className="p-4">
                  Rp{" "}
                  {item.details.totalPrice
                    ? Number(item.details.totalPrice).toLocaleString("id-ID")
                    : "0"}
                </td>
                <td className="p-4 text-gray-500">{item.details.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <OrderForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddOrder}
        />
      )}
    </div>
  );
}