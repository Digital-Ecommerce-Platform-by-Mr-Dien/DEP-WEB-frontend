"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, User, Menu, X, Sparkles, Heart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { SITE_CONFIG, NAVIGATION_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const router = useRouter();
  const { summary, toggleCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white text-xs py-1.5 px-4 text-center font-medium">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
          Miễn phí vận chuyển toàn quốc cho đơn hàng từ 1.000.000₫ • Mã giảm 50K: <b>DIGINEW</b>
        </span>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-18 items-center justify-between gap-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/30 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                {SITE_CONFIG.name}
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-brand-600 -mt-1">
                Store
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-lg mx-6 relative items-center"
          >
            <input
              type="text"
              placeholder="Tìm kiếm điện thoại, laptop, tai nghe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-24 rounded-full border border-slate-200 bg-slate-50/70 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1.5 h-8 px-4 rounded-full bg-brand-600 text-white text-xs font-medium hover:bg-brand-700 transition-colors"
            >
              Tìm kiếm
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Link
              href="/products?favorites=true"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:text-rose-600 hover:bg-slate-100 transition-colors"
              title="Yêu thích"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <Link
              href="/auth/login"
              className="flex h-10 items-center gap-2 px-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors text-sm font-medium"
            >
              <User className="w-5 h-5 text-slate-500" />
              <span className="hidden lg:inline">Tài khoản</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative flex h-11 items-center gap-2.5 px-4 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-medium text-sm transition-colors"
              aria-label="Xem giỏ hàng"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-brand-600" />
                {summary.totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white shadow-sm ring-2 ring-white">
                    {summary.totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-semibold">Giỏ hàng</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden md:flex items-center gap-8 border-t border-slate-100 py-2.5 text-sm font-medium text-slate-600">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-brand-600 transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          <div className="flex flex-col space-y-2">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-slate-700 font-medium hover:text-brand-600 border-b border-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
