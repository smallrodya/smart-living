import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

// Пример статей (в реальном проекте лучше получать из CMS или API)
const blogPosts = [
  {
    title: 'How to Choose the Perfect Bedding for Any Season',
    slug: 'how-to-choose-bedding',
    date: '2024-06-01',
    image: '/blog/bedding-tips.jpg',
    content: `Bedding affects your sleep quality and mood. Here are tips for choosing the perfect set for any time of year...\n\n(Full article content goes here.)`,
  },
  {
    title: 'Top 5 Rug Design Trends for 2024',
    slug: 'top-5-rug-trends-2024',
    date: '2024-05-20',
    image: '/blog/rug-trends.jpg',
    content: `Rugs are not only practical but also stylish! Discover the colors and materials trending this year...\n\n(Full article content goes here.)`,
  },
  {
    title: 'How to Care for Throws and Blankets So They Last Longer',
    slug: 'care-for-throws',
    date: '2024-05-10',
    image: '/blog/throws-care.jpg',
    content: `Throws and blankets need special care. Here are simple tips for washing and storage...\n\n(Full article content goes here.)`,
  },
  {
    title: 'Easy Ways to Refresh Your Home with New Curtains',
    slug: 'refresh-with-curtains',
    date: '2024-04-28',
    image: '/blog/curtains-refresh.jpg',
    content: `Curtains can instantly change the mood of a room. Learn how to choose and style them for a fresh look.\n\n(Full article content goes here.)`,
  },
  {
    title: '7 Textile Storage Hacks for a Tidy Home',
    slug: 'textile-storage-hacks',
    date: '2024-04-10',
    image: '/blog/textile-storage.jpg',
    content: `Keep your bedding, towels, and throws organized with these clever storage ideas.\n\n(Full article content goes here.)`,
  },
];

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <div style={{padding: 40, textAlign: 'center'}}>Blog post not found.</div>;

  return (
    <section style={{ padding: '60px 0', background: '#fafbfc', minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 6px 32px rgba(0,0,0,0.08)', overflow: 'hidden', padding: 0 }}>
        <img src={post.image} alt={post.title} style={{ width: '100%', height: 320, objectFit: 'cover' }} />
        <div style={{ padding: 36 }}>
          <Link href="/blog" style={{ color: '#1a1a1a', textDecoration: 'none', fontWeight: 600, fontSize: 16, marginBottom: 18, display: 'inline-block' }}>&larr; Back to Blog</Link>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '18px 0 12px 0', letterSpacing: 0.2 }}>{post.title}</h1>
          <span style={{ color: '#888', fontSize: 15, marginBottom: 18, display: 'block' }}>{new Date(post.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          <div style={{ color: '#444', fontSize: 18, lineHeight: 1.7, marginTop: 18, whiteSpace: 'pre-line' }}>{post.content}</div>
        </div>
      </div>
    </section>
  );
} 