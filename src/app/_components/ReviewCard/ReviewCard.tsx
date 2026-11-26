
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Star,
  BadgeCheck,
  ThumbsUp,
  MoreVertical,
  Pencil,
  Trash2,
  X,
} from "lucide-react";


import type { ReviewFormData } from "@/app/_components/AddReviewModal/AddReviewModal";
import { updateReview, deleteReview } from "@/Actions/reviews.actions";
import { ReviewType } from "@/Types/ReviewType/Reviews.type";
import { toast } from "@/components/ui/toast"

type Props = {
  review: ReviewType;
  currentUserId: string;
  onRefresh: () => void;
};

export default function ReviewCard({
  review,
  currentUserId,
  onRefresh,
}: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<ReviewFormData>({
    defaultValues: {
      review: review.review,
      rating: review.rating,
    },
  });

  const rating = watch("rating");

  const isMyReview = review.user._id === currentUserId;

  const userName = review.user.name;

  const userInitials = userName
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const reviewDate = new Date(review.createdAt).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );


async function handleEdit(values: ReviewFormData) {
  try {
    setLoading(true);

    const res = await updateReview(review._id,values);
console.log("update",res)

      toast.add({
        title: "Review updated successfully",
        type: "success",
      });

      setIsEditing(false);
      onRefresh();

  } catch (err) {
    toast.add({
      title: err instanceof Error ? err.message : "Something went wrong",
      type: "error",
    });
  } finally {
    setLoading(false);
  }
}

async function handleDelete() {
  try {
    setLoading(true);

    const res = await deleteReview(review._id);

console.log("delete",res)

      toast.add({
        title: "Review deleted successfully",
        type: "success",
      });

      onRefresh();


    
  } catch (err) {
    toast.add({
      title: err instanceof Error ? err.message : "Something went wrong",
      type: "error",
    });
  } finally {
    setLoading(false);
    setShowMenu(false);
  }
}
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-medium text-green-700">
          <BadgeCheck size={15} />
          Customer Review
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            {reviewDate}
          </span>

          {/* My Review Menu */}
          {isMyReview && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="rounded-full p-1.5 text-gray-500 transition hover:bg-gray-100"
              >
                <MoreVertical size={20} />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-9 z-20 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">

                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(true);
                      setShowMenu(false);
                      setValue("review", review.review);
                      setValue("rating", review.rating);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleDelete}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>

                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
            {userInitials}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {userName}
            </h3>
            <p className="text-xs text-gray-500">Customer</p>
          </div>
        </div>

        {!isEditing && (
          <div className="flex shrink-0 items-center gap-0.5">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={15}
                className={
                  index < review.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-200"
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Review Content */}
      {isEditing ? (
        <form
          onSubmit={handleSubmit(handleEdit)}
          className="space-y-4"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Your Rating
            </label>

            <div className="flex gap-2">
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
                  >
                    <Star
                      size={24}
                      className={
                        value <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <textarea
            rows={4}
            {...register("review", {
              required: "Review is required",
              validate: (value) =>
                value.trim().length > 0 || "Review cannot be empty",
            })}
            className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-green-500"
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setError("");
              }}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600"
            >
              <X size={15} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-sm leading-6 text-gray-600">
          {review.review}
        </p>
      )}

      {!isEditing && (
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-xs text-gray-400">
            Was this review helpful?
          </span>

          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-green-600"
          >
            <ThumbsUp size={14} />
            Helpful
          </button>
        </div>
      )}
    </div>
  );
}
