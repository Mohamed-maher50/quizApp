"use client";
import Pagination from "rc-pagination/lib/Pagination";
import React, { FC } from "react";
import "rc-pagination/assets/index.css";
import "./style.css";
import {
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { PaginationProps } from "rc-pagination";
import { cn } from "@/lib/utils";
const PaginationBar: FC<PaginationProps> = ({ className, ...rest }) => {
  return (
    <Pagination
      className={cn(" w-fit mx-auto block", className)}
      itemRender={(numb, type, ele) => {
        if (type === "page") return <PaginationItem>{numb}</PaginationItem>;
        if (type === "next")
          return (
            <PaginationNext
              className="text-white dark:text-black hover:text-white  hover:bg-transparent m-0 h-full w-fit px-2  "
              size={"sm"}
            />
          );

        if (type == "prev")
          return (
            <PaginationPrevious
              className="text-white dark:text-black hover:text-white  hover:bg-transparent m-0 h-full w-fit px-2  "
              size={"sm"}
            />
          );
        return ele;
      }}
      {...rest}
    />
  );
};

export default PaginationBar;
