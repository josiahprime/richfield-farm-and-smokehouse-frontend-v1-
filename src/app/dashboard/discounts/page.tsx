'use client'

import { useEffect, useMemo, useState } from "react";
import { BadgePercent, BadgeCheck, Edit, Plus, Trash2, X } from "lucide-react";
import { format } from "date-fns";
import { useDiscountStore } from "store/discount/useDiscountStore";
import toast from "react-hot-toast";

// Types
export type DiscountType = "PERCENTAGE" | "FIXED";

export interface Discount {
  id: string;
  type: DiscountType;
  value: number;
  label: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

// Dummy data (frontend-only)
const dummyDiscounts: Discount[] = [
  {
    id: "1",
    label: "Christmas Promo",
    type: "PERCENTAGE",
    value: 15,
    isActive: true,
    startDate: "2025-12-01",
    endDate: "2025-12-31",
  },
  {
    id: "2",
    label: "New Year Sale",
    type: "FIXED",
    value: 5000,
    isActive: false,
    startDate: "2025-12-31",
    endDate: "2026-01-05",
  },
];

export default function Index() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Discount | null>(null);
  const { discounts, loadDummyDiscounts, updateDiscount, deleteDiscount, addDiscount, fetchDiscounts, loading } = useDiscountStore();
  const [form, setForm] = useState<{
    label: string;
    type: DiscountType;
    value: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
  }>({
    label: "",
    type: "PERCENTAGE",
    value: 0,
    startDate: "",
    endDate: "",
    isActive: true,
  });

//   useEffect(() => {
//     setDiscounts(dummyDiscounts);
//   }, []);

    useEffect(() => {
    // 👉 Use dummy data for local testing
    // loadDummyDiscounts();

    // When backend is ready, just swap to:
    fetchDiscounts();
    }, []);

  const resetForm = () => {
    setForm({ label: "", type: "PERCENTAGE", value: 0, startDate: "", endDate: "", isActive: true });
  };

  // const formatValue = (d: Discount) =>
  //   d.type === "PERCENTAGE" ? `${d.value}%` : `₦${d.value.toLocaleString("en-NG")}`;
  const formatValue = (d: Discount) => {
    if (d.type === "PERCENTAGE") {
      return `${d.value ?? 0}%`;
    }

    const safeValue = typeof d.value === "number" ? d.value : Number(d.value) || 0;
    return `₦${safeValue.toLocaleString("en-NG")}`;
  };


  const openCreate = () => {
    setEditing(null);
    resetForm();
    setOpen(true);
  };

  const openEdit = (d: Discount) => {
    setEditing(d);
    setForm({
      label: d.label,
      type: d.type,
      value: d.value,
      startDate: d.startDate || "",
      endDate: d.endDate || "",
      isActive: d.isActive,
    });
    setOpen(true);
  };

  const save = () => {
    if (!form.label.trim()) {
        toast.error("Please enter a label");
        return;
    }
    if (form.value <= 0 || Number.isNaN(form.value)) {
        toast.error("Please enter a valid value");
        return;
    }

    if (editing) {
        updateDiscount(editing.id, form);
        toast.success("Discount updated");
    } else {
        addDiscount(form);
        toast.success("Discount created");
    }

    setOpen(false);
    setEditing(null);
    };

//   const save = () => {
//     if (!form.label.trim()) {
//       toast.error("Please enter a label");
//       return;
//     }
//     if (form.value <= 0 || Number.isNaN(form.value)) {
//       toast.error("Please enter a valid value");
//       return;
//     }

//     if (editing) {
//       setDiscounts((prev) => prev.map((d) => (d.id === editing.id ? { ...editing, ...form } : d)));
//       toast.success("Discount updated");
//     } else {
//       setDiscounts((prev) => [...prev, { ...form, id: Date.now().toString() }]);
//       toast.success("Discount created");
//     }
//     setOpen(false);
//     setEditing(null);
//   };

  const remove = (id: string) => {
    if (!confirm("Are you sure you want to delete this discount?")) return;
    deleteDiscount(id);
    toast.success("Discount deleted");
    };


  const activeCount = useMemo(() => discounts.filter((d) => d.isActive).length, [discounts]);

