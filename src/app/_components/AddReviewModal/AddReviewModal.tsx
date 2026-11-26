
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Star, X } from "lucide-react";
import { createReview } from "@/Actions/reviews.actions";

export type ReviewFormData = {
  review: string;
  rating: number;
};

type Props = {
  productID: string;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function AddReviewModal({
  productID,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      review: "",
      rating: 5,
    },
  });

  const rating = watch("rating");

  async function submitReview(values: ReviewFormData) {
    try {
      setLoading(true);
      setError("");

      const data = await createReview(productID, values);
console.log("create",data)

        onSuccess?.();
        onClose();
  
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Write a Review
          </h2>

          <button type="button" className="cursor-pointer" onClick={onClose}>
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(submitReview)} className="space-y-5">

          {/* Rating */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              Your Rating
            </label>

            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }, (_, index) => {
                const value = index + 1;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setValue("rating", value, {
                        shouldValidate: true,
                      })
                    }
                    className="cursor-pointer"
                    aria-label={`Rate ${value} stars`}
                  >
                    <Star
                      size={30}
                      className={
                        value <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                );
              })}

              <span className="ml-2 text-sm text-gray-600">
                {rating}/5
              </span>
            </div>
          </div>

          {/* Review */}
          <div>
            <label
              htmlFor="review"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Your Review
            </label>

            <textarea
              id="review"
              rows={5}
              placeholder="Share your experience with this product..."
              {...register("review", {
                required: "Please write your review.",
                validate: (value) =>
                  value.trim().length > 0 || "Review cannot be empty.",
              })}
              className="w-full resize-none rounded-xl border border-gray-200 p-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />

            {errors.review && (
              <p className="mt-1 text-sm text-red-500">
                {errors.review.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl cursor-pointer border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl cursor-pointer bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
