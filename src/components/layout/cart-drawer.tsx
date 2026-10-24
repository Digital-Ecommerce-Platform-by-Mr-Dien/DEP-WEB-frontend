"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { isCartOpen, closeCart, items, removeItem, updateQuantity, summary } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slideInRight">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-600" />
              <h2 className="text-lg font-bold text-slate-900">Giỏ hàng của bạn</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-semibold">
                {summary.totalItems}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">
                  Giỏ hàng chưa có sản phẩm nào
                </h3>
                <p className="text-sm text-slate-500 max-w-xs mb-6">
                  Khám phá các sản phẩm công nghệ hot và thêm vào giỏ hàng ngay hôm nay!
                </p>
                <Button onClick={closeCart} variant="outline" size="md">
                  Tiếp tục mua sắm
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-0.5"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.product.category.name}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-bold text-brand-600">
                        {formatCurrency(item.unitPrice)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center rounded-lg border border-slate-200 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-brand-600 transition-colors disabled:opacity-40"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-brand-600 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="border-t border-slate-100 p-6 bg-slate-50/60 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Tạm tính</span>
                  <span className="font-medium text-slate-900">
                    {formatCurrency(summary.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Phí vận chuyển</span>
                  <span>
                    {summary.shippingFee === 0 ? (
                      <span className="text-emerald-600 font-medium">Miễn phí</span>
                    ) : (
                      formatCurrency(summary.shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Tổng thanh toán</span>
                  <span className="text-brand-600">{formatCurrency(summary.total)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link href="/checkout" onClick={closeCart} className="block w-full">
                  <Button className="w-full gap-2 shadow-lg shadow-brand-500/25" size="lg">
                    Tiến hành thanh toán
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/cart" onClick={closeCart} className="block w-full">
                  <Button variant="ghost" className="w-full text-slate-600" size="md">
                    Xem chi tiết giỏ hàng
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
