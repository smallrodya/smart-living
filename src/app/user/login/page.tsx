'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import Header from '@/components/Header';
import CategoriesSection from '@/components/CategoriesSection';
import { setCookie } from 'cookies-next';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Сохраняем данные сессии в куки
        setCookie('user', JSON.stringify(data), {
          maxAge: 30 * 24 * 60 * 60, // 30 дней
          path: '/',
        });
        router.push('/user/Myaccount');
      } else {
        setError(data.message || 'An error occurred while trying to log in');
      }
    } catch (err) {
      setError('An error occurred while trying to log in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Header />
      <CategoriesSection />
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>Login to your account</h1>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="enter your email"
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="enter your password"
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className={styles.links}>
            <a href="/user/register" className={styles.link}>
              Create an account
            </a>
            <a href="/user/forgot-password" className={styles.link}>
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 