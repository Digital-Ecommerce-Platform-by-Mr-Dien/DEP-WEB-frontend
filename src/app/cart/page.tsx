"use client";

import React from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, summary, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Giỏ hàng của bạn đang trống</h1>
        <p className="text-sm text-slate-500 mb-8">
          Hãy dạo quanh cửa hàng và chọn cho mình những món đồ công nghệ ưng ý nhất nhé!
        </p>
        <Link href="/products">
          <Button size="lg" className="w-full">
            Khám phá sản phẩm ngay
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Giỏ hàng ({summary.totalItems})</h1>
          <p className="text-xs text-slate-500 mt-1">Kiểm tra lại sản phẩm trước khi thanh toán</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-slate-500 hover:text-rose-600 transition-colors"
        >
          Xóa toàn bộ giỏ hàng
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 bg-white shadow-subtle hover:shadow-card transition-all"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-brand-600 uppercase">
                    {item.product.category.name}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">
                    {item.product.name}
                  </h3>
                  <div className="text-sm font-bold text-brand-600 mt-1 sm:hidden">
                    {formatCurrency(item.unitPrice)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8">
                {/* Desktop Price */}
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-bold text-slate-900">
                    {formatCurrency(item.unitPrice)}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-1 hover:text-brand-600 disabled:opacity-40"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:text-brand-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Total per line */}
                <div className="text-sm font-extrabold text-brand-600 min-w-24 text-right">
                  {formatCurrency(item.unitPrice * item.quantity)}
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  title="Xóa món này"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle space-y-6">
          <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
            Tóm tắt đơn hàng
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Tạm tính ({summary.totalItems} sản phẩm)</span>
              <span className="font-semibold text-slate-900">{formatCurrency(summary.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Phí vận chuyển</span>
              <span>
                {summary.shippingFee === 0 ? (
                  <span className="text-emerald-600 font-semibold">Miễn phí</span>
                ) : (
                  formatCurrency(summary.shippingFee)
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-3 border-t border-slate-200">
              <span>Tổng thanh toán</span>
              <span className="text-brand-600 text-lg">{formatCurrency(summary.total)}</span>
            </div>
          </div>

          <Link href="/checkout" className="block w-full">
            <Button size="lg" className="w-full gap-2 shadow-lg shadow-brand-500/25">
              <span>Tiến hành thanh toán</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Thanh toán an toàn & Bảo mật 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
