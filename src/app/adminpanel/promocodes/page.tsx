"use client";
import React, { useState, useEffect } from "react";

interface Promocode {
  code: string;
  discount: number; // percent
}

export default function PromocodesPage() {
  const [promocodes, setPromocodes] = useState<Promocode[]>([]);
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPromocodes = async () => {
    setLoading(true);
    const res = await fetch("/api/promocodes");
    const data = await res.json();
    setPromocodes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPromocodes();
  }, []);

  const handleAdd = async () => {
    if (!newCode.trim() || newDiscount <= 0) return;
    setError(null);
    const res = await fetch("/api/promocodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: newCode.trim(), discount: newDiscount }),
    });
    if (res.ok) {
      setNewCode("");
      setNewDiscount(0);
      fetchPromocodes();
    } else {
      const data = await res.json();
      setError(data.error || "Error");
    }
  };

  const handleDelete = async (code: string) => {
    setError(null);
    const res = await fetch("/api/promocodes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    if (res.ok) {
      fetchPromocodes();
    } else {
      const data = await res.json();
      setError(data.error || "Error");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Promocodes</h1>
      <div className="mb-6 flex gap-2 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Code</label>
          <input
            className="border rounded px-3 py-2 w-32"
            value={newCode}
            onChange={e => setNewCode(e.target.value)}
            placeholder="PROMO2024"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Discount (%)</label>
          <input
            type="number"
            className="border rounded px-3 py-2 w-24"
            value={newDiscount}
            onChange={e => setNewDiscount(Number(e.target.value))}
            min={1}
            max={100}
          />
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAdd}
        >
          Create
        </button>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <ul className="divide-y border rounded bg-white">
        {loading && <li className="p-4 text-gray-400 text-center">Loading...</li>}
        {!loading && promocodes.length === 0 && (
          <li className="p-4 text-gray-400 text-center">No promocodes yet</li>
        )}
        {promocodes.map((promo) => (
          <li key={promo.code} className="flex items-center justify-between p-4">
            <div>
              <span className="font-mono font-semibold text-lg">{promo.code}</span>
              <span className="ml-4 text-blue-700 font-bold">-{promo.discount}%</span>
            </div>
            <button
              className="text-red-600 hover:underline text-sm"
              onClick={() => handleDelete(promo.code)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 