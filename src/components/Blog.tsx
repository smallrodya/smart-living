'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const blogPosts = [
  {
    title: 'How to Choose the Right Bedding',
    slug: 'how-to-choose-right-bedding',
    date: '2024-06-01',
    image: '/blog/bedding-tips.jpg',
    excerpt: 'Discover how to select bedding that fits your needs, style, and comfort for every season.'
  },
  {
    title: '10 Tips for Better Sleep',
    slug: '10-tips-for-better-sleep',
    date: '2024-05-20',
    image: '/blog/sleep-tips.jpg',
    excerpt: 'Simple and effective ways to improve your sleep quality and wake up refreshed every day.'
  },
  {
    title: 'How to Care for Your Home Textiles',
    slug: 'how-to-care-for-textiles',
    date: '2024-05-10',
    image: '/blog/textile-care.jpg',
    excerpt: 'Keep your bedding, towels, and throws looking new with these easy care tips.'
  },
  {
    title: 'Cozy Home: Creating Comfort with Throws and Rugs',
    slug: 'cozy-home-throws-rugs',
    date: '2024-04-28',
    image: '/blog/cozy-home.jpg',
    excerpt: 'Learn how to use throws and rugs to add warmth and style to any room.'
  },
  {
    title: 'Top 5 Home Textile Trends This Year',
    slug: 'top-5-textile-trends',
    date: '2024-04-10',
    image: '/blog/textile-trends.jpg',
    excerpt: 'Stay up to date with the latest trends in bedding, rugs, and home accessories.'
  },
];

export default function Blog() {
  const [current, setCurrent] = useState(0);
  const post = blogPosts[current];

  const prev = () => setCurrent((c) => (c === 0 ? blogPosts.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === blogPosts.length - 1 ? 0 : c + 1));

  return (
    <section style={{ padding: '60px 0', background: '#fafbfc' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 18, letterSpacing: 0.2, textAlign: 'center' }}>Smart Living Blog</h2>
        <p style={{ color: '#444', marginBottom: 44, fontSize: 20, maxWidth: 600, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          Tips, trends, and inspiration for a cozy and stylish home. Everything about bedding, rugs, throws, and more!
        </p>
        <div style={{
          background: '#fff',
          borderRadius: 20,
          boxShadow: '0 6px 32px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 420,
          position: 'relative',
          transition: 'box-shadow 0.22s, transform 0.22s',
        }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', height: 210, objectFit: 'cover', transition: 'transform 0.22s' }} />
          <div style={{ padding: 28, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#888', fontSize: 15, marginBottom: 10 }}>{new Date(post.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 14px 0', color: '#1a1a1a', lineHeight: 1.3 }}>{post.title}</h3>
            <p style={{ color: '#444', fontSize: 16, marginBottom: 20, flex: 1 }}>{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} style={{
              color: '#fff',
              background: 'linear-gradient(90deg, #1a1a1a 60%, #444 100%)',
              borderRadius: 10,
              padding: '12px 32px',
              textDecoration: 'none',
              fontWeight: 700,
              alignSelf: 'flex-start',
              fontSize: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'background 0.18s, transform 0.18s',
              letterSpacing: 0.1,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg, #444 0%, #1a1a1a 100%)'}
            onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(90deg, #1a1a1a 60%, #444 100%)'}
            >Read more</Link>
          </div>
          <button onClick={prev} aria-label="Previous blog" style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#fff',
            border: '1.5px solid #eee',
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            cursor: 'pointer',
            transition: 'box-shadow 0.18s, background 0.18s, border 0.18s, transform 0.18s',
            zIndex: 2,
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={next} aria-label="Next blog" style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#fff',
            border: '1.5px solid #eee',
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            cursor: 'pointer',
            transition: 'box-shadow 0.18s, background 0.18s, border 0.18s, transform 0.18s',
            zIndex: 2,
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}