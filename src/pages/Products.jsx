import { useState } from 'react';
import ProductList from '../components/products/ProductList';
import ProductFilters from '../components/products/ProductFilters';
import { categories } from '../data/products';

function Products() {
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sortBy: 'featured'
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <ProductFilters 
            filters={filters} 
            setFilters={setFilters}
            categories={categories}
          />
        </aside>
        <main className="flex-1">
          <ProductList filters={filters} />
        </main>
      </div>
    </div>
  );
}

export default Products; 