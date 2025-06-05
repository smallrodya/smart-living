'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './register.module.css';
import Header from '@/components/Header';
import CategoriesSection from '@/components/CategoriesSection';
import { setCookie } from 'cookies-next';

interface PasswordStrength {
  score: number;
  message: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({ score: 0, message: '' });

  const checkPasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    let message = '';

    // Проверка длины
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Проверка наличия цифр
    if (/\d/.test(password)) score += 1;

    // Проверка наличия строчных букв
    if (/[a-z]/.test(password)) score += 1;

    // Проверка наличия заглавных букв
    if (/[A-Z]/.test(password)) score += 1;

    // Проверка наличия специальных символов
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    // Определение сообщения о сложности
    if (score === 0) message = 'Weak';
    else if (score <= 2) message = 'Weak';
    else if (score <= 4) message = 'Medium';
    else if (score <= 5) message = 'Good';
    else message = 'Excellent';

    return { score, message };
  };

  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(checkPasswordStrength(formData.password));
    } else {
      setPasswordStrength({ score: 0, message: '' });
    }
  }, [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength.score < 3) {
      setError('Password is too weak. Please use a stronger password.');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Сохраняем данные пользователя в куки
        const userData = {
          userId: data.user.id,
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          smartCoins: data.user.smartCoins || 0,
          createdAt: data.user.createdAt
        };
        setCookie('user', JSON.stringify(userData), {
          maxAge: 30 * 24 * 60 * 60, // 30 дней
          path: '/'
        });
        router.push('/user/Myaccount');
      } else {
        setError(data.message || 'An error occurred during registration');
      }
    } catch (err) {
      setError('An error occurred during registration');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStrengthColor = (score: number) => {
    if (score <= 2) return '#ff4444';
    if (score <= 4) return '#ffbb33';
    return '#00C851';
  };

  return (
    <>
      <Header />
      <CategoriesSection />
      <div className={styles.container}>
        <div className={styles.registerBox}>
          <h1 className={styles.title}>Create an account</h1>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.nameFields}>
              <div className={styles.inputGroup}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Enter your first name"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

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
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                minLength={8}
              />
              {formData.password && (
                <div className={styles.passwordStrength}>
                  <div className={styles.strengthBar}>
                    <div 
                      className={styles.strengthFill}
                      style={{ 
                        width: `${(passwordStrength.score / 6) * 100}%`,
                        backgroundColor: getStrengthColor(passwordStrength.score)
                      }}
                    />
                  </div>
                  <span style={{ color: getStrengthColor(passwordStrength.score) }}>
                    {passwordStrength.message}
                  </span>
                  <div className={styles.passwordRequirements}>
                    <p>Password must contain:</p>
                    <ul>
                      <li className={formData.password.length >= 8 ? styles.requirementMet : ''}>
                        At least 8 characters
                      </li>
                      <li className={/[A-Z]/.test(formData.password) ? styles.requirementMet : ''}>
                        At least one uppercase letter
                      </li>
                      <li className={/[a-z]/.test(formData.password) ? styles.requirementMet : ''}>
                        At least one lowercase letter
                      </li>
                      <li className={/\d/.test(formData.password) ? styles.requirementMet : ''}>
                        At least one number
                      </li>
                      <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? styles.requirementMet : ''}>
                        At least one special character
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="Confirm your password"
                minLength={8}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Create Account
            </button>
          </form>

          <div className={styles.links}>
            <span>Already have an account?</span>
            <a href="/user/login" className={styles.link}>
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 