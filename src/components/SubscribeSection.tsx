'use client';
import React, { useState } from 'react';

const SubscribeSection = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <section id="subscribe" style={{maxWidth: 600, margin: '40px auto', padding: 40, background: '#fff', borderRadius: 14, textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.07)'}}>
      <h2 style={{fontSize: 22, fontWeight: 700, marginBottom: 14}}>Подпишитесь на новости и акции</h2>
      <p style={{marginBottom: 22, color: '#444'}}>Будьте первыми, кто узнает о скидках и новинках!</p>
      <form style={{display: 'flex', gap: 12, justifyContent: 'center'}}>
        <input type="email" placeholder="Ваш email" required style={{padding: '12px 18px', borderRadius: 7, border: '1.5px solid #ccc', fontSize: 16, width: 240}} />
        <button
          type="submit"
          style={{
            padding: '12px 28px',
            borderRadius: 7,
            background: hovered ? '#222' : '#111',
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.18s',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >Подписаться</button>
      </form>
      <style>{`
        @media (max-width: 768px) {
          section {
            maxWidth: 90vw;
            margin: 30px auto;
            padding: 30px 20px;
          }
          h2 {
            fontSize: 20px;
            marginBottom: 12px;
          }
          p {
            marginBottom: 18px;
            fontSize: 14px;
          }
          form {
            flexDirection: column;
            gap: 10px;
          }
          input {
            width: 100%;
            padding: 10px 15px;
            fontSize: 14px;
          }
          button {
            width: 100%;
            padding: 10px 0;
            fontSize: 14px;
          }
        }
      `}</style>
    </section>
  );
};

export default SubscribeSection; 