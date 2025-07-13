import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationComponent({ total, limit, offset, setOffset }) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = offset / limit + 1;
  const VISIBLE_PAGES = 5;

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      const newOffset = (pageNumber - 1) * limit;
      setOffset(newOffset);
    }
  };

  let startPage = Math.max(1, currentPage - Math.floor(VISIBLE_PAGES / 2));
  let endPage = Math.min(totalPages, startPage + VISIBLE_PAGES - 1);

  if (endPage - startPage + 1 < VISIBLE_PAGES) {
    startPage = Math.max(1, endPage - VISIBLE_PAGES + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent className="flex justify-center sm:justify-end gap-1">
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* First Page and Left Ellipsis */}
        {startPage > 1 && (
          <>
            <PaginationItem className="hidden sm:block">
              <PaginationLink href="#" onClick={() => handlePageChange(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            {startPage > 2 && (
              <PaginationItem className="hidden sm:block">
                <PaginationEllipsis
                  onClick={() =>
                    handlePageChange(Math.max(1, currentPage - VISIBLE_PAGES))
                  }
                  className="cursor-pointer"
                />
              </PaginationItem>
            )}
          </>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber} className="hidden sm:block">
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(pageNumber)}
              isActive={pageNumber === currentPage}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Show current page only on mobile */}
        <PaginationItem className="sm:hidden">
          <span className="text-sm text-gray-600 px-2">{`Page ${currentPage} of ${totalPages}`}</span>
        </PaginationItem>

        {/* Right Ellipsis and Last Page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <PaginationItem className="hidden sm:block">
                <PaginationEllipsis
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + VISIBLE_PAGES))
                  }
                  className="cursor-pointer"
                />
              </PaginationItem>
            )}
            <PaginationItem className="hidden sm:block">
              <PaginationLink href="#" onClick={() => handlePageChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
