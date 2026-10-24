"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles, TrendingUp, Award } from "lucide-react";
import { HeroBanner } from "@/components/ecommerce/hero-banner";
import { CategoryCard } from "@/components/ecommerce/category-card";
import { ProductCard } from "@/components/ecommerce/product-card";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"all" | "featured" | "bestseller">("all");

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    if (activeTab === "featured") return product.isFeatured;
    if (activeTab === "bestseller") return product.isBestSeller;
    return true;
  });

  return (
    <div className="container mx-auto px-4 lg:px-8 space-y-16 pb-16">
      {/* 1. Hero Promotional Banner */}
      <HeroBanner />

      {/* 2. Danh mục nổi bật */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Khám phá danh mục</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Mua sắm theo nhu cầu
            </h2>
          </div>
          <Link
            href="/products"
            className="group flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>Tất cả danh mục</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {MOCK_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. Flash Sale / Giờ vàng giá sốc */}
      <section className="rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-200">
              <Flame className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">Flash Sale Hôm Nay</h2>
              <p className="text-xs sm:text-sm text-rose-100">
                Ưu đãi giảm tới 30% áp dụng trong 24 giờ tới
              </p>
            </div>
          </div>

          <Link href="/products?deals=true">
            <Button
              variant="secondary"
              className="bg-white text-rose-600 hover:bg-rose-50 shadow-md font-bold"
            >
              Xem tất cả Flash Sale
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PRODUCTS.slice(0, 3).map((product) => (
            <div key={product.id} className="text-slate-900">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Danh sách sản phẩm nổi bật với Tabs */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Sản phẩm tuyển chọn</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Sản phẩm thịnh hành
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "featured"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Nổi bật
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "bestseller"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Bán chạy
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center pt-6">
          <Link href="/products">
            <Button size="lg" variant="outline" className="px-8 font-semibold">
              Xem thêm sản phẩm
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 5. Khối cam kết thương hiệu */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm text-center max-w-4xl mx-auto space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-inner">
          <Award className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">
          Chất lượng được kiểm chứng & Cam kết 100% chính hãng
        </h3>
        <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
          Tất cả sản phẩm bán ra đều được niêm phong từ nhà sản xuất, bảo hành điện tử chính hãng và hỗ trợ đổi trả tận nhà trong 30 ngày.
        </p>
      </section>
    </div>
  );
}
