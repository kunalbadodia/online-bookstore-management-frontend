"use client"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = []

  // Determine which page numbers to show
  if (totalPages <= 5) {
    // If 5 or fewer pages, show all
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    // Always show first page
    pageNumbers.push(1)

    // If current page is 1 or 2, show first 5 pages
    if (currentPage <= 3) {
      pageNumbers.push(2, 3, 4, 5)
    }
    // If current page is last or second last, show last 5 pages
    else if (currentPage >= totalPages - 2) {
      pageNumbers.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1)
    }
    // Otherwise show current page and 2 pages before and after
    else {
      pageNumbers.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2)

      // Remove duplicates (in case current page is 1 or 2)
      const uniquePageNumbers = [...new Set(pageNumbers)].sort((a, b) => a - b)
      pageNumbers.length = 0
      pageNumbers.push(...uniquePageNumbers)
    }

    // Always show last page if not already included
    if (!pageNumbers.includes(totalPages)) {
      // Add ellipsis if there's a gap
      if (pageNumbers[pageNumbers.length - 1] !== totalPages - 1) {
        pageNumbers.push("...")
      }
      pageNumbers.push(totalPages)
    }

    // Add ellipsis after first page if needed
    if (pageNumbers[0] === 1 && pageNumbers[1] > 2) {
      pageNumbers.splice(1, 0, "...")
    }
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
        </li>

        {pageNumbers.map((page, index) => (
          <li
            key={index}
            className={`page-item ${page === currentPage ? "active" : ""} ${page === "..." ? "disabled" : ""}`}
          >
            <button className="page-link" onClick={() => page !== "..." && onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination

