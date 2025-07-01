'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'How to Choose the Right Bedding',
    slug: 'how-to-choose-right-bedding',
    date: '2024-06-01',
    image: '/generated_image_large1.jpg',
    excerpt: 'Discover how to select bedding that fits your needs, style, and comfort for every season.',
    content: `Choosing the right bedding is essential for a good night's sleep and a beautiful bedroom. Here are some key factors to consider:\n\n1. Material Matters\n- Cotton: Breathable and durable, perfect for all seasons\n- Linen: Naturally cooling and gets softer with each wash\n- Silk: Luxurious and temperature-regulating\n- Bamboo: Eco-friendly and moisture-wicking\n\n2. Thread Count\n- 200-400: Good for everyday use\n- 400-600: Premium quality\n- 800+: Ultra-luxury (but not always better)\n\n3. Weave Types\n- Percale: Crisp and cool\n- Sateen: Smooth and lustrous\n- Twill: Durable and warm\n\n4. Size Considerations\n- Measure your mattress before buying\n- Consider mattress topper thickness\n- Account for deep pocket options\n\n5. Style Elements\n- Color coordination with your room\n- Pattern vs. solid choices\n- Texture and layering options\n\nRemember: The best bedding is the one that makes you feel most comfortable and matches your personal style.`
  },
  {
    title: '10 Tips for Better Sleep',
    slug: '10-tips-for-better-sleep',
    date: '2024-05-20',
    image: '/generated_image_large.jpg',
    excerpt: 'Simple and effective ways to improve your sleep quality and wake up refreshed every day.',
    content: `Getting quality sleep is crucial for your health and well-being. Here are 10 proven tips to help you sleep better:

1. Create a Sleep Schedule
- Go to bed and wake up at the same time every day
- Maintain this schedule even on weekends
- Allow 7-9 hours for sleep

2. Optimize Your Bedroom
- Keep the room cool (65-67°F/18-19°C)
- Use blackout curtains
- Invest in a comfortable mattress and pillows

3. Limit Screen Time
- Avoid screens 1 hour before bed
- Use night mode on devices
- Consider blue light blocking glasses

4. Mind Your Diet
- Avoid caffeine after 2 PM
- Don't eat large meals before bed
- Limit alcohol consumption

5. Exercise Regularly
- Work out earlier in the day
- Avoid intense exercise before bed
- Try gentle stretching or yoga

6. Create a Bedtime Routine
- Take a warm bath or shower
- Read a book
- Practice relaxation techniques

7. Manage Stress
- Write in a journal
- Try meditation
- Practice deep breathing

8. Use Your Bed for Sleep Only
- Avoid working in bed
- Don't watch TV in bed
- Create a sleep-only association

9. Consider Your Sleep Environment
- Use white noise if needed
- Choose comfortable bedding
- Keep the room clean and organized

10. Seek Professional Help
- If sleep problems persist
- Consult a sleep specialist
- Consider sleep therapy

Remember: Quality sleep is essential for your physical and mental health.`
  },
  {
    title: 'How to Care for Your Home Textiles',
    slug: 'how-to-care-for-textiles',
    date: '2024-05-10',
    image: '/generated_image_large2.jpg',
    excerpt: 'Keep your bedding, towels, and throws looking new with these easy care tips.',
    content: `Proper care of your home textiles will extend their life and keep them looking beautiful. Here's a comprehensive guide:

1. Bedding Care
- Wash sheets every 1-2 weeks
- Use mild detergent
- Wash in warm water
- Tumble dry on low
- Iron if needed

2. Towel Maintenance
- Wash new towels before use
- Use less detergent
- Avoid fabric softener
- Dry completely
- Replace every 2-3 years

3. Throw Blanket Care
- Check care labels
- Spot clean when possible
- Professional clean if needed
- Store properly when not in use

4. General Tips
- Sort by color and fabric type
- Use appropriate water temperature
- Don't overload the machine
- Air dry when possible
- Store in a cool, dry place

5. Stain Treatment
- Act quickly
- Use appropriate stain removers
- Test on a small area first
- Follow care instructions

6. Storage Tips
- Clean before storing
- Use breathable containers
- Add lavender sachets
- Check periodically

Remember: Proper care extends the life of your textiles and maintains their beauty.`
  },
  {
    title: 'Cozy Home: Creating Comfort with Throws and Rugs',
    slug: 'cozy-home-throws-rugs',
    date: '2024-04-28',
    image: '/generated_image_large3.jpg',
    excerpt: 'Learn how to use throws and rugs to add warmth and style to any room.',
    content: `Transform your space into a cozy haven with throws and rugs. Here's how to create the perfect atmosphere:

1. Choosing the Right Throws
- Consider the season
- Match your color scheme
- Think about texture
- Choose the right size
- Consider maintenance

2. Rug Selection
- Measure your space
- Choose the right material
- Consider traffic patterns
- Think about maintenance
- Match your style

3. Placement Tips
- Layer rugs for depth
- Drape throws naturally
- Create focal points
- Consider furniture placement
- Think about flow

4. Color and Pattern
- Mix and match textures
- Use complementary colors
- Consider the room's mood
- Add visual interest
- Balance patterns

5. Seasonal Updates
- Rotate throws by season
- Change rug positions
- Update accessories
- Consider temperature
- Maintain comfort

6. Maintenance
- Regular cleaning
- Proper storage
- Spot treatment
- Professional cleaning
- Regular rotation

Remember: The key to a cozy home is in the details and how they work together.`
  },
  {
    title: 'Top 5 Home Textile Trends This Year',
    slug: 'top-5-textile-trends',
    date: '2024-04-10',
    image: '/generated_image_large4.jpg',
    excerpt: 'Stay up to date with the latest trends in bedding, rugs, and home accessories.',
    content: `Discover the latest trends in home textiles that are shaping interior design this year:

1. Sustainable Materials
- Organic cotton
- Recycled fabrics
- Natural dyes
- Eco-friendly production
- Biodegradable materials

2. Textured Layers
- Mixed materials
- Chunky knits
- Woven patterns
- 3D textures
- Tactile surfaces

3. Earth Tones
- Warm neutrals
- Terracotta
- Sage green
- Soft browns
- Natural hues

4. Bold Patterns
- Geometric designs
- Abstract art
- Nature-inspired
- Cultural motifs
- Modern takes on traditional

5. Smart Textiles
- Temperature regulating
- Anti-bacterial
- UV protection
- Easy care
- Performance fabrics

6. Design Tips
- Mix old and new
- Layer textures
- Consider sustainability
- Think long-term
- Personal style

Remember: Trends should enhance your personal style, not dictate it.`
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const node = titleRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const BlogCard = ({ post }: { post: BlogPost }) => (
    <div
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.35)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1.5px solid rgba(200,200,255,0.18)',
        borderRadius: 24,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        cursor: 'pointer',
        transition: 'box-shadow 0.25s, transform 0.25s',
        minHeight: 480,
        maxWidth: 480,
        margin: '0 auto',
      }}
      onClick={() => setSelectedPost(post)}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(31,38,135,0.18)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31,38,135,0.10)')}
    >
      <div style={{ position: 'relative', width: '100%', height: 220 }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          style={{ objectFit: 'cover', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
          sizes="(max-width: 900px) 100vw, 480px"
        />
      </div>
      <div style={{ padding: '32px 28px 28px 28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <span style={{ color: '#666', fontSize: 14, marginBottom: 8, display: 'block' }}>
          {new Date(post.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
        <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10, color: '#1a1a1a', lineHeight: 1.2 }}>{post.title}</h3>
        <p style={{ fontSize: 16, color: '#222', marginBottom: 22, lineHeight: 1.6 }}>{post.excerpt}</p>
        <button
          onClick={e => { e.stopPropagation(); setSelectedPost(post); }}
          style={{
            background: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '14px 36px',
            fontSize: 17,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(34,34,34,0.10)',
            transition: 'background 0.2s, transform 0.2s',
            letterSpacing: 0.5,
            marginTop: 'auto',
            alignSelf: 'flex-start',
          }}
        >
          READ MORE
        </button>
      </div>
    </div>
  );

  return (
    <section style={{
      width: '100vw',
      minWidth: '100%',
      marginLeft: 'calc(50% - 50vw)',
      padding: '90px 0 70px 0',
      background: 'linear-gradient(120deg, #e9e4f0 0%, #f8fafc 100%)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <h2
        ref={titleRef}
        id="blog-main-title"
        style={{
          fontSize: 38,
          fontWeight: 900,
          marginBottom: 18,
          letterSpacing: 0.2,
          color: '#1a1a1a',
          fontFamily: 'Montserrat, sans-serif',
          position: 'relative',
        }}
      >
        {Array.from('Smart Living Blog').map((char, i) => (
          <span
            key={i}
            className={titleVisible ? 'char-animate' : ''}
            style={{
              display: 'inline-block',
              opacity: 0,
              transform: 'translateY(50px) scale(0.5)',
              animation: titleVisible
                ? `charIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards ${i * 0.08 + 0.2}s`
                : 'none',
              backgroundImage: titleVisible 
                ? 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)'
                : 'none',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: titleVisible ? '2px 2px 4px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
        {titleVisible && (
          <div
            style={{
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 3,
              background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
              animation: 'blogUnderline 1.2s ease-out 1.5s forwards',
            }}
          />
        )}
      </h2>
      <style>{`
        @keyframes charIn {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.5) rotateX(-90deg);
            filter: blur(10px);
          }
          50% {
            opacity: 0.7;
            transform: translateY(-10px) scale(1.1) rotateX(10deg);
            filter: blur(2px);
          }
          80% {
            opacity: 1;
            transform: translateY(5px) scale(1.05) rotateX(-2deg);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
            filter: blur(0px);
          }
        }
        
        @keyframes blogUnderline {
          0% {
            width: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 70%;
            opacity: 1;
          }
        }
      `}</style>
      <p style={{
        fontSize: 21,
        color: '#444',
        marginBottom: 54,
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'Montserrat, sans-serif',
      }}>
        Tips, trends, and inspiration for a cozy and stylish home. Everything about bedding, rugs, throws, and more!
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 48,
        width: '100%',
        maxWidth: 1440,
        margin: '0 auto',
        padding: '0 32px',
      }}>
        {blogPosts.map((post, idx) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      {selectedPost && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#fff',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            position: 'sticky',
            top: 0,
            background: '#fff',
            padding: '16px 20px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#222',
              margin: 0,
              flex: 1,
              paddingRight: '16px',
              lineHeight: 1.3,
            }}>
              {selectedPost.title}
            </h2>
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
                color: '#666',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'background-color 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            padding: '20px',
            background: '#fff',
          }}>
            <div style={{
              maxWidth: 800,
              margin: '0 auto',
            }}>
              <div style={{
                color: '#666',
                marginBottom: 24,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {new Date(selectedPost.date).toLocaleDateString('en-GB', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              
              <div style={{
                position: 'relative',
                width: '100%',
                height: 250,
                marginBottom: 32,
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}>
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              <div style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: '#333',
                whiteSpace: 'pre-line',
                textAlign: 'left',
              }}>
                {selectedPost.content.split('\n\n').map((section, index) => {
                  if (/^\d+\./.test(section)) {
                    const [title, ...points] = section.split('\n');
                    return (
                      <div key={index} style={{ marginBottom: 32 }}>
                        <h3 style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: '#111',
                          marginBottom: 16,
                          paddingBottom: 8,
                          borderBottom: '2px solid #f0f0f0',
                        }}>{title}</h3>
                        <ul style={{
                          listStyle: 'disc',
                          paddingLeft: 24,
                          margin: 0,
                        }}>
                          {points.filter(Boolean).map((point, pointIndex) => (
                            <li key={pointIndex} style={{
                              marginBottom: 12,
                              fontSize: 16,
                              color: '#333',
                              lineHeight: 1.7,
                            }}>
                              {point.replace(/^- /, '')}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  } else if (section.startsWith('Remember:')) {
                    return (
                      <div key={index} style={{
                        marginTop: 32,
                        padding: 20,
                        background: '#f8f8f8',
                        borderRadius: 12,
                        borderLeft: '4px solid #111',
                      }}>
                        <p style={{
                          margin: 0,
                          fontSize: 16,
                          fontWeight: 500,
                          color: '#111',
                          lineHeight: 1.6,
                        }}>
                          {section}
                        </p>
                      </div>
                    );
                  } else {
                    return (
                      <p key={index} style={{
                        marginBottom: 20,
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: '#333',
                      }}>
                        {section}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}