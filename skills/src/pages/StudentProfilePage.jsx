import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DashboardSquare01Icon,
  Mortarboard01Icon,
  Layers01Icon,
  UserCircleIcon,
  CheckmarkCircle02Icon,
  SecurityLockIcon,
  LockPasswordIcon,
  Key01Icon,
  Mail01Icon,
  Call02Icon,
  Location01Icon,
  Book02Icon,
  Logout01Icon,
  Comment01Icon,
  SparklesIcon,
  AlertCircleIcon,
  ViewIcon,
  ViewOffIcon,
} from 'hugeicons-react';
import { getCurrentUser, logout, updateProfile, changePassword } from '../lib/auth';
import { getActiveEnrollments } from '../lib/payments';

export default function StudentProfilePage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [enrollments, setEnrollments] = useState(getActiveEnrollments());
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'security', 'enrollments'

  // Profile Form State
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Harpreet Singh',
    email: currentUser?.email || 'harpreet@example.com',
    phone: currentUser?.phone || '+91 98765 43210',
    city: currentUser?.city || 'Ludhiana, Punjab',
    bio: currentUser?.bio || 'Passionate UI/UX Designer & Product Thinker learning Figma systems.',
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setFormData({
        name: user.name || 'Harpreet Singh',
        email: user.email || 'harpreet@example.com',
        phone: user.phone || '+91 98765 43210',
        city: user.city || 'Ludhiana, Punjab',
        bio: user.bio || 'Passionate UI/UX Designer & Product Thinker learning Figma systems.',
      });
    }
    setEnrollments(getActiveEnrollments());
  }, []);

  const getInitials = (name) => {
    if (!name) return 'ST';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const updated = await updateProfile(formData);
      setCurrentUser(updated);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      alert(err.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (!passwordData.newPassword || passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    setSavingPassword(true);
    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordSuccess(true);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordSuccess(false), 3500);
    } catch (err) {
      setPasswordError(err.message || 'Failed to change password. Please check current password.');
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const inputClass =
    'w-full bg-[#181a24] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#0bc40e] focus:ring-1 focus:ring-[#0bc40e]/30 transition-all';

  return (
    <div className="min-h-screen bg-[#0c0e15] text-slate-100 font-sans pb-24 selection:bg-[#0bc40e] selection:text-black">
      {/* Sub-navigation Header Bar */}
      <div className="border-b border-white/10 bg-[#0f111a]/80 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Sub-nav Links */}
            <nav className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none text-xs font-semibold pt-3">
              <Link
                to="/dashboard"
                className="pb-3 text-[#a1a1aa] hover:text-white transition-all relative flex items-center gap-1.5"
              >
                <DashboardSquare01Icon className="w-3.5 h-3.5 text-[#71717a]" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/my-learning"
                className="pb-3 text-[#a1a1aa] hover:text-white transition-all relative flex items-center gap-1.5"
              >
                <Mortarboard01Icon className="w-3.5 h-3.5 text-[#71717a]" />
                <span>My Learning</span>
                <span className="px-1.5 py-0.2 bg-white/10 text-slate-200 border border-white/10 rounded-full text-[10px] font-bold">
                  {enrollments.length > 0 ? `${enrollments.length + 1} Batches` : '2 Batches'}
                </span>
              </Link>

              <Link
                to="/courses"
                className="pb-3 text-[#a1a1aa] hover:text-white transition-all relative flex items-center gap-1.5"
              >
                <Layers01Icon className="w-3.5 h-3.5 text-[#71717a]" />
                <span>Browse Courses</span>
              </Link>

              <Link
                to="/profile"
                className="pb-3 text-white font-bold transition-all relative flex items-center gap-1.5"
              >
                <UserCircleIcon className="w-3.5 h-3.5 text-[#0bc40e]" />
                <span>Student Profile</span>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0bc40e] rounded-full shadow-xs shadow-[#0bc40e]/40"></div>
              </Link>
            </nav>

            {/* Quick Profile Actions */}
            <div className="flex items-center pb-2 sm:pb-0 gap-3 sm:self-center">
              <span className="text-sm text-[#9ca3af] hidden sm:inline-block font-normal">
                Signed in as <strong className="text-white font-semibold">{formData.name || 'Mehak'}</strong>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-full bg-[#3b1219]/70 hover:bg-[#4c1620] border border-rose-500/30 hover:border-rose-500/50 text-rose-300 hover:text-rose-200 text-sm font-medium flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <Logout01Icon className="w-4 h-4 text-rose-400" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Top Profile Header Banner */}
        <section className="bg-gradient-to-r from-[#13151f] via-[#151824] to-[#13151f] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar Circle */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0bc40e] to-emerald-700 text-black font-black text-2xl flex items-center justify-center shadow-lg shadow-[#0bc40e]/25 shrink-0">
              {getInitials(formData.name)}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {formData.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#0bc40e]/15 border border-[#0bc40e]/30 text-[#0bc40e] text-[11px] font-bold">
                  ✓ Active Student
                </span>
              </div>
              <p className="text-xs text-[#a1a1aa] flex items-center gap-2">
                <span>{formData.email}</span>
                <span>•</span>
                <span>{formData.city}</span>
              </p>
              <p className="text-xs text-[#71717a] pt-1">
                Student Account Access • Lifetime Learning Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/my-learning"
              className="flex-1 sm:flex-none text-center px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95"
            >
              Open Classroom Hub
            </Link>
          </div>
        </section>

        {/* Tab Selection Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'bg-[#13151f] border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-[#181a24]'
            }`}
          >
            <UserCircleIcon className="w-4 h-4" />
            <span>Basic Details</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'security'
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'bg-[#13151f] border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-[#181a24]'
            }`}
          >
            <SecurityLockIcon className="w-4 h-4" />
            <span>Password & Security</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('enrollments')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'enrollments'
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'bg-[#13151f] border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-[#181a24]'
            }`}
          >
            <Book02Icon className="w-4 h-4" />
            <span>My Enrolled Courses</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === 'enrollments'
                  ? 'bg-slate-200 text-slate-900 font-bold'
                  : 'bg-black/40 text-[#71717a]'
              }`}
            >
              {enrollments.length > 0 ? enrollments.length : 2}
            </span>
          </button>
        </div>

        {/* TAB 1: BASIC DETAILS FORM */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#13151f] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Personal Information
                </h2>
                <p className="text-xs text-[#71717a] mt-0.5">
                  Update your contact details and student profile credentials.
                </p>
              </div>

              {profileSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
                  <CheckmarkCircle02Icon className="w-4 h-4 shrink-0" />
                  <span>Your profile details have been saved successfully!</span>
                </div>
              )}

              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#a1a1aa] flex items-center gap-1.5">
                      <UserCircleIcon className="w-3.5 h-3.5 text-[#71717a]" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Harpreet Singh"
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#a1a1aa] flex items-center gap-1.5">
                      <Mail01Icon className="w-3.5 h-3.5 text-[#71717a]" />
                      <span>Email Address</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. student@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#a1a1aa] flex items-center gap-1.5">
                      <Call02Icon className="w-3.5 h-3.5 text-[#71717a]" />
                      <span>Phone / WhatsApp Number</span>
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#a1a1aa] flex items-center gap-1.5">
                      <Location01Icon className="w-3.5 h-3.5 text-[#71717a]" />
                      <span>City / State</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Ludhiana, Punjab"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#a1a1aa] flex items-center gap-1.5">
                    <Comment01Icon className="w-3.5 h-3.5 text-[#71717a]" />
                    <span>Learning Bio / Goals</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us what you're aiming to master in design..."
                    className={inputClass}
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-[#71717a]">
                    Changes will reflect instantly across your student hub.
                  </span>
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="px-5 py-2.5 rounded-xl bg-[#0bc40e] hover:bg-emerald-600 text-black font-bold text-xs transition-all shadow-md shadow-[#0bc40e]/20 disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    {savingProfile ? (
                      <span>Saving...</span>
                    ) : (
                      <>
                        <CheckmarkCircle02Icon className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Side Info Cards */}
            <div className="space-y-5">
              <div className="bg-[#13151f] rounded-3xl border border-white/10 p-6 space-y-4 shadow-xl">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <SparklesIcon className="w-4 h-4 text-[#0bc40e]" />
                  <span>Student Status</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-[#a1a1aa]">Account Type:</span>
                    <strong className="text-white">Full Lifetime Access</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-[#a1a1aa]">Status:</span>
                    <span className="text-[#0bc40e] font-semibold">● Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#a1a1aa]">Live Cohorts:</span>
                    <strong className="text-white">
                      {enrollments.length > 0 ? `${enrollments.length + 1} Batches` : '2 Batches'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Mentor Help */}
              <div className="bg-[#13151f] rounded-3xl border border-white/10 p-6 space-y-3.5 shadow-xl">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Comment01Icon className="w-4 h-4 text-emerald-400" />
                  <span>Need Support?</span>
                </h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Have questions about your cohort, recordings, or billing? Reach out directly.
                </p>
                <a
                  href="https://wa.me/919999999999?text=Hi%20Mentor,%20I%20need%20help%20with%20my%20student%20profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#181a24] hover:bg-[#232736] text-white border border-white/10 font-semibold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Comment01Icon className="w-4 h-4 text-[#0bc40e]" />
                  <span>WhatsApp Mentor Help</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SECURITY & PASSWORD FORM */}
        {activeTab === 'security' && (
          <div className="max-w-2xl bg-[#13151f] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <SecurityLockIcon className="w-5 h-5 text-[#0bc40e]" />
                <span>Change Password</span>
              </h2>
              <p className="text-xs text-[#71717a] mt-0.5">
                Ensure your student account is using a secure, strong password.
              </p>
            </div>

            {passwordSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
                <CheckmarkCircle02Icon className="w-4 h-4 shrink-0" />
                <span>Password updated successfully! Please remember your new password.</span>
              </div>
            )}

            {passwordError && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2">
                <AlertCircleIcon className="w-4 h-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#a1a1aa] flex items-center gap-1.5">
                  <SecurityLockIcon className="w-3.5 h-3.5 text-[#71717a]" />
                  <span>Current Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    placeholder="Enter your current password"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-white"
                  >
                    {showPasswords ? (
                      <ViewOffIcon className="w-4 h-4" />
                    ) : (
                      <ViewIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#a1a1aa] flex items-center gap-1.5">
                    <Key01Icon className="w-3.5 h-3.5 text-[#71717a]" />
                    <span>New Password</span>
                  </label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    required
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    placeholder="Min 6 characters"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#a1a1aa] flex items-center gap-1.5">
                    <LockPasswordIcon className="w-3.5 h-3.5 text-[#71717a]" />
                    <span>Confirm New Password</span>
                  </label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    placeholder="Repeat new password"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <span className="text-[11px] text-[#71717a]">
                  Never share your password with anyone.
                </span>
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs transition-all shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {savingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: ENROLLED COURSES & INVOICES */}
        {activeTab === 'enrollments' && (
          <div className="bg-[#13151f] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Book02Icon className="w-5 h-5 text-[#0bc40e]" />
                <span>My Purchased Courses & Cohort Batches</span>
              </h2>
              <p className="text-xs text-[#71717a] mt-0.5">
                All learning tracks and live interactive cohorts activated under your account.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Default Course 1 */}
              <div className="p-5 rounded-2xl bg-[#181a24] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Live Batch • Active
                  </span>
                  <span className="text-xs text-white font-bold">₹2,999</span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  UI/UX Design Masterclass — Next-Gen UI with AI
                </h4>
                <p className="text-xs text-[#71717a]">
                  Batch #04 (Evening) • Mentor: Harpreet Singh
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs text-[#a1a1aa]">
                  <span>Access: Lifetime Access</span>
                  <Link
                    to="/my-learning"
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    Open Hub →
                  </Link>
                </div>
              </div>

              {/* Default Course 2 */}
              <div className="p-5 rounded-2xl bg-[#181a24] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Weekend Batch • Active
                  </span>
                  <span className="text-xs text-white font-bold">₹2,999</span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  Graphic Design & AI Mastery
                </h4>
                <p className="text-xs text-[#71717a]">
                  Batch #02 (Weekend) • Mentor: Harpreet Singh
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs text-[#a1a1aa]">
                  <span>Access: Lifetime Access</span>
                  <Link
                    to="/my-learning"
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    Open Hub →
                  </Link>
                </div>
              </div>

              {/* Real Paid Enrollments from local storage */}
              {enrollments.map((enr, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#181a24] border border-[#0bc40e]/30 space-y-3 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#0bc40e] bg-[#0bc40e]/15 px-2 py-0.5 rounded border border-[#0bc40e]/30">
                      Paid &amp; Enrolled ({enr.classMode?.toUpperCase() || 'ONLINE'})
                    </span>
                    <span className="text-xs text-white font-bold">
                      ₹{enr.amount || 2999}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {enr.courseTitle || enr.courseSlug}
                  </h4>
                  <p className="text-xs text-[#71717a]">
                    Enrolled on:{' '}
                    {enr.enrolledAt
                      ? new Date(enr.enrolledAt).toLocaleDateString()
                      : 'Recent'}
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs text-[#a1a1aa]">
                    <span>Access: Active</span>
                    <Link
                      to="/my-learning"
                      className="text-emerald-400 font-semibold hover:underline"
                    >
                      Open Hub →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
