"use client";
import useQueryParams from "@/components/Hooks/useQueryParams";
import PaginationBar from "@/components/test/PaginationBar";
import React from "react";
export const dynamic = "force-dynamic";
const Pagination = ({
  total,
  pageSize,
}: {
  total: number | undefined;
  pageSize: number;
}) => {
  const { handleSearch, searchParams } = useQueryParams();

  const handlePagination = (number: number) => {
    handleSearch(number.toString(), "page");
  };

  return (
    <div>
      <PaginationBar
        pageSize={pageSize || 3}
        current={
          searchParams.get("page") ? Number(searchParams.get("page")) : 1
        }
        defaultCurrent={
          searchParams.get("page") ? Number(searchParams.get("page")) : 1
        }
        total={total}
        onChange={handlePagination}
      />
    </div>
  );
};

export default Pagination;
