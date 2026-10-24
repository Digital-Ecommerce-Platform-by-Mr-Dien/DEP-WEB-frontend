"use client";

import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/types/product";
import { formatCurrency, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { Badge } from "@/components/ui/badge";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const discount = product.discountPercent || (product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : 0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-subtle hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      {/* Badges & Wishlist */}
      <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {discount > 0 && (
            <span className="rounded-lg bg-rose-500 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
              -{discount}%
            </span>
          )}
          {product.isNewArrival && (
            <Badge variant="primary" className="text-[10px] py-0">
              Mới
            </Badge>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="pointer-events-auto h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white transition-colors"
          title="Thêm vào yêu thích"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnail */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden rounded-xl bg-slate-100"
      >
        <img
          src={product.thumbnail}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Product Content */}
      <div className="flex flex-1 flex-col pt-3.5">
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          {product.category.name}
        </span>

        <Link
          href={`/products/${product.slug}`}
          className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900 group-hover:text-brand-600 transition-colors"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Rating & Review */}
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="ml-1 font-semibold text-slate-700">{product.rating}</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">({product.reviewCount} đánh giá)</span>
        </div>

        {/* Price & Action Button */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-slate-100">
          <div>
            <div className="text-base font-bold text-brand-600">
              {formatCurrency(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-slate-400 line-through">
                {formatCurrency(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-brand-600 transition-all shadow-sm active:scale-95 group/btn"
            title="Thêm vào giỏ hàng"
          >
            <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          </button>
        </div>
      </div>
    </div>
  );
}
