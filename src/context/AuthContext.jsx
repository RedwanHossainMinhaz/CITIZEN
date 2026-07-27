import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { loadCollection, saveCollection } from '../utils/storage';
import { useAppData } from './AppDataContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { users, addUser } = useAppData();
  const [currentUserId, setCurrentUserId] = useState(() => loadCollection('session', null));

  useEffect(() => saveCollection('session', currentUserId), [currentUserId]);

  const currentUser = users.find((u) => u.id === currentUserId) || null;

  function login(email, password) {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: 'Incorrect email or password.' };
    if (found.banned) return { ok: false, error: 'This account has been suspended by an administrator.' };
    setCurrentUserId(found.id);
    return { ok: true, user: found };
  }

  function loginAsAdmin(email, password) {
    const result = login(email, password);
    if (!result.ok) return result;
    if (result.user.role !== 'admin') {
      setCurrentUserId(null);
      return { ok: false, error: 'This account does not have admin access.' };
    }
    return result;
  }

  function signup({ name, email, password, ward, nid }) {
    const exists = users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (exists) return { ok: false, error: 'An account with this email already exists.' };
    const user = addUser({ name, email: email.trim().toLowerCase(), password, ward, nid, role: 'user' });
    setCurrentUserId(user.id);
    return { ok: true, user };
  }

  function logout() {
    setCurrentUserId(null);
  }

  const value = { currentUser, login, loginAsAdmin, signup, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
