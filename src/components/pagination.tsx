import React, { useEffect } from "react";
import classnames from "classnames";
import { DOTS, usePagination } from "../hooks/usepagination";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
// import './pagination.scss';

type PaginationProps = {
  onPageChange: (pageNo: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  className: string;
  onPageSizeChange: (pageSize: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    onPageSizeChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  // console.log(
  //   "paginationRange:",
  //   paginationRange,
  //   totalCount,
  //   siblingCount,
  //   currentPage,
  //   pageSize
  // );

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];

  const PrevNextBtnWidget = ({
    label,
    icon,
    onClick,
    iconPosition,
    customStyles,
  }: {
    // eslint-disable-next-line
    // @ts-ignore
    icon: any;
    label: string;
    iconPosition: string;
    onClick?: () => void;
    customStyles?: string;
  }) => {
    let defaultClass = "flex flex-row items-center text-blue-500";

    if (customStyles) {
      defaultClass += " " + customStyles;
    }
    return (
      <button className={defaultClass} onClick={onClick}>
        {iconPosition == "L" && icon}
        <div className="link">{label}</div>
        {iconPosition == "R" && icon}
      </button>
    );
  };

  const PageLimit = () => {
    const limitData = [10, 20, 50, 70];
    // eslint-disable-next-line
    // @ts-ignore
    let limits: any[] = [];

    limitData.forEach((data) => {
      limits.push(
        <option key={data} value={limits[data]}>
          {data}
        </option>
      );
    });
    return limits;
  };

  return (
    <div className="flex flex-row justify-end">
      <PrevNextBtnWidget
        label="First"
        icon={<ChevronDoubleLeftIcon className="size-4" />}
        iconPosition="L"
        customStyles="pr-2"
        onClick={() => onPageChange(1)}
      />
      <ul
        className={classnames("pagination-container", {
          [className]: className,
        })}
      >
        {/* Left navigation arrow */}
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange?.map((pageNumber: any, index: number) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li className="pagination-item dots" key={index}>
                &#8230;
              </li>
            );
          }

          // Render our Page Pills
          return (
            <li
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
              key={index}
            >
              {pageNumber}
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
      <PrevNextBtnWidget
        label="Last"
        icon={<ChevronDoubleRightIcon className="size-4" />}
        iconPosition="R"
        customStyles={"pl-2"}
        onClick={() => {
          if (typeof lastPage == "number") {
            onPageChange(lastPage);
          }
        }}
      />
      <div className="pl-3">
        <select
          id="limit"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(evt) => {
            const val = evt.target.value;
            onPageSizeChange && onPageSizeChange(parseInt(val));
          }}
          value={pageSize}
        >
          {PageLimit()}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
