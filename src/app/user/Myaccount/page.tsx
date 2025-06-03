'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './myaccount.module.css';
import Header from '@/components/Header';
import CategoriesSection from '@/components/CategoriesSection';
import { getCookie } from 'cookies-next';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export default function MyAccountPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      const userCookie = getCookie('user');
      if (!userCookie) {
        router.push('/user/login');
        return false;
      }
      return true;
    };

    const fetchUserData = async () => {
      if (!checkAuth()) return;

      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          if (response.status === 401) {
            router.push('/user/login');
          } else {
            setError('Failed to load user data');
          }
        }
      } catch (err) {
        setError('Error loading user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    // Удаляем куки
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/user/login');
  };

  if (loading) {
    return (
      <>
        <Header />
        <CategoriesSection />
        <div className={styles.container}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <CategoriesSection />
        <div className={styles.container}>
          <div className={styles.error}>{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <CategoriesSection />
      <div className={styles.container}>
        <div className={styles.accountBox}>
          <h1 className={styles.title}>My Account</h1>
          
          <div className={styles.sections}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Personal Information</h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>First Name</label>
                  <p>{userData?.firstName}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Last Name</label>
                  <p>{userData?.lastName}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Email</label>
                  <p>{userData?.email}</p>
                </div>
                <div className={styles.infoItem}>
                  <label>Member Since</label>
                  <p>{new Date(userData?.createdAt || '').toLocaleDateString()}</p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Account Actions</h2>
              <div className={styles.actions}>
                <button 
                  className={styles.actionButton}
                  onClick={() => router.push('/user/Myaccount/edit')}
                >
                  Edit Profile
                </button>
                <button 
                  className={styles.actionButton}
                  onClick={() => router.push('/user/Myaccount/orders')}
                >
                  View Orders
                </button>
                <button 
                  className={styles.actionButton}
                  onClick={() => router.push('/user/Myaccount/addresses')}
                >
                  Manage Addresses
                </button>
                <button 
                  className={`${styles.actionButton} ${styles.dangerButton}`}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
} 