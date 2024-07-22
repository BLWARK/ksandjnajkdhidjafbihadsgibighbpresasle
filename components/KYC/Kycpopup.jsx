"use client"
import React, { useState } from "react";

const KYCForm = ({ onClose, onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    address: '',
    telegramid: '',
    idType: 'ID Card',
    idCard: null,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setFormData({ ...formData, idCard: file });
      setPreview(URL.createObjectURL(file));
    } else {
      alert('Please upload a JPG or PNG image.');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.idNumber) newErrors.idNumber = "ID Number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.telegramid) newErrors.telegramid = "Telegram ID is required";
    if (!formData.idCard) newErrors.idCard = `${formData.idType} image is required`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-75 z-50 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg text-left 2xl:max-w-lg max-w-sm w-full h-[700px] mx-2 mt-10 overflow-y-scroll">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">KYC Form</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">&times;</button>
        </div>
        <p className="text-red-500 mb-4 text-[13px] italic">You need to complete the KYC process to use Option 2.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              className="mt-1 p-2 w-full border rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              className="mt-1 p-2 w-full border rounded"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Telegram ID</label>
            <input
              type="text"
              name="telegramid"
              className="mt-1 p-2 w-full border rounded"
              value={formData.telegramid}
              onChange={handleChange}
              required
            />
            {errors.telegramid && <span className="text-red-500 text-sm">{errors.telegramid}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">ID Number</label>
            <input
              type="text"
              name="idNumber"
              className="mt-1 p-2 w-full border rounded"
              value={formData.idNumber}
              onChange={handleChange}
              required
            />
            {errors.idNumber && <span className="text-red-500 text-sm">{errors.idNumber}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Select ID Type</label>
            <select
              name="idType"
              className="mt-1 p-2 w-full border rounded"
              value={formData.idType}
              onChange={handleChange}
              required
            >
              <option value="ID Card">ID Card</option>
              <option value="Driving License">Driving License</option>
              <option value="Passport ID">Passport ID</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload {formData.idType} (JPG or PNG)</label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              className="mt-1 p-2 w-full border rounded"
              onChange={handleFileChange}
              required
            />
            {errors.idCard && <span className="text-red-500 text-sm">{errors.idCard}</span>}
            {preview && (
              <div className="mt-4">
                <img src={preview} alt="ID Card Preview" className="w-full h-auto rounded" />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-full"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KYCForm;
