// import React from 'react'
// import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
// import { useTheme } from '../../../ThemeContext/ThemeContext'

// export default function Pagination({ currentPage, totalPages, onPageChange }) {
//   const {isLangArab}  = useTheme()
//   const totalItems = Math.ceil(totalPages / 9)
//   const pageNumbers = []
//   const maxVisiblePages = 5

//   // Generate array of page numbers to display
//   if (totalItems <= maxVisiblePages) {
//     for (let i = 1; i <= totalItems; i++) {
//       pageNumbers.push(i)
//     }
//   } else {
//     const leftOffset = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1)
//     const rightOffset = Math.min(leftOffset + maxVisiblePages - 1, totalItems)

//     if (leftOffset > 1) pageNumbers.push(1, '...')
//     for (let i = leftOffset; i <= rightOffset; i++) {
//       pageNumbers.push(i)
//     }
//     if (rightOffset < totalItems) pageNumbers.push('...', totalItems)
//   }

//   return (
//     <nav className="flex justify-center mt-5 items-center space-x-2" aria-label="Pagination">
//       <button
//         onClick={() => onPageChange(1)}
//         disabled={currentPage === 1}
//         className={`p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 ${isLangArab && "ml-2"} disabled:opacity-50`}
//         aria-label="First page"
//       >
//         <ChevronsLeft className={`w-5 h-5 ${isLangArab && "rotate-180 "} `} />
//       </button>
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
//         aria-label="Previous page"
//       >
//         <ChevronLeft className={`w-5 h-5 ${isLangArab && "rotate-180 "} `} />
//       </button>
//       {pageNumbers.map((page, index) => (
//         <React.Fragment key={index}>
//           {typeof page === 'number' ? (
//             <button
//               onClick={() => onPageChange(page)}
//               className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
//               aria-current={currentPage === page ? 'page' : undefined}
//             >
//               {page}
//             </button>
//           ) : (
//             <span className="px-4 py-2">...</span>
//           )}
//         </React.Fragment>
//       ))}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
//         aria-label="Next page"
//       >
//         <ChevronRight className={`w-5 h-5 ${isLangArab && "rotate-180"} `} />
//       </button>
//       <button
//         onClick={() => onPageChange(totalPages)}
//         disabled={currentPage === totalPages}
//         className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
//         aria-label="Last page"
//       >
//         <ChevronsRight className={`w-5 h-5 ${isLangArab && "rotate-180"} `} />
//       </button>
//     </nav>
//   )
// }


import React from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useTheme } from '../../../ThemeContext/ThemeContext'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const { isLangArab } = useTheme();
  const maxVisiblePages = 5; // Number of visible pages in the pagination
  const totalItems = Math.ceil(totalPages / 9); // Adjust based on items per page
  const pageNumbers = [];

  // Calculate the range of visible pages
  const leftOffset = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  let rightOffset = leftOffset + maxVisiblePages - 1;

  // Adjust if the right offset exceeds the total number of pages
  if (rightOffset > totalItems) {
    rightOffset = totalItems;
  }

  // Recalculate leftOffset to maintain `maxVisiblePages` if possible
  const adjustedLeftOffset = Math.max(rightOffset - maxVisiblePages + 1, 1);

  // Generate page numbers
  if (adjustedLeftOffset > 1) {
    pageNumbers.push(1); // Always include the first page
    if (adjustedLeftOffset > 2) {
      pageNumbers.push('...'); // Ellipsis if there's a gap
    }
  }

  for (let i = adjustedLeftOffset; i <= rightOffset; i++) {
    pageNumbers.push(i);
  }

  if (rightOffset < totalItems) {
    if (rightOffset < totalItems - 1) {
      pageNumbers.push('...'); // Ellipsis if there's a gap
    }
    pageNumbers.push(totalItems); // Always include the last page
  }

  return (
    <nav className="flex justify-center mt-5 items-center space-x-2" aria-label="Pagination">
      {/* First Page Button */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 ${isLangArab && "ml-2"} disabled:opacity-50`}
        aria-label="First page"
      >
        <ChevronsLeft className={`w-5 h-5 ${isLangArab && "rotate-180"} `} />
      </button>

      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        aria-label="Previous page"
      >
        <ChevronLeft className={`w-5 h-5 ${isLangArab && "rotate-180"} `} />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === 'number' ? (
            <button
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-md ${
                currentPage === page ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ) : (
            <span className="px-4 py-2">...</span>
          )}
        </React.Fragment>
      ))}

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalItems))}
        disabled={currentPage === totalItems}
        className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        aria-label="Next page"
      >
        <ChevronRight className={`w-5 h-5 ${isLangArab && "rotate-180"} `} />
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => onPageChange(totalItems)}
        disabled={currentPage === totalItems}
        className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        aria-label="Last page"
      >
        <ChevronsRight className={`w-5 h-5 ${isLangArab && "rotate-180"} `} />
      </button>
    </nav>
  );
}
