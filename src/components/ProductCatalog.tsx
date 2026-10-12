import React, { useState } from 'react';
import { Product, PRODUCTS } from '../data/matchaData';
import { Plus, Check, Eye, Sparkles } from 'lucide-react';

interface ProductCatalogProps {
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'powder' | 'drink' | 'gear' | 'wholesale'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <section id="products" className="py-16 lg:py-24 border-b border-[#E8E2D8] bg-[#FAF8F5]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#355243] uppercase mb-2">
              <span>Danh Mục Cốt Lõi</span>
              <span aria-hidden="true">·</span>
              <span>100% Nhập Khẩu Nhật Bản</span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#162E25] tracking-tight">
              Sản Phẩm & Nguyên Liệu Chuẩn Uji
            </h2>
            <p className="text-sm sm:text-base text-[#526058] mt-2 max-w-xl">
              Từ bột trà đạo Ceremonial cho cá nhân sành điệu đến bao sỉ chuyên dụng tối ưu chi phí cho quán F&B.
            </p>
          </div>

          {/* Interactive Filter Controls (Segmented bar allowed per Section 1A) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EAE4D9]/70 rounded-lg overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-white text-[#162E25] shadow-xs'
                  : 'text-[#4F5E56] hover:text-[#162E25]'
              }`}
            >
              Tất Cả ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('powder')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'powder'
                  ? 'bg-white text-[#162E25] shadow-xs'
                  : 'text-[#4F5E56] hover:text-[#162E25]'
              }`}
            >
              Bột Matcha Hũ
            </button>
            <button
              onClick={() => setSelectedCategory('drink')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'drink'
                  ? 'bg-white text-[#162E25] shadow-xs'
                  : 'text-[#4F5E56] hover:text-[#162E25]'
              }`}
            >
              Ly Quán To-Go
            </button>
            <button
              onClick={() => setSelectedCategory('gear')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'gear'
                  ? 'bg-white text-[#162E25] shadow-xs'
                  : 'text-[#4F5E56] hover:text-[#162E25]'
              }`}
            >
              Dụng Cụ Trà Đạo
            </button>
            <button
              onClick={() => setSelectedCategory('wholesale')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'wholesale'
                  ? 'bg-white text-[#162E25] shadow-xs'
                  : 'text-[#4F5E56] hover:text-[#162E25]'
              }`}
            >
              Gói Sỉ Cho Quán (1kg)
            </button>
          </div>
        </div>

        {/* 3-Column Product Grid with strict aspect ratios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group bg-white rounded-lg border border-[#E8E2D8] hover:border-[#C4BAAB] transition-all duration-300 flex flex-col overflow-hidden cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Product Media - 65% - 75% height proportion */}
              <div className="relative aspect-[4/3] bg-[#F4EFEA] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Subdued clean tag */}
                <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-semibold text-[#162E25] border border-[#E0D8CB]">
                  {product.tag}
                </div>

                {/* Hover Quick Action */}
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <span className="px-3.5 py-2 bg-white/95 text-[#162E25] text-xs font-semibold rounded-md shadow-sm flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem Chi Tiết</span>
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-grow justify-between bg-white">
                <div>
                  {/* Clean unboxed metadata with bullet separators */}
                  <div className="flex items-center gap-2 text-xs text-[#6B7A72] mb-1.5">
                    <span>{product.origin.split(',')[0]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.weight}</span>
                  </div>

                  <h3 className="text-base font-semibold text-[#162E25] group-hover:text-[#234537] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#75847B] font-serif italic mb-3">
                    {product.japaneseName}
                  </p>

                  <p className="text-xs text-[#4F5E56] line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Taste metrics if powder */}
                  {product.category === 'powder' && (
                    <div className="flex items-center gap-4 py-2 border-t border-[#F0EAE1] text-[11px] text-[#63726A] mb-3">
                      <div className="flex items-center gap-1">
                        <span>Umami:</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(star => (
                            <div
                              key={star}
                              className={`w-1.5 h-1.5 rounded-full ${star <= product.umami ? 'bg-[#2E6B4B]' : 'bg-[#DDD5C8]'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span aria-hidden="true">·</span>
                      <div className="flex items-center gap-1">
                        <span>Đắng:</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(star => (
                            <div
                              key={star}
                              className={`w-1.5 h-1.5 rounded-full ${star <= product.bitterness ? 'bg-[#996D4D]' : 'bg-[#DDD5C8]'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price and Add button */}
                <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                  <div>
                    <div className="font-mono tabular-nums text-base font-bold text-[#162E25]">
                      {formatPrice(product.price)}
                    </div>
                    {product.originalPrice && (
                      <div className="text-[11px] text-[#8C9A92] line-through font-mono tabular-nums">
                        {formatPrice(product.originalPrice)}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleAdd(e, product)}
                    aria-label={`Thêm ${product.name} vào giỏ hàng`}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      addedId === product.id
                        ? 'bg-[#2E6B4B] text-white'
                        : 'bg-[#162E25] hover:bg-[#234537] text-white shadow-xs'
                    }`}
                  >
                    {addedId === product.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã thêm</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#FAF8F5] rounded-xl max-w-3xl w-full border border-[#DED7CB] shadow-2xl overflow-hidden relative my-8">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[4/3] md:aspect-auto h-full min-h-[300px] bg-[#EAE4D9]">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#3E5C4B] uppercase tracking-wider">
                      {selectedProduct.tag}
                    </span>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-[#64736B] hover:text-[#162E25] text-sm p-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-[#162E25] mb-1">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs text-[#6F7E75] italic font-serif mb-4">
                    {selectedProduct.japaneseName}
                  </p>

                  <div className="font-mono tabular-nums text-xl font-bold text-[#162E25] mb-4">
                    {formatPrice(selectedProduct.price)}
                    <span className="text-xs text-[#708077] font-normal ml-2">/ {selectedProduct.weight}</span>
                  </div>

                  <p className="text-sm text-[#46544D] leading-relaxed mb-5">
                    {selectedProduct.description}
                  </p>

                  {/* Flavor Notes */}
                  <div className="mb-5">
                    <div className="text-xs font-semibold text-[#162E25] uppercase tracking-wider mb-2">
                      Đặc tính hương vị & cấu trúc:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.flavorNotes.map((note, i) => (
                        <span key={i} className="text-xs bg-white border border-[#E0D8CB] px-2.5 py-1 rounded text-[#36453D]">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technical Specs */}
                  <div className="bg-white p-3.5 rounded-lg border border-[#E4DDD1] text-xs text-[#4A5951] space-y-1.5 mb-6">
                    <div className="flex justify-between">
                      <span className="text-[#75847B]">Vùng trồng:</span>
                      <span className="font-medium text-[#162E25]">{selectedProduct.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#75847B]">Vụ thu hoạch:</span>
                      <span className="font-medium text-[#162E25]">{selectedProduct.harvest}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#75847B]">Sắc độ matcha:</span>
                      <span className="font-medium text-[#162E25]">{selectedProduct.colorRating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#75847B]">Gợi ý sử dụng:</span>
                      <span className="font-medium text-[#162E25]">{selectedProduct.recommendedUse}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E2D8] flex items-center gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(selectedProduct, 1);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3 bg-[#162E25] hover:bg-[#234537] text-white text-sm font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm Vào Giỏ Hàng</span>
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-4 py-3 bg-[#EAE4D9]/80 hover:bg-[#EAE4D9] text-[#162E25] text-sm font-medium rounded-md transition-colors cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
