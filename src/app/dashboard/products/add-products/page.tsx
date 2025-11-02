"use client";

import React, { useState, useEffect, ChangeEvent, DragEvent } from "react";
import { AiOutlinePlus, AiOutlineClose, AiOutlineUpload, AiOutlineMinus } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { useProductStore, } from "store/product/useProductStore";
import { useDiscountStore } from "store/discount/useDiscountStore";
import { ProductState } from "store/product/productTypes";
import Image from "next/image";

// Type for uploaded image
type UploadedImage = {
  url: string;
  file: File;
};

type FormData = {
  id?: string;
  priceInKobo: string;
  productName: string;
  description: string;
  category: string;
  subCategory: string;
  selectedImages: UploadedImage[];
  stock: number;
  unitType: string;
  isVariableWeight: boolean;
  minOrderQuantity?: number;
  displayLabel?: "NONE" | "POPULAR" | "DAILY_DEAL" | "NEW_ARRIVAL" | "FEATURED";
  discountId?: string; // ✅ add this
};





const ProductsForm: React.FC = () => {
  const [tags, setTags] = useState<string[]>(["Meat", "Organic", "Fresh"]);
  const [newTag, setNewTag] = useState<string>("");
  const [stock, setStock] = useState<number>(1);
  const [selectedImages, setSelectedImages] = useState<UploadedImage[]>([]);
  const createProduct = useProductStore((state: ProductState) => state.createProduct);
  const isLoading = useProductStore((state: ProductState) => state.isLoading)
  const fetchDiscounts = useDiscountStore((state)=>state.fetchDiscounts)
  const discounts = useDiscountStore((state) => state.discounts); // ✅ get the discounts array

  useEffect(() => {
      fetchDiscounts(); // ✅ load discounts when page mounts
    }, [fetchDiscounts]);
    


  const categories = [
    { name: "Meat & Poultry", slug: "meat-poultry" },
    { name: "Fish & Seafood", slug: "fish-seafood" },
    { name: "Dairy & Eggs", slug: "dairy-eggs" },
    { name: "Fresh Produce", slug: "fresh-produce" },
    { name: "Animal Feeds & Supplements", slug: "animal-feeds-supplements" },
    { name: 'pantry & Sweeteners', slug: 'pantry-Sweeteners', },
  ];


const [formData, setFormData] = useState<FormData>({
  productName: "",
  description: "",
  category: "",
  subCategory: "",
  priceInKobo: "",
  selectedImages: [],
  stock: stock,
  unitType: "piece",
  isVariableWeight: false,
  minOrderQuantity: undefined,
  discountId: "",
  displayLabel: "NONE", // 👈 Added default
});





  // const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = event.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };



  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files).slice(0, 3);

    const imageUrls: UploadedImage[] = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setSelectedImages((prev) => [...prev, ...imageUrls].slice(0, 3));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).slice(0, 3);

    const imageUrls: UploadedImage[] = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setSelectedImages(imageUrls);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const formattedImages = selectedImages.map((img, index) => ({
      ...img,
      index, // Add index here
    }));
    createProduct({
      productName: formData.productName,
      description: formData.description,
      category: formData.category,
      subCategory: formData.subCategory,
      stock: stock,
      priceInKobo: Number(formData.priceInKobo),
      unitType: formData.unitType,
      isVariableWeight: formData.isVariableWeight,
      minOrderQuantity: formData.minOrderQuantity,
      tags,
      images: formattedImages,
      discountId: formData.discountId || null,
      displayLabel: formData.displayLabel,
    });

    console.log("Product submitted");
  };
  
  

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BsBoxSeam className="text-blue-600" /> Add New Product
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Form Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name *</label>
              <input 
              type="text" placeholder="Enter product name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full border rounded-md p-2 text-sm" />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Description *</label>
              <textarea 
              placeholder="Enter product description" 
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-md p-2 text-sm h-24" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >

                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>


            <div className="grid grid-cols-2 gap-10">
              <div>
                <label className="block text-sm font-medium mb-1">Price In Naira *</label>
                <input 
                type="text"
                placeholder="Enter price in naira"
                name="priceInKobo"
                value={formData.priceInKobo}
                onChange={handleChange}
                className="w-full border rounded-md p-2 text-sm" />
              </div>

              {/* Stock Management */}
              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <div className="flex items-center space-x-3">
                  <button 
                    className="bg-gray-300 text-gray-700 p-2 rounded-full"
                    onClick={() => setStock(stock > 0 ? stock - 1 : 0)}
                  >
                    <AiOutlineMinus />
                  </button>
                  <input 
                    type="number" 
                    value={stock} 
                    onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                    className="w-20 text-center border rounded-md p-2 text-sm"
                  />
                  <button 
                    className="bg-gray-300 text-gray-700 p-2 rounded-full"
                    onClick={() => setStock(stock + 1)}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>

              {/* Unit Type Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-1">Unit Type *</label>
                <select
                  name="unitType"
                  value={formData.unitType}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-sm"
                >
                  <option value="piece">Piece</option>
                  <option value="kg">Kilogram (kg)</option>
                  <option value="litre">Litre (L)</option>
                  <option value="pack">Pack</option>
                  <option value="dozen">Dozen</option>
                  <option value="crate">Crate</option>
                </select>
              </div>

              {/* Is Variable Weight */}
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  name="isVariableWeight"
                  checked={formData.isVariableWeight}
                  onChange={handleChange}
                  id="isVariableWeight"
                />
                <label htmlFor="isVariableWeight" className="text-sm font-medium">Allow Variable Weight (e.g., 1.2kg)</label>
              </div>

              {/* Min Order Quantity (only if variable) */}
              {formData.isVariableWeight && (
                <div className="mt-2">
                  <label className="block text-sm font-medium mb-1">Min Order Quantity</label>
                  <input
                    type="number"
                    step="0.01"
                    name="minOrderQuantity"
                    value={formData.minOrderQuantity || ""}
                    onChange={handleChange}
                    placeholder="e.g. 0.5"
                    className="w-full border rounded-md p-2 text-sm"
                  />
                </div>
              )}

            </div>
            

            <div className="border-t pt-4 mt-4">
              <label className="block text-sm font-medium mb-1">Select Discount</label>
              <select
                name="discountId"
                value={formData.discountId || ""}
                onChange={handleChange}
                className="w-full border rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">No Discount</option>
                {discounts?.map((discount) => (
                  <option key={discount.id} value={discount.id}>
                    {discount.label} —{" "}
                    {discount.type === "PERCENTAGE"
                      ? `${discount.value}%`
                      : `₦${discount.value.toLocaleString("en-NG")}`}
                  </option>
                ))}
              </select>
            </div>



            {/* Display Label */}
            <div className="mt-4 border-t pt-4">
              <label className="block text-sm font-medium mb-1">Display Label</label>
              <select
                name="displayLabel"
                value={formData.displayLabel}
                onChange={handleChange}
                className="w-full border rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="NONE">None</option>
                <option value="DAILY_DEAL">Daily Deal</option>
                <option value="FEATURED">Featured</option>
                <option value="POPULAR">Popular</option>
                <option value="NEW_ARRIVAL">New Arrival</option>
              </select>
            </div>



            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-1">Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span key={index} className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center">
                    {tag}
                    <AiOutlineClose className="ml-2 text-red-500 cursor-pointer" onClick={() => handleRemoveTag(index)} />
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input 
                  type="text" 
                  value={newTag} 
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..." 
                  className="border rounded-md p-2 text-sm flex-1"
                />
                <button onClick={handleAddTag} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                  <AiOutlinePlus />
                </button>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-6">
            <div 
              className="border rounded-lg p-4 text-center cursor-pointer relative"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="fileUpload"
                multiple
                onChange={handleImageUpload} 
              />
              <label htmlFor="fileUpload" className="block cursor-pointer">
                <AiOutlineUpload className="text-4xl text-gray-400 mx-auto" />
                <p className="mt-2 text-sm">Click or drag up to 3 images</p>
              </label>

              {/* Image Preview Grid */}
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <div className="relative w-full h-24 rounded-lg overflow-hidden">
                        <Image
                          src={image.url}
                          alt={`Uploaded image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 200px"
                        />
                      </div>

                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-green-600 text-white px-6 py-3 rounded-md flex items-center gap-2 text-lg font-medium"
        >
          {isLoading ? 'Saving...' : 'Save Product'}
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsForm;
