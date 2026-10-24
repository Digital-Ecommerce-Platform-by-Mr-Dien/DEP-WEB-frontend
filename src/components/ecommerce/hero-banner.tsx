import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-brand-950 to-slate-900 text-white p-6 sm:p-10 lg:p-14 shadow-2xl my-6">
      {/* Background Decorative Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Headlines & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: "3s" }} />
            <span>Nền tảng Thương mại Điện tử Kỹ thuật số 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Nâng tầm trải nghiệm <br />
            <span className="text-gradient from-brand-400 via-indigo-300 to-pink-400">
              Công nghệ đỉnh cao
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Khám phá hàng ngàn thiết bị số chính hãng từ Apple, Sony, Dell, Samsung. Cam kết 100% hàng thật, bảo hành toàn diện và giao nhanh 2 giờ.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/products">
              <Button size="lg" className="shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50">
                Khám phá ngay
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/products?deals=true">
              <Button variant="outline" size="lg" className="border-slate-700 text-white hover:bg-white/10 hover:border-slate-500">
                Ưu đãi chớp nhoáng
              </Button>
            </Link>
          </div>

          {/* Quick Trust Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Chính hãng 100%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Giao siêu tốc 2H</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
              <span>Đổi trả 30 ngày</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md rounded-2xl glass-card-dark p-6 shadow-2xl border border-white/10 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute top-4 right-4 rounded-full bg-rose-500/90 text-white text-xs font-bold px-3 py-1 shadow-md">
              Giảm 25%
            </div>

            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden mb-4 bg-slate-800/60 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                alt="Tai nghe chống ồn Pro"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-brand-400">
                Sản phẩm nổi bật tuần
              </span>
              <h3 className="text-lg font-bold text-white">
                Tai nghe Không dây ANC Hi-Res Pro
              </h3>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs text-slate-400 block">Giá ưu đãi hôm nay:</span>
                  <span className="text-xl font-extrabold text-amber-400">3.490.000₫</span>
                </div>
                <Link href="/products/tai-nghe-chong-on-active-pro-x">
                  <Button size="sm" variant="primary" className="rounded-lg">
                    Mua ngay
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
