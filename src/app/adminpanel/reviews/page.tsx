"use client";
import { useEffect, useState } from "react";

interface Review {
  _id: string;
  productId: string;
  userName?: string;
  rating: number;
  text: string;
  createdAt: string;
  approved: boolean;
}

export default function ReviewsModerationPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/reviews");
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id: string) => {
    await fetch(`/api/admin/reviews/approve?id=${id}`, { method: "POST" });
    fetchReviews();
  };
  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/reviews/delete?id=${id}`, { method: "DELETE" });
    fetchReviews();
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Reviews Moderation</h1>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Product</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>User</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Rating</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Text</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Date</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Status</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r._id}>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{r.productId}</td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{r.userName || "Anonymous"}</td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{r.rating}</td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{r.text}</td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{new Date(r.createdAt).toLocaleString()}</td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{r.approved ? "Approved" : "Pending"}</td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>
                {!r.approved && (
                  <button onClick={() => handleApprove(r._id)} style={{ marginRight: 8 }}>Approve</button>
                )}
                <button onClick={() => handleDelete(r._id)} style={{ color: "red" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 