  return (
    <div className="space-y-8">
      {/* Hero / Header */}
      <section className="rounded-2xl bg-gradient-to-br from-violet-50 via-violet-100 to-gray-50 p-6 md:p-8 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600 shadow-sm">
              <BadgePercent className="w-4 h-4" />
              Promotions Suite
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Discount Management</h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-prose">
              Create, edit, and manage store-wide or campaign discounts with full control over types,
              validity, and active status.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-md bg-violet-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-violet-700"
            >
              <Plus className="w-4 h-4" />
              Create Discount
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500 font-medium">Total Discounts</div>
            <div className="text-2xl font-semibold mt-2 text-gray-900">{discounts.length}</div>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500 font-medium">Active Now</div>
            <div className="text-2xl font-semibold mt-2 text-gray-900">{activeCount}</div>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500 font-medium">Upcoming & Scheduled</div>
            <div className="text-2xl font-semibold mt-2 text-gray-900">{discounts.filter((d) => d.startDate && new Date(d.startDate) > new Date()).length}</div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="rounded-xl shadow bg-white">
        <div className="p-4 md:p-6 border-b border-b-gray-200 flex items-center justify-between">
          <h2 className="font-semibold tracking-tight">All Discounts</h2>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm bg-white hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
            New Discount
          </button>
        </div>
        <div className="p-2 md:p-6">
          <div className="relative w-full overflow-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-b-gray-200">
                <tr>
                  <th className="p-4 text-left text-sm text-gray-500">Name</th>
                  <th className="p-4 text-left text-sm text-gray-500">Type</th>
                  <th className="p-4 text-left text-sm text-gray-500">Value</th>
                  <th className="p-4 text-left text-sm text-gray-500">Active</th>
                  <th className="p-4 text-left text-sm text-gray-500">Validity</th>
                  <th className="p-4 text-right text-sm text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((d) => (
                  <tr key={d.id} className="border-b border-b-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{d.label}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs border ${
                        d.type === "PERCENTAGE" ? "bg-violet-50 border-violet-200 text-violet-700" : "bg-gray-50 border-gray-200 text-gray-700"
                      }`}>
                        {d.type}
                      </span>
                    </td>
                    <td className="p-4">{formatValue(d)}</td>
                    <td className="p-4">
                      {d.isActive ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700 border border-emerald-200">
                          <BadgeCheck className="w-4 h-4" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 border border-gray-200">
                          <X className="w-4 h-4" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {d.startDate && d.endDate ? (
                        <span className="text-gray-500">{format(new Date(d.startDate), "MMM dd, yyyy")} → {format(new Date(d.endDate), "MMM dd, yyyy")}</span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(d)} className="text-amber-600 hover:text-amber-700 inline-flex items-center gap-2 text-sm">
                          <Edit className="w-4 h-4" /> Edit
                        </button>
                        <button onClick={() => remove(d.id)} className="text-red-600 hover:text-red-700 inline-flex items-center gap-2 text-sm">
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {discounts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-muted-foreground">No discounts yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Inline Modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="z-10 w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{editing ? "Edit Discount" : "Create Discount"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              <div className="space-y-2">
                <label htmlFor="label" className="block text-sm font-medium text-gray-700">Label</label>
                <input id="label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="e.g. Summer Sale" className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as DiscountType })} className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">
                  <option value="PERCENTAGE">Percentage</option>
                  <option value="FIXED">Fixed</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value</label>
                <input id="value" type="number" min={0} step={form.type === "PERCENTAGE" ? 1 : 100} value={Number.isNaN(form.value) ? 0 : form.value} onChange={(e) => setForm({ ...form, value: parseFloat(e.target.value) })} placeholder={form.type === "PERCENTAGE" ? "e.g. 15" : "e.g. 5000"} className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Active</label>
                  <span className="text-xs text-gray-500">Toggle availability</span>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="sr-only" />
                  <span className={`h-5 w-10 rounded-full transition-colors ${form.isActive ? "bg-violet-600" : "bg-gray-200"}`} />
                  <span className="ml-3 text-sm text-gray-700">{form.isActive ? "On" : "Off"}</span>
                </label>
              </div>
              <div className="space-y-2">
                <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input id="start" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div className="space-y-2">
                <label htmlFor="end" className="block text-sm font-medium text-gray-700">End Date</label>
                <input id="end" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
              <button onClick={save} className="px-4 py-2 rounded bg-violet-600 text-white hover:bg-violet-700">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
