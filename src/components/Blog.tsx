'use client';
import React, { useState } from 'react';
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
    content: `Choosing the right bedding is essential for a good night's sleep and a beautiful bedroom. Here are some key factors to consider:

1. Material Matters
- Cotton: Breathable and durable, perfect for all seasons
- Linen: Naturally cooling and gets softer with each wash
- Silk: Luxurious and temperature-regulating
- Bamboo: Eco-friendly and moisture-wicking

2. Thread Count
- 200-400: Good for everyday use
- 400-600: Premium quality
- 800+: Ultra-luxury (but not always better)

3. Weave Types
- Percale: Crisp and cool
- Sateen: Smooth and lustrous
- Twill: Durable and warm

4. Size Considerations
- Measure your mattress before buying
- Consider mattress topper thickness
- Account for deep pocket options

5. Style Elements
- Color coordination with your room
- Pattern vs. solid choices
- Texture and layering options

Remember: The best bedding is the one that makes you feel most comfortable and matches your personal style.`
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
  const [current, setCurrent] = useState(0);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const currentPost = blogPosts[current];

  const prev = () => setCurrent((c) => (c === 0 ? blogPosts.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === blogPosts.length - 1 ? 0 : c + 1));

  const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => (
    <div
      style={{
        position: 'relative',
        flex: '1 1 380px',
        minWidth: 320,
        maxWidth: 800,
        height: 420,
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 4px 32px rgba(34,34,34,0.10)',
        background: '#f7f7f7',
        display: 'flex',
        alignItems: 'flex-end',
        cursor: 'pointer',
        margin: '0 auto',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
      }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          style={{ objectFit: 'cover', borderRadius: 12 }}
          sizes="(max-width: 900px) 100vw, 800px"
        />
      </div>
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        margin: '0 auto',
        background: 'rgba(255,255,255,0.5)',
        borderRadius: 8,
        boxShadow: '0 2px 12px rgba(34,34,34,0.08)',
        padding: '32px 24px 24px 24px',
        maxWidth: 320,
        zIndex: 2,
        marginBottom: 32,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <span style={{ 
          color: '#666', 
          fontSize: 14, 
          marginBottom: 8,
          display: 'block'
        }}>
          {new Date(post.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
        <h3 style={{ 
          fontSize: 22, 
          fontWeight: 700, 
          marginBottom: 8,
          color: '#111'
        }}>{post.title}</h3>
        <p style={{ 
          fontSize: 15, 
          color: '#111', 
          marginBottom: 18,
          lineHeight: 1.5
        }}>{post.excerpt}</p>
        <button 
          onClick={() => setSelectedPost(post)}
          style={{
            background: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '12px 28px',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(34,34,34,0.10)',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          READ MORE
        </button>
      </div>
    </div>
  );

  return (
    <section style={{
      width: '100%',
      padding: '60px 0 40px 0',
      background: '#fff',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontSize: 28,
        fontWeight: 700,
        marginBottom: 12,
        letterSpacing: 0.2,
      }}>
        Smart Living Blog
      </h2>
      <p style={{
        fontSize: 17,
        color: '#444',
        marginBottom: 40,
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        Tips, trends, and inspiration for a cozy and stylish home. Everything about bedding, rugs, throws, and more!
      </p>

      <div style={{
        position: 'relative',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{ position: 'relative' }}>
          <BlogCard post={currentPost} index={0} />
          <button 
            onClick={prev} 
            aria-label="Previous blog" 
            style={{
              position: 'absolute',
              left: '7%',
              top: '52%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              zIndex: 3,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button 
            onClick={next} 
            aria-label="Next blog" 
            style={{
              position: 'absolute',
              right: '7%',
              top: '52%',
              transform: 'translate(50%, -50%)',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255, 0, 0, 0.1)',
              cursor: 'pointer',
              zIndex: 3,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6"/>
            </svg>
          </button>
        </div>
      </div>

      {selectedPost && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}>
          <div style={{
            background: '#fff',
            maxWidth: 1000,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: 12,
            padding: '60px 80px',
            position: 'relative',
          }}>
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                position: 'absolute',
                top: 30,
                right: 30,
                background: 'none',
                border: 'none',
                fontSize: 32,
                cursor: 'pointer',
                color: '#666',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              ×
            </button>

            <div style={{
              maxWidth: 800,
              margin: '0 auto',
            }}>
              <h2 style={{
                fontSize: 36,
                fontWeight: 700,
                marginBottom: 16,
                color: '#111',
                lineHeight: 1.3,
              }}>
                {selectedPost.title}
              </h2>

              <div style={{
                color: '#666',
                marginBottom: 40,
                fontSize: 15,
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
                height: 500,
                marginBottom: 48,
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
              }}>
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: '#333',
                whiteSpace: 'pre-line',
                textAlign: 'left',
              }}>
                {selectedPost.content.split('\n\n').map((section, index) => {
                  if (section.startsWith('1.') || section.startsWith('2.') || 
                      section.startsWith('3.') || section.startsWith('4.') || 
                      section.startsWith('5.') || section.startsWith('6.')) {
                    const [title, ...points] = section.split('\n');
                    return (
                      <div key={index} style={{ marginBottom: 40 }}>
                        <h3 style={{
                          fontSize: 24,
                          fontWeight: 600,
                          color: '#111',
                          marginBottom: 20,
                          paddingBottom: 12,
                          borderBottom: '2px solid #f0f0f0',
                        }}>
                          {title}
                        </h3>
                        <ul style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                        }}>
                          {points.map((point, pointIndex) => (
                            <li key={pointIndex} style={{
                              marginBottom: 12,
                              paddingLeft: 24,
                              position: 'relative',
                            }}>
                              <span style={{
                                position: 'absolute',
                                left: 0,
                                top: 8,
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: '#111',
                              }}/>
                              {point.replace('- ', '')}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  } else if (section.startsWith('Remember:')) {
                    return (
                      <div key={index} style={{
                        marginTop: 48,
                        padding: 24,
                        background: '#f8f8f8',
                        borderRadius: 8,
                        borderLeft: '4px solid #111',
                      }}>
                        <p style={{
                          margin: 0,
                          fontSize: 18,
                          fontWeight: 500,
                          color: '#111',
                        }}>
                          {section}
                        </p>
                      </div>
                    );
                  } else {
                    return (
                      <p key={index} style={{
                        marginBottom: 24,
                        fontSize: 18,
                        lineHeight: 1.7,
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