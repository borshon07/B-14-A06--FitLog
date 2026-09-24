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
    <div role="search" className="relative w-full sm:w-72">
      <Search
        size={14}
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
      />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="h-[38px] w-full rounded-[9px] border border-line bg-card pl-9 pr-9 text-xs text-fg placeholder:text-muted focus:border-accent-text focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted transition hover:text-fg"
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}