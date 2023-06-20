export class Page {
  // The number of elements in the page
  limit: number = 0;
  // The total number of elements
  totalElements: number = 0;
  // The total number of pages
  totalPages: number = 0;
  // The current page number
  pageNumber: number = 0;
  search: Record<any, {}>;
}
