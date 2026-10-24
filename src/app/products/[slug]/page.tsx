"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ShieldCheck, Truck, RefreshCw, ShoppingCart, Heart, ArrowLeft, Check, Sparkles } from "lucide-react";
import { productService } from "@/services/product.service";
import { formatCurrency, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ecommerce/product-card";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const product = MOCK_PRODUCTS.find((p) => p.slug === resolvedParams.slug) || MOCK_PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  const { addItem } = useCart();

  if (!product) {
    notFound();
  }

  const discount = product.discountPercent || (product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category.slug === product.category.slug
  ).slice(0, 4);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-brand-600">Sản phẩm</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category.slug}`} className="hover:text-brand-600">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold line-clamp-1">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-subtle flex items-center justify-center p-4">
            {discount > 0 && (
              <span className="absolute top-4 left-4 z-10 rounded-xl bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                Giảm {discount}%
              </span>
            )}
            <img
              src={selectedImage}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all p-1 bg-white ${
                    selectedImage === img ? "border-brand-600 ring-2 ring-brand-500/20" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover rounded-xl" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Purchase Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <Badge variant="primary" className="mb-2">
              {product.category.name}
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Ratings & SKU */}
            <div className="mt-3 flex items-center gap-3 text-xs">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="ml-1 font-bold text-slate-800">{product.rating}</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">{product.reviewCount} lượt đánh giá hài lòng</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Còn {product.stock} sản phẩm
              </span>
            </div>
          </div>

          {/* Price Tag */}
          <div className="rounded-2xl bg-brand-50/50 p-4 border border-brand-100 flex items-baseline gap-3">
            <span className="text-3xl font-black text-brand-600">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-base text-slate-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Short description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity & CTA */}
          <div className="pt-2 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase text-slate-500">Số lượng:</span>
              <div className="flex items-center rounded-xl border border-slate-200 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-600 hover:text-brand-600 disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-slate-600 hover:text-brand-600"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 gap-2 shadow-lg shadow-brand-500/25"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Thêm vào giỏ hàng</span>
              </Button>
              <Link href="/checkout" onClick={handleAddToCart} className="flex-1">
                <Button size="lg" variant="secondary" className="w-full bg-slate-900 text-white hover:bg-slate-800">
                  Mua ngay
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Truck className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Giao hàng toàn quốc</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Chính hãng 100%</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <RefreshCw className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Đổi trả 30 ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Specs, Reviews */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex gap-4 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab("desc")}
            className={`text-sm font-bold pb-2 border-b-2 transition-all ${
              activeTab === "desc"
                ? "border-brand-600 text-brand-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Mô tả chi tiết
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`text-sm font-bold pb-2 border-b-2 transition-all ${
              activeTab === "specs"
                ? "border-brand-600 text-brand-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Thông số kỹ thuật
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`text-sm font-bold pb-2 border-b-2 transition-all ${
              activeTab === "reviews"
                ? "border-brand-600 text-brand-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Đánh giá ({product.reviewCount})
          </button>
        </div>

        {activeTab === "desc" && (
          <div className="text-sm text-slate-600 leading-relaxed space-y-4 max-w-3xl">
            <p>{product.description}</p>
            <p>
              Sản phẩm được nhập khẩu và phân phối chính thức, đi kèm đầy đủ phụ kiện theo tiêu chuẩn nhà máy, sách hướng dẫn sử dụng và thẻ bảo hành điện tử chính hãng.
            </p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="text-xs text-slate-700 divide-y divide-slate-100 max-w-lg">
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Thương hiệu</span>
              <span className="font-semibold">DigiStore Pro</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Danh mục</span>
              <span className="font-semibold">{product.category.name}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Bảo hành</span>
              <span className="font-semibold">12 tháng chính hãng</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Tình trạng</span>
              <span className="font-semibold text-emerald-600">Mới 100% nguyên seal</span>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4 max-w-2xl text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Trần Minh Quân</span>
                <span className="text-slate-400">2 ngày trước</span>
              </div>
              <div className="flex text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <p className="text-slate-600">Sản phẩm rất tốt, giao hàng cực nhanh, đóng gói cẩn thận 5 sao!</p>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-extrabold text-slate-900">Sản phẩm tương tự</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
