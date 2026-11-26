
"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import {
  addUserAddress,
  getUserAllAddress,
  removeUserAddress,
} from "@/Actions/userAddress.actions";
type AddressType = {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
};
import { toast } from "@/components/ui/toast"

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [adding, setAdding] = useState(false);

  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");

  // Get All Addresses
async function getAddresses() {
  try {
    setLoading(true);

    const response = await getUserAllAddress();

    setAddresses(
      Array.isArray(response.data) ? response.data : []
    );
  } catch (err) {
    toast.add({
      title: err instanceof Error ? err.message : "Failed to load addresses",
      type: "error",
    });
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    getAddresses();
  }, []);

  // Add Address
async function handleAddAddress(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  try {
    setAdding(true);

    const response = await addUserAddress(city, details, phone);

    if (response.message === "fail") {
      throw new Error(response.message);
    }

    toast.add({
      title: "Address Added Successfully!",
      type: "success",
    });

    setCity("");
    setDetails("");
    setPhone("");
    setShowForm(false);

    await getAddresses();
  } catch (err) {
    toast.add({
      title: err instanceof Error ? err.message : "Failed to add address",
      type: "error",
    });
  } finally {
    setAdding(false);
  }
}
  // Delete Address
async function handleDeleteAddress(addressId: string) {
  try {
    const response = await removeUserAddress(addressId);

    if (response.message === "fail") {
      throw new Error(response.message);
    }

    toast.add({
      title: "Address Deleted Successfully!",
      type: "success",
    });

    await getAddresses();
  } catch (err) {
    toast.add({
      title: err instanceof Error ? err.message : "Failed to delete address",
      type: "error",
    });
  }
}


  return (
    <section aria-labelledby="addresses-title" className="min-w-0">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="addresses-title" className="text-lg font-bold">
            My Addresses
          </h2>
          <p className="mt-1 text-xs text-[#6a7282]">
            Manage your saved delivery addresses
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="inline-flex cursor-pointer min-h-10 items-center justify-center gap-2 rounded-lg bg-[#16a34a] px-5 text-xs font-semibold text-white shadow-md shadow-green-700/15 transition hover:bg-[#15803d]"
        >
          {showForm ? <X className="size-4" /> : <Plus className="size-4" />}
          {showForm ? "Cancel" : "Add Address"}
        </button>
      </div>


      {showForm && (
        <form
          onSubmit={handleAddAddress}
          className="mb-6 grid max-w-146 gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
        >
          <h3 className="text-sm font-semibold">Add New Address</h3>

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="h-11 rounded-lg border border-[#e5e7eb] px-3 text-sm outline-none focus:border-[#16a34a]"
          />

          <input
            type="text"
            placeholder="Address Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            className="h-11 rounded-lg border border-[#e5e7eb] px-3 text-sm outline-none focus:border-[#16a34a]"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="h-11 rounded-lg border border-[#e5e7eb] px-3 text-sm outline-none focus:border-[#16a34a]"
          />

          <button
            type="submit"
            disabled={adding}
            className="min-h-10 cursor-pointer rounded-lg bg-[#16a34a] px-5 text-xs font-semibold text-white transition hover:bg-[#15803d] disabled:opacity-60"
          >
            {adding ? "Adding..." : "Save Address"}
          </button>
        </form>
      )}

     {loading ? (
  <div className="grid gap-4">
    {[1, 2].map((item) => (
      <div
        key={item}
        className="flex w-full max-w-146 items-start gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm animate-pulse"
      >
        <div className="size-10 shrink-0 rounded-xl bg-[#f0fdf4]" />

        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-4 w-28 rounded-md bg-gray-200" />
          <div className="h-3 w-40 rounded-md bg-gray-100" />

          <div className="flex flex-wrap gap-4 pt-1">
            <div className="h-3 w-24 rounded-md bg-gray-100" />
            <div className="h-3 w-28 rounded-md bg-gray-100" />
          </div>
        </div>

        <div className="size-9 shrink-0 rounded-lg bg-gray-100" />
      </div>
    ))}
  </div>
) : addresses.length === 0 ? (
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center shadow-sm">
          <MapPin className="mx-auto mb-3 size-8 text-[#99a1af]" />
          <p className="text-sm font-medium">No addresses found</p>
          <p className="mt-1 text-xs text-[#6a7282]">
            Add your first delivery address.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <article
              key={address._id}
              className="flex w-full max-w-146 items-start gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f0fdf4] text-[#16a34a]">
                <MapPin className="size-5 fill-[#16a34a]" />
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold">
                  {address.name}
                </h3>

                <p className="mt-1 text-xs text-[#6a7282]">
                  {address.details}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#6a7282]">
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="size-3.5" />
                    {address.phone}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="size-3.5" />
                    {address.city}
                  </span>
                </div>
              </div>

     <div className="flex shrink-0 gap-2">
  <button
    type="button"
    aria-label="Delete address"
    onClick={() => handleDeleteAddress(address._id)}
    className="grid size-9 cursor-pointer place-items-center rounded-lg bg-[#f3f4f6] text-[#4a5565] transition hover:bg-red-50 hover:text-red-600"
  >
    <Trash2 className="size-4" />
  </button>
</div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
