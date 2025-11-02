"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { Product, ProductFormData,  } from "store/product/productTypes";
import { useParams } from "next/navigation";
import { useProductStore } from "store/product/useProductStore";
import { useDiscountStore } from "store/discount/useDiscountStore";



interface InputFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const EditProduct = () => {
  const [newTag, setNewTag] = useState('');
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { products, fetchProducts, updateProduct, isUpdatingProduct } = useProductStore();
  const { discounts, fetchDiscounts } = useDiscountStore();
  console.log(products)

  const [formData, setFormData] = useState<ProductFormData>({
    id: "",
    productName: "",
    priceInKobo: 0,
    description: "",
    stock: 0,
    images: [],
    category: "",
    tags: [],
    unitType: "piece",
    isVariableWeight: false,
    minOrderQuantity: 1,
    discountId: "", 
    displayLabel: "NONE",

  });


  const categories = [
    { name: "Meat & Poultry", slug: "meat-poultry" },
    { name: "Fish & Seafood", slug: "fish-seafood" },
    { name: "Dairy & Eggs", slug: "dairy-eggs" },
    { name: "Fresh Produce", slug: "fresh-produce" },
    { name: 'pantry & Sweeteners', slug: 'pantry-Sweeteners', },
    { name: "Animal Feeds & Supplements", slug: "animal-feeds-supplements" },
  ];



