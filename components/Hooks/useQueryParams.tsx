"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useQueryParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(value: string, key: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return {
    handleSearch,
    searchParams,
  };
};

export default useQueryParams;
