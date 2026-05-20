import React, { useState } from 'react';

export default function OrderForm({ onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        order_id: '',
        customer_name: '',
        status: 'Pending',
        total_price: '',
        order_date: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose(); // Tutup modal setelah submit
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Add New Order</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Order ID</label>
                        <input type="text" name="order_id" onChange={handleChange} required className="w-full border rounded p-2" placeholder="e.g. ORD031" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Customer Name</label>
                        <input type="text" name="customer_name" onChange={handleChange} required className="w-full border rounded p-2" placeholder="Customer Name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select name="status" onChange={handleChange} className="w-full border rounded p-2">
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Total Price (Rp)</label>
                        <input type="number" name="total_price" onChange={handleChange} required className="w-full border rounded p-2" placeholder="250000" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Order Date</label>
                        <input type="date" name="order_date" onChange={handleChange} required className="w-full border rounded p-2" />
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Save Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
}