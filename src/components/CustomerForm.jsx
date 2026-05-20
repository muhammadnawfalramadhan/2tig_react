import React, { useState } from 'react';

export default function CustomerForm({ onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        customer_id: '',
        customer_name: '',
        email: '',
        phone: '',
        loyalty: 'Bronze'
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
                <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Customer ID</label>
                        <input type="text" name="customer_id" onChange={handleChange} required className="w-full border rounded p-2" placeholder="e.g. C031" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Customer Name</label>
                        <input type="text" name="customer_name" onChange={handleChange} required className="w-full border rounded p-2" placeholder="Full Name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" name="email" onChange={handleChange} required className="w-full border rounded p-2" placeholder="email@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input type="text" name="phone" onChange={handleChange} required className="w-full border rounded p-2" placeholder="0812..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Loyalty</label>
                        <select name="loyalty" onChange={handleChange} className="w-full border rounded p-2">
                            <option value="Bronze">Bronze</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save Customer</button>
                    </div>
                </form>
            </div>
        </div>
    );
}