'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

interface MarketData {
  headers: string[];
  rows: string[][];
  lastUpdated: string | null;
  totalRows: number;
  error: string | null;
}

interface MarketDataTableProps {
  compact?: boolean;
}

export function MarketDataTable({ compact = false }: MarketDataTableProps) {
  const [data, setData] = useState<MarketData>({
    headers: [],
    rows: [],
    lastUpdated: null,
    totalRows: 0,
    error: null
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const rowsPerPage = compact ? 10 : 25;

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/market-data');
      const result = await response.json();
      
      if (response.ok) {
        setData(result);
      } else {
        setData({
          headers: [],
          rows: [],
          lastUpdated: null,
          totalRows: 0,
          error: result.error || 'Failed to load data'
        });
      }
    } catch (error) {
      setData({
        headers: [],
        rows: [],
        lastUpdated: null,
        totalRows: 0,
        error: 'Network error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedRows = useMemo(() => {
    if (!data.rows.length) return [];
    
    let filtered = data.rows.filter(row =>
      row.some(cell => 
        cell.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (sortColumn !== null) {
      filtered.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        
        const aNum = parseFloat(aValue);
        const bNum = parseFloat(bValue);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    return filtered;
  }, [data.rows, searchTerm, sortColumn, sortDirection]);

  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredAndSortedRows.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAndSortedRows, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedRows.length / rowsPerPage);

  const handleSort = (columnIndex: number) => {
    if (sortColumn === columnIndex) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnIndex);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading market data...</p>
        </div>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-red-600 mb-2">Data Unavailable</h3>
        <p className="text-gray-600 mb-4">{data.error}</p>
        <button
          onClick={fetchMarketData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!compact) {
    return (
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="🔍 Search companies..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{data.totalRows} companies</span>
            {data.lastUpdated && (
              <span>Updated: {new Date(data.lastUpdated).toLocaleString()}</span>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {data.headers.map((header, index) => (
                    <th
                      key={index}
                      onClick={() => handleSort(index)}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        {header}
                        {sortColumn === index && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedRows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              let page;
              if (totalPages <= 5) {
                page = index + 1;
              } else if (currentPage <= 3) {
                page = index + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + index;
              } else {
                page = currentPage - 2 + index;
              }
              
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }

  // Compact version
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Market Overview</h3>
        <div className="text-sm text-gray-600">
          {data.totalRows} companies
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {data.headers.slice(0, 6).map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedRows.slice(0, 5).map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {row.slice(0, 6).map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <Link
          href="/marketInfo"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View Full Dashboard →
        </Link>
      </div>
    </div>
  );
}
