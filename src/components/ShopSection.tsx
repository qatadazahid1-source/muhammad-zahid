import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/storeData';
import { Product, ProductCategory } from '../types';
import { formatPKR } from '../utils/helpers';
import { Search, ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';

interface ShopSectionProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onOpenProductDetail: (product: Product) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  onAddToCart,
  onOpenProductDetail,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'engine-oils', label: 'Engine Oils & Lubricants' },
    { id: 'bike-care', label: 'Motorcycle Care' },
    { id: 'car-care', label: 'Detailing & Polish' },
    { id: 'mats-covers', label: 'Floor Mats & Key Covers' },
    { id: 'accessories', label: 'Car Accessories' },
    { id: 'filters', label: 'Filters & Spare Parts' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId((current) => (current === product.id ? null : current));
    }, 1500);
  };

  return (
    <section className="py-16 lg:py-20 bg-background" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-border">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">
              Genuine Auto Parts & Accessories Store
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-primary tracking-tight [text-wrap:balance]">
              Oils, Car Care & Interior Accessories
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-xs sm:text-sm text-secondary max-w-md">
            Directly sourced original lubricants, custom vehicle mats, silicone/alloy key covers, and Islamic hanging charms ready for local pickup in Shahkot or nationwide delivery.
          </p>
        </div>

        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search oils (ZIC, Havoline), mats, key covers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg pl-9 pr-4 py-2.5 text-xs sm:text-sm text-primary placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary hover:text-primary"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-secondary">
            <span className="shrink-0">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-surface border border-border rounded-lg px-3 py-2 text-xs text-primary focus:outline-none focus:border-red-500 cursor-pointer"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Tabs (Segmented Control) */}
        <div className="flex items-center gap-1.5 p-1 bg-surface rounded-lg border border-border overflow-x-auto mb-8 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-primary shadow-sm'
                  : 'text-secondary hover:text-primary hover:bg-surface/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-xs text-secondary mb-6 flex items-center justify-between">
          <span>
            Showing <strong className="text-primary tabular-nums">{filteredProducts.length}</strong> genuine products
          </span>
          <span className="text-muted hidden sm:inline">
            Free shipping in Shahkot on orders over Rs. 3,000
          </span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-surface border border-border rounded-xl">
            <p className="text-sm text-secondary font-medium mb-1">No products found matching your search</p>
            <p className="text-xs text-muted mb-4">Try different keywords or browse our categories above.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs bg-red-600 hover:bg-red-500 text-primary font-medium rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onOpenProductDetail(product)}
                className="bg-surface border border-border rounded-xl overflow-hidden flex flex-col justify-between hover:border-border transition-all duration-200 cursor-pointer group hover:-translate-y-0.5"
              >
                {/* Product Image */}
                <div className="relative h-52 w-full bg-surface-elevated overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle brand kicker */}
                  <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-[10px] text-primary font-medium px-2 py-0.5 rounded">
                    {product.brand}
                  </div>

                  {product.originalPrice && (
                    <div className="absolute top-2.5 right-2.5 bg-red-600 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded">
                      SAVE {formatPKR(product.originalPrice - product.price)}
                    </div>
                  )}

                  {/* Quick hover eye button */}
                  <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      className="p-1.5 rounded-md bg-black/80 hover:bg-black text-primary text-xs flex items-center gap-1 shadow"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Clean unboxed metadata with dot separator */}
                    <div className="flex items-center gap-2 text-[11px] text-secondary mb-1.5">
                      <span>{product.categoryName}</span>
                      {product.volumeOrSize && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-secondary font-medium">{product.volumeOrSize}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-sm font-semibold text-primary mb-2 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-secondary line-clamp-2 mb-4">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-border/80 flex items-center justify-between mt-auto">
                    <div>
                      <div className="text-base font-bold text-primary tabular-nums">
                        {formatPKR(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[11px] text-muted line-through tabular-nums">
                          {formatPKR(product.originalPrice)}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleAdd(e, product)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                        addedProductId === product.id
                          ? 'bg-emerald-600 text-primary'
                          : 'bg-red-600 hover:bg-red-500 active:bg-red-700 text-primary shadow-sm'
                      }`}
                    >
                      {addedProductId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
