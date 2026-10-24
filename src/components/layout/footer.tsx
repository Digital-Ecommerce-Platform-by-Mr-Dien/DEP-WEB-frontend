import React from "react";
import Link from "next/link";
import { ShoppingBag, Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw, Headphones } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      {/* Value Propositions / Trust Badges */}
      <div className="border-b border-slate-800 py-10 bg-slate-950/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Giao hàng hỏa tốc</h4>
                <p className="text-xs text-slate-400 mt-0.5">Nhận hàng trong 2h tại TP.HCM & HN</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Chính hãng 100%</h4>
                <p className="text-xs text-slate-400 mt-0.5">Bảo hành 12-24 tháng chính hãng</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Đổi trả dễ dàng</h4>
                <p className="text-xs text-slate-400 mt-0.5">1 đổi 1 trong 30 ngày nếu lỗi NSX</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Hỗ trợ 24/7</h4>
                <p className="text-xs text-slate-400 mt-0.5">Hotline giải đáp thắc mắc mọi lúc</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-600/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {SITE_CONFIG.description}
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Hotline: {SITE_CONFIG.hotline} (Miễn phí)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Email: {SITE_CONFIG.supportEmail}</span>
              </div>
            </div>
          </div>

          {/* Column: Danh mục nổi bật */}
          <div>
            <h5 className="font-semibold text-white text-sm tracking-wide mb-4">
              Danh mục nổi bật
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/products?category=dien-thoai" className="hover:text-white transition-colors">
                  Điện thoại & Tablet
                </Link>
              </li>
              <li>
                <Link href="/products?category=laptop" className="hover:text-white transition-colors">
                  Laptop & Máy tính
                </Link>
              </li>
              <li>
                <Link href="/products?category=am-thanh" className="hover:text-white transition-colors">
                  Tai nghe & Âm thanh
                </Link>
              </li>
              <li>
                <Link href="/products?category=dong-ho" className="hover:text-white transition-colors">
                  Đồng hồ thông minh
                </Link>
              </li>
              <li>
                <Link href="/products?category=phu-kien" className="hover:text-white transition-colors">
                  Phụ kiện & Gaming Gear
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Chăm sóc khách hàng */}
          <div>
            <h5 className="font-semibold text-white text-sm tracking-wide mb-4">
              Chăm sóc khách hàng
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Phương thức thanh toán
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Tra cứu đơn hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Bản tin ưu đãi */}
          <div>
            <h5 className="font-semibold text-white text-sm tracking-wide mb-4">
              Đăng ký nhận tin
            </h5>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Nhận voucher 100K cho đơn hàng đầu tiên cùng thông tin ưu đãi mới nhất.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="w-full h-10 px-3.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
              />
              <button className="w-full h-10 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs transition-colors shadow-md">
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. Tất cả quyền được bảo lưu. Thiết kế cho nền tảng thương mại điện tử.</p>
      </div>
    </footer>
  );
}
