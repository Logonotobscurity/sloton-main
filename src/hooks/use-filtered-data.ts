'use client';

import { useState, useMemo } from 'react';

export interface FilterOptions<T> {
  searchFields?: (keyof T)[];
  categoryField?: keyof T;
  itemsPerPage?: number;
}

export function useFilteredData<T extends Record<string, any>>(
  data: T[],
  options: FilterOptions<T> = {}
) {
  const {
    searchFields = [],
    categoryField,
    itemsPerPage = 9
  } = options;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Category filtering
      const matchesCategory = !categoryField || 
        selectedCategory === 'All' || 
        item[categoryField] === selectedCategory;
      
      if (!matchesCategory) return false;

      // Search filtering
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return searchFields.some(field => {
        const value = item[field];
        return value && String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [data, searchTerm, selectedCategory, searchFields, categoryField]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === 'Show All' ? 'All' : category);
    setCurrentPage(1);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pageNumbers.map((num, index) => ({
      type: typeof num === 'number' ? 'page' : 'ellipsis',
      value: num,
      key: index,
      isActive: typeof num === 'number' && currentPage === num
    }));
  };

  return {
    // Data
    filteredData,
    paginatedData,
    totalPages,
    
    // State
    searchTerm,
    selectedCategory,
    currentPage,
    
    // Handlers
    handlePageChange,
    handleCategoryChange,
    handleSearchChange,
    
    // Pagination rendering
    renderPagination,
    
    // Utilities
    hasResults: filteredData.length > 0,
    totalResults: filteredData.length
  };
}