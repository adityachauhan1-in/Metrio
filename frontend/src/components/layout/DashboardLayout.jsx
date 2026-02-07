import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import { LogOut, ArrowLeft, ChevronDown } from "lucide-react";
import React from "react";

function Avatar({ name }) {
  const initial = name ? String(name).trim().charAt(0).toUpperCase() : "?";
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white"
      aria-hidden
    >
      {initial}
    </div>
  );
}

export default function DashboardLayout({ children, title, backHref, backLabel = "Dashboard" }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const displayName = user?.name || (user?.role === "admin" ? "Admin" : "User");
  const roleLabel = user?.role === "admin" ? "Admin" : "User";

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            {backHref && (
              <button
                type="button"
                onClick={() => navigate(backHref)}
                className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft size={18} /> {backLabel}
              </button>
            )}
            <h1 className="text-xl font-semibold text-slate-900">
              {title ?? "Metrio"}
            </h1>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((o) => !o)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
              aria-expanded={profileOpen}
              aria-haspopup="true"
            >
              <Avatar name={displayName} />
              <span className="hidden text-sm font-medium text-slate-800 sm:inline">{displayName}</span>
              <ChevronDown size={16} className="text-slate-500" />
            </button>

            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  aria-hidden="true"
                  onClick={() => setProfileOpen(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-1 w-56 rounded-lg border border-slate-200 bg-white py-2 shadow-lg">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={displayName} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">{displayName}</p>
                        {user?.email && (
                          <p className="truncate text-xs text-slate-500">{user.email}</p>
                        )}
                        <p className="text-xs font-medium capitalize text-slate-600">{roleLabel}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-2 py-1">
                    <Button
                      variant="outline"
                      className="w-full justify-center gap-2 border-red-200 text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} /> Logout
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
