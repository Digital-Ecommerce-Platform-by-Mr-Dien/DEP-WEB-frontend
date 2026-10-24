"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, CreditCard, Truck, QrCode, ShieldCheck, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CheckoutPage() {
  const { items, summary, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "vnpay" | "momo" | "banking">("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState("");

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const code = `DIGI-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderCode(code);
      setOrderSuccess(true);
      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-lg text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Đặt hàng thành công!</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Cảm ơn bạn đã mua sắm tại DigiStore. Mã đơn hàng của bạn là{" "}
          <span className="font-bold text-brand-600">{orderCode}</span>. Chúng tôi sẽ liên hệ sớm nhất để xác nhận và giao hàng.
        </p>
        <div className="pt-4 flex flex-col gap-3">
          <Link href="/">
            <Button size="lg" className="w-full">
              Quay lại trang chủ
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="ghost" size="md" className="w-full">
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Không có sản phẩm để thanh toán</h2>
        <p className="text-sm text-slate-500 mb-6">Giỏ hàng của bạn đang rỗng.</p>
        <Link href="/products">
          <Button>Khám phá sản phẩm</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 space-y-8">
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại giỏ hàng</span>
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900">Thanh toán đơn hàng</h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Shipping & Payment Info */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Shipping Address */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-brand-600" />
              <span>1. Thông tin giao hàng</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Họ và tên người nhận *
                </label>
                <Input required placeholder="Nguyễn Văn A" defaultValue="Nguyễn Văn A" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Số điện thoại *
                </label>
                <Input required placeholder="0912 345 678" defaultValue="0987654321" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Tỉnh / Thành phố *
                </label>
                <Input required placeholder="TP. Hồ Chí Minh" defaultValue="TP. Hồ Chí Minh" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Quận / Huyện *
                </label>
                <Input required placeholder="Quận 1" defaultValue="Quận 1" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">
                Địa chỉ chi tiết (Số nhà, tên đường) *
              </label>
              <Input required placeholder="123 Nguyễn Huệ, P. Bến Nghé" defaultValue="123 Nguyễn Huệ" />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">
                Ghi chú cho shipper
              </label>
              <textarea
                rows={2}
                placeholder="Giao trong giờ hành chính..."
                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* 2. Payment Method */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-600" />
              <span>2. Phương thức thanh toán</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* COD */}
              <label
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "border-brand-500 bg-brand-50/50 shadow-sm"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-brand-600"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">COD</div>
                  <div className="text-[11px] text-slate-500">Thanh toán khi nhận hàng</div>
                </div>
              </label>

              {/* VNPAY */}
              <label
                onClick={() => setPaymentMethod("vnpay")}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "vnpay"
                    ? "border-brand-500 bg-brand-50/50 shadow-sm"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "vnpay"}
                  onChange={() => setPaymentMethod("vnpay")}
                  className="accent-brand-600"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">VNPAY QR</div>
                  <div className="text-[11px] text-slate-500">Quét mã VNPAY-QR / ATM</div>
                </div>
              </label>

              {/* MoMo */}
              <label
                onClick={() => setPaymentMethod("momo")}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "momo"
                    ? "border-brand-500 bg-brand-50/50 shadow-sm"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "momo"}
                  onChange={() => setPaymentMethod("momo")}
                  className="accent-brand-600"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Ví MoMo</div>
                  <div className="text-[11px] text-slate-500">Thanh toán qua ví MoMo</div>
                </div>
              </label>

              {/* Banking Transfer */}
              <label
                onClick={() => setPaymentMethod("banking")}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "banking"
                    ? "border-brand-500 bg-brand-50/50 shadow-sm"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "banking"}
                  onChange={() => setPaymentMethod("banking")}
                  className="accent-brand-600"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Chuyển khoản VietQR</div>
                  <div className="text-[11px] text-slate-500">Chuyển 24/7 tự động xác nhận</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle space-y-6">
          <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
            Chi tiết đơn hàng ({summary.totalItems} món)
          </h2>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-slate-800 line-clamp-1">{item.product.name}</p>
                    <p className="text-slate-400">SL: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-slate-900 shrink-0">
                  {formatCurrency(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Tạm tính</span>
              <span className="font-semibold text-slate-900">{formatCurrency(summary.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Vận chuyển</span>
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

          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="w-full shadow-lg shadow-brand-500/25"
          >
            {isSubmitting ? "Đang xử lý đơn hàng..." : "Hoàn tất đặt hàng"}
          </Button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Thông tin đặt hàng được mã hóa SSL 256-bit</span>
          </div>
        </div>
      </form>
    </div>
  );
}
