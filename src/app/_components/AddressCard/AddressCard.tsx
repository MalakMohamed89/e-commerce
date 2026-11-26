
import { Building2, Check, MapPin, Phone, Trash2 } from "lucide-react";

export type AddressType = {
  _id: string;
  name: string;
  city: string;
  details: string;
  phone: string;
};

type AddressCardProps = {
  address: AddressType;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
};

export default function AddressCard({
  address,
  selected,
  onSelect,
  onDelete,
}: AddressCardProps) {
  return (
    <div
      className={`flex w-full items-start gap-3 rounded-xl border p-3 transition ${
        selected
          ? "border-[#16a34a] bg-[#f0fdf4]"
          : "border-[#e5e7eb] bg-white hover:border-[#16a34a]"
      }`}
    >
      {/* Select Address */}
      <button
        type="button"
        onClick={onSelect}
        className="flex min-w-0 flex-1 items-start gap-3 text-left"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f3f4f6] text-[#6a7282]">
          <MapPin className="size-4" />
        </span>

        <span className="min-w-0 flex-1">
          <strong className="block text-sm font-semibold text-[#101828]">
            {address.city}
          </strong>

          <span className="mt-1 block text-xs text-[#6a7282]">
            {address.details}
          </span>

          <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#6a7282]">
            <span className="inline-flex items-center gap-1">
              <Phone className="size-3" />
              {address.phone}
            </span>

            <span className="inline-flex items-center gap-1">
              <Building2 className="size-3" />
              {address.city}
            </span>
          </span>
        </span>

        {selected && (
          <Check className="mt-1 size-4 shrink-0 text-[#16a34a]" />
        )}
      </button>

      {/* Delete Address */}
      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete address"
        title="Delete address"
        className="grid size-9 shrink-0 place-items-center rounded-lg text-[#99a1af] transition hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
