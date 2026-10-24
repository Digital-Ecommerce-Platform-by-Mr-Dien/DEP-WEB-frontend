"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, Grid3X3, ArrowUpDown } from "lucide-react";
import { ProductCard } from "@/components/ecommerce/product-card";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mock-data";
import { SORT_OPTIONS } from "@/lib/constants";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSort, setSelectedSort] = useState<string>("newest");
  const [priceRange, setPriceRange] = useState<number>(35000000);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory && product.category.slug !== selectedCategory) {
        return false;
      }
      // Search filter
      if (
        initialSearch &&
        !product.name.toLowerCase().includes(initialSearch.toLowerCase())
      ) {
        return false;
      }
      // Price filter
      if (product.price > priceRange) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (selectedSort === "price-asc") return a.price - b.price;
      if (selectedSort === "price-desc") return b.price - a.price;
      if (selectedSort === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, initialSearch, priceRange, selectedSort]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {initialSearch
            ? `Kết quả tìm kiếm cho "${initialSearch}"`
            : "Tất cả sản phẩm công nghệ"}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Tìm thấy {filteredProducts.length} sản phẩm phù hợp với nhu cầu của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-6 shadow-subtle">
            <div className="flex items-center gap-2 font-bold text-slate-900 pb-3 border-b border-slate-100">
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              <span>Bộ lọc tìm kiếm</span>
            </div>

            {/* Category filter */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Danh mục
              </label>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === ""
                      ? "bg-brand-50 text-brand-700 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Tất cả danh mục
                </button>
                {MOCK_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? "bg-brand-50 text-brand-700 font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-400">({cat.itemCount})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price filter */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Mức giá tối đa</span>
                <span className="text-brand-600 font-extrabold">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(priceRange)}
                </span>
              </div>
              <input
                type="range"
                min={1000000}
                max={35000000}
                step={500000}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-brand-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>1 triệu</span>
                <span>35 triệu</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid Content */}
        <main className="lg:col-span-3 space-y-6">
          {/* Sorting toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 border border-slate-200 shadow-subtle">
            <div className="text-xs font-medium text-slate-600">
              Hiển thị <span className="font-bold text-slate-900">{filteredProducts.length}</span> sản phẩm
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">Sắp xếp:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="h-9 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Grid or Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-3">
              <p className="text-base font-semibold text-slate-800">
                Không tìm thấy sản phẩm phù hợp
              </p>
              <p className="text-xs text-slate-500">
                Hãy thử nới lỏng bộ lọc hoặc tìm kiếm với từ khóa khác
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center text-sm text-slate-500">Đang tải sản phẩm...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
