'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface SubCategory {
  name: string;
  links: string[];
}

interface Category {
  name: string;
  icon: string;
  img: string;
  sub: SubCategory[];
}

const categories: Category[] = [
  {
    name: 'BEDDING', icon: '🛏️', img: '/cat-bedding-main.jpg', sub: [
      {
        name: 'DUVET SET', links: [
          'Shop Duvet Set by Type',
          'Shop Duvet Set by Colour',
          'Shop Duvet Set under £10',
          'Clearance',
          'Shop All',
        ],
      },
      {
        name: 'BED SHEETS', links: [
          'Shop by Sheet Type',
          'Shop by Sheet Colour',
          'Shop from £4.49',
          'Shop All',
        ],
      },
      {
        name: 'KIDS COLLECTION', links: [
          'Kids collection by type',
          'Shop by Colour',
          'Shop by Material',
          'Shop All',
        ],
      },
    ],
  },
  {
    name: 'RUGS & MATS', icon: '🧺', img: '/cat-rugs-main.jpg', sub: [
      {
        name: 'MATS', links: [
          'Shop Mats by Colour',
          'Shop Mats by Design',
          'Shop Mats from £5.49',
          'Shop All',
        ],
      },
      {
        name: 'RUGS', links: [
          'Shop Rugs by Type',
          'Shop Rugs by Colour',
          'Shop Rugs from £10.99',
          'Shop All',
        ],
      },
    ],
  },
  {
    name: 'THROWS & TOWELS', icon: '🧣', img: '/cat-throws-main.jpg', sub: [
      {
        name: 'TOWELS', links: [
          'Shop Towels by Design',
          'Shop Towel by Colour',
          'Shop All',
        ],
      },
      {
        name: 'THROWS', links: [
          'Shop Throw by Type',
          'Shop Throw by Colour',
          'Shop All',
        ],
      },
    ],
  },
  {
    name: 'OUTDOOR', icon: '🌳', img: '/cat-outdoor-main.jpg', sub: [
      {
        name: 'CHAIRS', links: [
          'Shop all',
        ],
      },
    ],
  },
  {
    name: 'CURTAINS', icon: '🪟', img: '/cat-curtains-main.jpg', sub: [
      {
        name: 'CURTAINS', links: [
          'Shop by Curtain Type',
          'Shop by Curtain Colour',
          'Shop All',
        ],
      },
    ],
  },
  {
    name: 'CLOTHING', icon: '👕', img: '/cat-clothing-main.jpg', sub: [
      {
        name: 'MEN', links: [
          'Hoodie',
          'Sweatshirt',
        ],
      },
      {
        name: 'WOMEN', links: [
          'Denim',
          'Jersey',
          'Jogger',
          'Lounge & Nightwear',
        ],
      },
    ],
  },
  {
    name: 'FOOTWEAR', icon: '👟', img: '/cat-footwear-main.jpg', sub: [
      {
        name: 'BOOTIES', links: [
          'Shop All',
        ],
      },
      {
        name: 'SLIPPERS', links: [
          'Shop All',
        ],
      },
      {
        name: 'SOCKS', links: [
          'Shop all',
        ],
      },
    ],
  },
];

const CategoriesSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenIdx(null);
      }
    }
    if (openIdx !== null) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openIdx]);

  const currentCat = openIdx !== null ? categories[openIdx] : null;

  const handleCategoryClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOpenIdx(openIdx === null ? 0 : null);
  };

  return (
    <section id="categories" style={{width: '100%', margin: '0 auto 18px', padding: 0}}>
      <div style={{
        display: 'flex',
        gap: 48,
        overflowX: 'auto',
        padding: '18px 0',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 90,
        scrollbarWidth: 'none',
        width: '100%',
        boxSizing: 'border-box',
        background: 'transparent',
        borderRadius: 0,
        boxShadow: 'none',
      }}>
        {categories.map((cat, idx) => (
          <div key={cat.name} style={{flex: '0 0 auto', textAlign: 'center'}}>
            <button
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                borderRadius: 12, width: 80, height: 80, cursor: 'pointer',
                transition: 'color 0.18s, background 0.18s',
                fontSize: 15, fontWeight: 500, color: '#222',
                margin: 0,
                outline: 'none',
                boxShadow: 'none',
              }}
              onMouseEnter={e => {e.currentTarget.style.background = '#f7f7f7'; e.currentTarget.style.color = '#111';}}
              onMouseLeave={e => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#222';}}
              onClick={handleCategoryClick}
            >
              <span style={{fontSize: 28, marginBottom: 7, color: '#111', transition: 'color 0.18s'}}>{cat.icon}</span>
              <span style={{fontSize: 13, fontWeight: 600, textAlign: 'center', letterSpacing: 0.1, color: 'inherit', transition: 'color 0.18s'}}>{cat.name}</span>
            </button>
          </div>
        ))}
      </div>
      {openIdx !== null && currentCat && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(34,34,34,0.38)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInBg .18s',
          backdropFilter: 'blur(2px)',
        }}>
          <div ref={modalRef} style={{
            background: 'linear-gradient(135deg, #fff 80%, #f7f7fa 100%)', borderRadius: 28, boxShadow: '0 12px 48px 0 rgba(34,34,34,0.18)',
            minWidth: 340, maxWidth: 820, padding: '44px 36px 56px 36px', zIndex: 1001, position: 'relative',
            animation: 'fadeIn .22s cubic-bezier(.4,2,.6,1)', display: 'flex', flexDirection: 'column', alignItems: 'center',
            border: '1.5px solid #ececec',
          }}>
            <button onClick={() => setOpenIdx(null)} style={{position: 'absolute', top: 18, right: 22, background: 'none', border: 'none', fontSize: 28, color: '#bbb', cursor: 'pointer', fontWeight: 700, lineHeight: 1, transition: 'color 0.18s'}} aria-label="Закрыть"
              onMouseEnter={e => (e.currentTarget.style.color = '#e53935')}
              onMouseLeave={e => (e.currentTarget.style.color = '#bbb')}
            >×</button>
            {currentCat && (
              <img src={currentCat.img} alt={currentCat.name} style={{width: 160, height: 160, objectFit: 'cover', borderRadius: 22, marginBottom: 32, background: '#f0f0f0', boxShadow: '0 6px 32px rgba(34,34,34,0.10)'}} />
            )}
            {currentCat && (
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 32, width: '100%', justifyContent: 'center', alignItems: 'stretch',
              }}>
                {currentCat.sub.map((sub: any) => (
                  <div key={sub.name} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 180, maxWidth: 220, background: '#fff',
                    borderRadius: 18, boxShadow: '0 2px 16px 0 rgba(34,34,34,0.07)', padding: '22px 18px 18px 18px', margin: 0,
                    transition: 'box-shadow 0.18s, transform 0.18s',
                  }}
                  onMouseEnter={e => {e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(229,57,53,0.10)'; e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';}}
                  onMouseLeave={e => {e.currentTarget.style.boxShadow = '0 2px 16px 0 rgba(34,34,34,0.07)'; e.currentTarget.style.transform = 'none';}}
                  >
                    <span style={{fontSize: 17, color: '#e53935', fontWeight: 700, marginBottom: 12, textAlign: 'center', width: '100%', letterSpacing: 0.3, textTransform: 'uppercase'}}>{sub.name}</span>
                    <ul style={{listStyle: 'none', padding: 0, margin: 0, width: '100%'}}>
                      {sub.links && sub.links.map((link: string) => (
                        <li key={link} style={{
                          fontSize: 15, color: '#222', marginBottom: 7, cursor: 'pointer',
                          borderRadius: 8, padding: '9px 10px', transition: 'background 0.15s, color 0.15s', textAlign: 'center',
                          fontWeight: 500,
                        }}
                        onMouseEnter={e => {e.currentTarget.style.background = '#f7f7f7'; e.currentTarget.style.color = '#222';}}
                        onMouseLeave={e => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#222';}}
                        >{link}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32, position: 'absolute', left: 0, right: 0, bottom: 18, zIndex: 1002}}>
              <button
                onClick={() => setOpenIdx(openIdx > 0 ? openIdx - 1 : 0)}
                disabled={openIdx === 0}
                style={{
                  background: openIdx === 0 ? '#eee' : '#111',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 50,
                  width: 44,
                  height: 44,
                  fontSize: 22,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: openIdx === 0 ? 'not-allowed' : 'pointer',
                  opacity: openIdx === 0 ? 0.5 : 1,
                  transition: 'background 0.18s, opacity 0.18s',
                  boxShadow: '0 2px 8px 0 rgba(34,34,34,0.08)',
                }}
                aria-label="Предыдущая категория"
              >
                <span style={{display: 'inline-block', transform: 'rotate(180deg)'}}>&#10140;</span>
              </button>
              <button
                onClick={() => setOpenIdx(openIdx < categories.length - 1 ? openIdx + 1 : openIdx)}
                disabled={openIdx === categories.length - 1}
                style={{
                  background: openIdx === categories.length - 1 ? '#eee' : '#111',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 50,
                  width: 44,
                  height: 44,
                  fontSize: 22,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: openIdx === categories.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: openIdx === categories.length - 1 ? 0.5 : 1,
                  transition: 'background 0.18s, opacity 0.18s',
                  boxShadow: '0 2px 8px 0 rgba(34,34,34,0.08)',
                }}
                aria-label="Следующая категория"
              >
                <span>&#10140;</span>
              </button>
            </div>
            <style>{`
              @media (max-width: 900px) {
                .modal-categories-flex { flex-direction: column !important; gap: 18px !important; }
                .modal-categories-card { min-width: 90vw !important; max-width: 98vw !important; }
              }
              @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
              @keyframes fadeInBg { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoriesSection; 