  // Fetch products once
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
  fetchDiscounts();
}, [fetchDiscounts]);

  // Find the product we want to edit
  useEffect(() => {
    if (!products || products.length === 0) return;
    const foundProduct = products.find((item) => item.id === id);
    setProduct(foundProduct || null);
  }, [products, id]);

  const parseDisplayLabel = (label?: string) =>
  ["NONE", "POPULAR", "DAILY_DEAL", "NEW_ARRIVAL", "FEATURED"].includes(label || "")
    ? (label as "NONE" | "POPULAR" | "DAILY_DEAL" | "NEW_ARRIVAL" | "FEATURED")
    : "NONE";


  // Set the formData when product is found
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        productName: product.productName,
        priceInKobo: product.priceInKobo,
        description: product.description,
        stock: product.stock,
        images: product.images.map((img) => ({
          id: img.id,
          url: img.url,
          index: img.index, 
        })),
        category: product.category,
        tags: product.tags,
        unitType: product.unitType || "piece",
        isVariableWeight: product.isVariableWeight ?? false,
        minOrderQuantity: product.minOrderQuantity ?? 1,
         discountId: product.discountId || "", // 
         displayLabel: parseDisplayLabel(product.displayLabel),

      });
    }
  }, [product]);



  // Input change handlers
  // const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "priceInKobo" || name === "stock" || name === "minOrderQuantity"
        ? parseFloat(value)
        : value,
    }));
  };


  // const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const tagsArray = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
  //   setFormData((prev) => ({ ...prev, tags: tagsArray }));
  // };

  // Image change for specific slot
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, indexToReplace: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setFormData((prev) => {
      const updated = prev.images.map((img) => {
        if (img.index === indexToReplace) {
          return {
            ...img,
            file,
            previewUrl,
          };
        }
        return img;
      });

      return { ...prev, images: updated };
    });
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== indexToRemove),
    }));
  };



  // Add new image
  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const newIndex = formData.images.length;

    setFormData((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        {
          index: newIndex,
          file,
          previewUrl,
        },
      ],
    }));
  };

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (!trimmed || formData.tags.includes(trimmed)) return;

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, trimmed],
    }));
    setNewTag('');
  };



  const handleChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };



  


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();

    form.append("id", formData.id);
    form.append("productName", formData.productName);
    form.append("priceInKobo", String(formData.priceInKobo));
    form.append("description", formData.description);
    form.append("stock", String(formData.stock));
    form.append("category", formData.category);
    form.append("unitType", formData.unitType);
    form.append("isVariableWeight", String(formData.isVariableWeight));
    form.append("minOrderQuantity", String(formData.minOrderQuantity));
    form.append("discountId", formData.discountId || "");
    form.append("displayLabel", formData.displayLabel || "NONE");





    formData.tags.forEach((tag, i) => {
      form.append(`tags[${i}]`, tag);
    });

    formData.images.forEach((img) => {
      if (img.file) {
        form.append("newImages", img.file);
        form.append("newImageIndexes", String(img.index));
        if (img.id) {
          form.append("replacingImageIds", img.id);
        }
      } else if (img.id) {
        // Preserving existing image
        form.append("existingImages[]", JSON.stringify({ id: img.id, index: img.index }));
      }
    });

    updateProduct(form);
  };

  if (!product) {
    return (
      <p className="text-center mt-10 text-lg font-semibold text-red-500">
        Product not found!
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Product Name" name="productName" value={formData.productName} onChange={handleChange} />
          <InputField label="Price" name="priceInKobo" value={formData.priceInKobo} type="number" onChange={handleChange} />
          <InputField label="Stock" name="stock" value={formData.stock} type="number" onChange={handleChange} />
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Discount
            </label>
            <select
              name="discountId"
              value={formData.discountId || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg border-gray-300"
            >
              <option value="">No Discount</option>
              {discounts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label} - {d.value}%
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Display Label
            </label>
            <select
              name="displayLabel"
              value={formData.displayLabel}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg border-gray-300"
            >
              <option value="NONE">None</option>
              <option value="NEW_ARRIVAL">New Arrival</option>
              <option value="FEATURED">Featured</option>
              <option value="POPULAR">Popular</option>
              <option value="DAILY_DEAL">Daily Deal</option>
            </select>
          </div>



          {/* Unit Type Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Unit Type</label>
            <select
              name="unitType"
              value={formData.unitType}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg border-gray-300"
            >
              <option value="piece">Piece</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="litre">Litre (L)</option>
              <option value="pack">Pack</option>
              <option value="dozen">Dozen</option>
              <option value="crate">Crate</option>
            </select>
          </div>

          {/* Is Variable Weight Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isVariableWeight"
              checked={formData.isVariableWeight}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isVariableWeight: e.target.checked }))
              }
            />
            <label htmlFor="isVariableWeight" className="text-sm">Is Variable Weight?</label>
          </div>

          {/* Min Order Quantity */}
          <InputField
            label="Min Order Quantity"
            name="minOrderQuantity"
            type="number"
            value={formData.minOrderQuantity}
            onChange={handleChange}
          />

          {/* <InputField label="Tags (comma-separated)" name="tags" value={formData.tags.join(", ")} onChange={handleTagsChange} /> */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center">
                  {tag}
                  <AiOutlineClose className="ml-2 text-red-500 cursor-pointer" onClick={() => handleRemoveTag(index)} />
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input 
                type="text" 
                value={newTag} // ← controlled via new state
                onChange={handleChangeTag}
                placeholder="Add a tag..." 
                className="border rounded-md p-2 text-sm flex-1"
              />

              <button
                type="button"
                onClick={handleAddTag}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              >
                <AiOutlinePlus />
              </button>

              
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg border-gray-300"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdatingProduct}
            className={`w-full py-2 px-6 ${
              isUpdatingProduct ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } text-white font-semibold rounded-lg`}
          >
            {isUpdatingProduct ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {/* Editable Images */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Edit Images (Max 5)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.images
            .slice() // make a copy to avoid mutating state
            .sort((a, b) => a.index - b.index) // ✅ sort by index
            .map((img, index) => (
              <div key={img.id ?? index} className="relative group">
                {img.previewUrl || img.url ? (
                  <Image
                    src={img.previewUrl ?? img.url!}
                    alt={`Product ${index + 1}`}
                    width={400}
                    height={128}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-100 border flex items-center justify-center text-gray-500">
                    No image
                  </div>
                )}
                <label className="absolute inset-0 bg-black/50 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-md cursor-pointer transition">
                  Change
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, img.index)}
                    className="absolute inset-0 opacity-0"
                  />
                </label>
              </div>
            ))}

            {formData.images.length < 5 && (
              <label className="relative flex items-center justify-center border border-dashed border-gray-400 rounded-lg h-32 cursor-pointer hover:bg-gray-100 transition">
                <span className="text-3xl text-gray-500 font-bold">+</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAddImage}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable input field
const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={Number.isNaN(value) ? "" : value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);



export default EditProduct;
