"use client";
import React, { Fragment } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import useQueryParams from "./Hooks/useQueryParams";

const RoomPagination = ({
  count,
  isLastPage,
  limit,
  active,
}: {
  active: number;
  count: number;
  limit: number;
  isLastPage: boolean;
}) => {
  const { handleSearch, searchParams } = useQueryParams();
  const currentPage = searchParams.get("page");
  const handlePriv = () => {
    if (!currentPage || +currentPage <= 0) return;
    if (+active >= 2) return handleSearch((active - 1).toString(), "page");
  };
  const handleNext = () => {
    if (!currentPage) return handleSearch("1", "page");
    if (currentPage && +currentPage >= 1)
      return handleSearch((+currentPage + 1).toString(), "page");
  };

  let paginationItemsNum = Math.ceil(count / limit);
  const paginationItems = Array.from(
    { length: paginationItemsNum },
    (_, index) => index
  );

  const paginationItemHandler = (index: number) => {
    handleSearch((index + 1).toString(), "page");
  };
  return (
    <Pagination className="w-fit mt-5 mx-auto col-span-full">
      <PaginationContent>
        {active !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={handlePriv}
            />
          </PaginationItem>
        )}

        {paginationItems.map((item, index, array) => {
          if (Math.round(array.length / 2) == index) {
            return (
              <Fragment key={index}>
                <PaginationItem>
                  <PaginationLink>
                    <PaginationEllipsis />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem
                  onClick={() => paginationItemHandler(item)}
                  key={item}
                >
                  <PaginationLink isActive={active == item + 1}>
                    {item + 1}
                  </PaginationLink>
                </PaginationItem>
              </Fragment>
            );
          }
          return (
            <PaginationItem
              onClick={() => paginationItemHandler(item)}
              key={item}
            >
              <PaginationLink isActive={active == item + 1}>
                {Math.round(array.length / 2) == index ? (
                  <PaginationEllipsis />
                ) : (
                  item + 1
                )}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {!isLastPage && (
          <PaginationItem>
            <PaginationNext onClick={handleNext} className="cursor-pointer" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default RoomPagination;
