import React from 'react';

const Footer = () => (
  <footer style={{padding: '48px 0 32px', background: '#181818', color: '#fff', marginTop: 40}}>
    <div style={{maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', borderBottom: '1px solid #333', paddingBottom: 24}}>
      <div style={{fontWeight: 700, fontSize: 22, marginBottom: 16}}>Smart Living</div>
      <div style={{fontSize: 15, display: 'flex', flexDirection: 'column', gap: 8}}>
        <a href="#" style={{color: '#fff'}}>Контакты</a>
        <a href="#" style={{color: '#fff'}}>Политика конфиденциальности</a>
        <a href="#" style={{color: '#fff'}}>Возвраты</a>
      </div>
      <div style={{fontSize: 15, display: 'flex', flexDirection: 'column', gap: 8}}>
        <a href="#" style={{color: '#fff'}}>Track Order</a>
        <a href="#" style={{color: '#fff'}}>Wishlist</a>
      </div>
    </div>
    <div style={{maxWidth: 1200, margin: '0 auto', textAlign: 'center', color: '#aaa', fontSize: 14, marginTop: 18}}>
      © {new Date().getFullYear()} Smart Living. Все права защищены.
    </div>
  </footer>
);

export default Footer; 