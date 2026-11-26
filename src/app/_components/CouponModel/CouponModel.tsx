
"use client";

import { useState } from "react";

type CouponModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (couponCode: string) => void;
};

export default function CouponModel({
  isOpen,
  onClose,
  onApply,
}: CouponModalProps) {
  const [couponName, setCouponName] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setCouponName("");
    onClose();
  };

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!couponName.trim()) return;

  onApply(couponName.trim());
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#101828]">
              Apply Promo Code
            </h2>
            <p className="mt-1 text-sm text-[#6a7282]">
              Enter your coupon code to get a discount.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            cursor-pointer
            className="text-2xl  cursor-pointer text-[#6a7282] transition hover:text-red-500"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="coupon"
            className="mb-2 block text-sm font-medium text-[#101828]"
          >
            Coupon Code
          </label>

          <input
            id="coupon"
            type="text"
            value={couponName}
            onChange={(e) => setCouponName(e.target.value)}
            placeholder="Enter your coupon code"
            className="h-12 w-full rounded-xl border border-[#d1d5dc] px-4 text-sm outline-none transition focus:border-[#16a34a] focus:ring-2 focus:ring-green-100"
          />

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="h-11 flex-1 cursor-pointer rounded-xl border border-[#d1d5dc] text-sm font-semibold text-[#4a5565] transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!couponName.trim()}
              className="h-11 flex-1 rounded-xl cursor-pointer bg-[#16a34a] text-sm font-semibold text-white transition hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Apply Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
