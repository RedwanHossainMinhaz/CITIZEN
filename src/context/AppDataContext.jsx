import { createContext, useContext, useEffect, useState } from 'react';
import { loadCollection, saveCollection, uid, clearAllData } from '../utils/storage';
import { SEED_USERS, SEED_POSTS, SEED_COMPLAINTS, SEED_SETTINGS } from '../data/seed';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [users, setUsers] = useState(() => loadCollection('users', SEED_USERS));
  const [posts, setPosts] = useState(() => loadCollection('posts', SEED_POSTS));
  const [complaints, setComplaints] = useState(() => loadCollection('complaints', SEED_COMPLAINTS));
  const [settings, setSettings] = useState(() => loadCollection('settings', SEED_SETTINGS));

  useEffect(() => saveCollection('users', users), [users]);
  useEffect(() => saveCollection('posts', posts), [posts]);
  useEffect(() => saveCollection('complaints', complaints), [complaints]);
  useEffect(() => saveCollection('settings', settings), [settings]);

  // ------------------------- USERS -------------------------
  function addUser(user) {
    const newUser = {
      id: uid('user'),
      role: 'user',
      banned: false,
      trustScore: 70,
      avatar: '',
      createdAt: new Date().toISOString(),
      ...user,
    };
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  }

  function updateUser(userId, patch) {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, ...patch } : u)));
  }

  function deleteUser(userId) {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    // Also strip their posts/complaints identity but keep records for transparency
    setPosts((prev) => prev.filter((p) => p.authorId !== userId));
    setComplaints((prev) => prev.filter((c) => c.userId !== userId));
  }

  function setUserBanned(userId, banned) {
    updateUser(userId, { banned });
  }

  // ------------------------- POSTS -------------------------
  function addPost(post) {
    const newPost = {
      id: uid('post'),
      upvotes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      ...post,
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  }

  function updatePost(postId, patch) {
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, ...patch } : p)));
  }

  function deletePost(postId) {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }

  // ------------------------- COMPLAINTS -------------------------
  function addComplaint(complaint) {
    const newComplaint = {
      id: `C-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Drafting',
      createdAt: new Date().toISOString(),
      ...complaint,
    };
    setComplaints((prev) => [newComplaint, ...prev]);
    return newComplaint;
  }

  function updateComplaint(complaintId, patch) {
    setComplaints((prev) => prev.map((c) => (c.id === complaintId ? { ...c, ...patch } : c)));
  }

  function deleteComplaint(complaintId) {
    setComplaints((prev) => prev.filter((c) => c.id !== complaintId));
  }

  // ------------------------- SETTINGS -------------------------
  function updateSettings(patch) {
    setSettings((prev) => ({ ...prev, ...patch }));
  }

  function resetDemoData() {
    clearAllData();
    setUsers(SEED_USERS);
    setPosts(SEED_POSTS);
    setComplaints(SEED_COMPLAINTS);
    setSettings(SEED_SETTINGS);
  }

  const value = {
    users,
    posts,
    complaints,
    settings,
    addUser,
    updateUser,
    deleteUser,
    setUserBanned,
    addPost,
    updatePost,
    deletePost,
    addComplaint,
    updateComplaint,
    deleteComplaint,
    updateSettings,
    resetDemoData,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within an AppDataProvider');
  return ctx;
}
