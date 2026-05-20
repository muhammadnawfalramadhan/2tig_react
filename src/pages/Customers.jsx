import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import CustomerForm from '../components/CustomerForm';
// Impor file JSON yang baru saja kita isi
import data from '../data/data.json'; 

export default function Customers() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Ambil array dari key "customers" di dalam data.json
    const [customers, setCustomers] = useState(data.customers);

    const handleAddCustomer = (newData) => {
        // Logika sederhana untuk menambah data baru di posisi paling atas
        setCustomers([newData, ...customers]);
        setIsModalOpen(false); // Tutup modal setelah submit
    };

    return (
        <div className="p-6">
            <PageHeader 
                title="Customers" 
                breadcrumb={['Dashboard', 'Customers']}
            >
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                    + Add Customer
                </button>
            </PageHeader>

            {/* TABEL CUSTOMERS */}
            <div className="mt-6 overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-700">Customer ID</th>
                            <th className="p-4 font-semibold text-gray-700">Customer Name</th>
                            <th className="p-4 font-semibold text-gray-700">Email</th>
                            <th className="p-4 font-semibold text-gray-700">Phone</th>
                            <th className="p-4 font-semibold text-gray-700">Loyalty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((item) => (
                            <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                {/* Perhatikan akses properti menggunakan item.details.xxx */}
                                <td className="p-4 font-medium text-blue-600">{item.details.customerId}</td>
                                <td className="p-4">{item.details.customerName}</td>
                                <td className="p-4">{item.details.email}</td>
                                <td className="p-4">{item.details.phone}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                        ${item.details.loyalty === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 
                                          item.details.loyalty === 'Silver' ? 'bg-gray-200 text-gray-700' : 
                                          'bg-orange-100 text-orange-800'}`}>
                                        {item.details.loyalty}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <CustomerForm 
                    onClose={() => setIsModalOpen(false)} 
                    onSubmit={handleAddCustomer} 
                />
            )}
        </div>
    );
}