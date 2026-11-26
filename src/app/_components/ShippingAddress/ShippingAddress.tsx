import { useState } from "react";
import { Building2, Check, Home, Info, MapPin, Phone, Plus, Bookmark } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import InputField from "@/app/_components/InputField/InputField";
import { checkoutSchemaType } from "@/Schema/checkout/checkout.schema";
import AddressCard, { AddressType } from "../AddressCard/AddressCard";


type ShippingAddressProps = {
  form: UseFormReturn<checkoutSchemaType>;
  addresses: AddressType[];
  selectedAddressId: string;
  useSavedAddress: boolean;
  onSelectAddress: (address: AddressType) => void;
  onAddNewAddress: () => void;
  onDeleteAddress: (id: string) => void;
};


export default function ShippingAddress({
  form,
  addresses,
  selectedAddressId,
  useSavedAddress,
  onSelectAddress,
  onAddNewAddress,
  onDeleteAddress,
}: ShippingAddressProps)  {

  return (
    <section className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm" aria-labelledby="shipping-address-title">
      <div className="bg-linear-to-r from-[#16a34a] to-[#15803d] px-6 py-4 text-white"><h2 id="shipping-address-title" className="flex items-center gap-2 text-lg font-semibold"><Home className="size-4.5 fill-white" /> Shipping Address</h2><p className="mt-1 text-sm text-[#dcfce7]">Where should we deliver your order?</p></div>
      <div className="grid gap-5 p-6 max-sm:p-4">
        <div className="border-b border-[#f3f4f6] pb-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-[#101828]"><Bookmark className="size-3.5 fill-[#16a34a] text-[#16a34a]" /> Saved Addresses</h3>
          <p className="mt-2 text-xs text-[#4a5565]">Select a saved address or enter a new one below</p>
<div className="mt-3 grid gap-3">
  {addresses.map((address) => (
    <AddressCard
      key={address._id}
      address={address}
      selected={selectedAddressId === address._id}
      onSelect={() => onSelectAddress(address)}
      onDelete={() => onDeleteAddress(address._id)}
    />
  ))}

  <button
    type="button"
    onClick={onAddNewAddress}
    className="flex w-full items-center gap-3 rounded-xl border border-dashed border-[#22c55e] bg-[#f0fdf4] p-3 text-left"
  >
    <span className="grid size-10 place-items-center rounded-lg bg-[#22c55e] text-white">
      <Plus className="size-5" />
    </span>

    <span>
      <strong className="block text-sm text-[#008236]">
        Add New Address
      </strong>
      <span className="text-xs text-[#6a7282]">
        Enter a new shipping address
      </span>
    </span>
  </button>
</div>
        </div>
{!useSavedAddress && (
  <>
    <div className="flex items-center gap-3 rounded-xl bg-[#f0fdf4] p-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#dcfce7] text-[#2b7fff]">
        <Info className="size-4 fill-[#2b7fff] text-white" />
      </span>
      <div>
        <p className="text-xs font-medium text-[#155dfc]">
          Delivery Information
        </p>
        <p className="mt-0.5 text-[11px] text-[#155dfc]">
          Please ensure your address is accurate for smooth delivery
        </p>
      </div>
    </div>

    <div className="grid gap-4">
      <InputField<checkoutSchemaType>
        id="city"
        label="City *"
        placeholder="e.g. Cairo, Alexandria, Giza"
        nameInput="city"
        form={form}
        autoComplete="address-level2"
        leadingIcon={<Building2 className="size-4" />}
        inputClassName="h-14 rounded-lg border-[#d1d5dc] bg-white text-sm"
        labelClassName="text-sm font-medium text-[#364153]"
        fieldClassName="gap-2"
      />

      <InputField<checkoutSchemaType>
        id="streetAddress"
        label="Street Address *"
        placeholder="Street name, building number, floor, apartment..."
        nameInput="details"
        form={form}
        autoComplete="street-address"
        leadingIcon={<MapPin className="size-4" />}
        multiline
        inputClassName="min-h-[104px] rounded-lg border-[#d1d5dc] bg-white text-sm"
        labelClassName="text-sm font-medium text-[#364153]"
        fieldClassName="gap-2"
      />

      <InputField<checkoutSchemaType>
        id="phone"
        label="Phone Number *"
        placeholder="01xxxxxxxxx"
        type="tel"
        nameInput="phone"
        form={form}
        autoComplete="tel"
        leadingIcon={<Phone className="size-4" />}
        labelAction={
          <span className="text-[11px] text-[#99a1af]">
            Egyptian numbers only
          </span>
        }
        inputClassName="h-14 rounded-lg border-[#d1d5dc] bg-white text-sm"
        labelClassName="text-sm font-medium text-[#364153]"
        fieldClassName="gap-2"
      />
    </div>
  </>
)}
      </div>
    </section>
  );
}
