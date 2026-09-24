"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  label,
  placeholder = "Search by name or tag",
}: SearchBarProps) {
  return (
    <div role="search" className="w-full sm:w-72">
      <label className="input input-sm w-full">
        <Search size={14} aria-hidden="true" className="opacity-60" />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          aria-label={label}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="btn btn-ghost btn-circle btn-xs"
          >
            <X size={12} aria-hidden="true" />
          </button>
        )}
      </label>
    </div>
  );
}