import React, { useState } from 'react';
import { CafeDrink, CAFE_DRINKS, Product } from '../data/matchaData';
import { Plus, Coffee, Info, Check } from 'lucide-react';

interface DrinkMenuProps {
  onAddCustomDrinkToCart: (product: Product) => void;
  onOpenCustomizer: () => void;
}

export const DrinkMenu: React.FC<DrinkMenuProps> = ({
  onAddCustomDrinkToCart,
  onOpenCustomizer
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'latte' | 'signature' | 'traditional' | 'refreshing'>('all');
  const [selectedDrink, setSelectedDrink] = useState<CafeDrink | null>(null);
  const [addedDrinkId, setAddedDrinkId] = useState<string | null>(null);

  const filteredDrinks = CAFE_DRINKS.filter(d => {
    if (activeTab === 'all') return true;
    return d.category === activeTab;
  });

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleOrderDrink = (drink: CafeDrink) => {
    const productItem: Product = {
      id: `drink-${drink.id}`,
      name: drink.name,
      japaneseName: drink.japaneseName,
      category: 'drink',
      tag: 'Ly Barista Chuẩn Quán',
      price: drink.price,
      weight: 'Size L - 450ml',
      origin: 'Tencha Lab Bar',
      harvest: 'Pha chế tươi mới',
      umami: 4,
      bitterness: 1,
      colorRating: 'Ngọc bích đậm',
      description: drink.description,
      flavorNotes: drink.recipeHighlights,
      recommendedUse: 'Uống lạnh to-go',
      image: drink.image,
      inStock: true
    };
    onAddCustomDrinkToCart(productItem);
    setAddedDrinkId(drink.id);
    setTimeout(() => setAddedDrinkId(null), 1200);
  };

  return (
    <section id="drinks" className="py-16 lg:py-24 border-b border-[#E8E2D8] bg-[#F7F4EE]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#355243] uppercase mb-2">
              <span>Matcha Bar & To-Go Menu</span>
              <span aria-hidden="true">·</span>
              <span>Công Thức F&B Chuẩn Hóa</span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#162E25] tracking-tight">
              Menu Trà Quán & Tỷ Suất Cost Ly
            </h2>
            <p className="text-sm sm:text-base text-[#526058] mt-2 max-w-xl">
              Quy trình ra món chuẩn trà đạo 4 - 5 phút, chăm chút tỉ mỉ từng công đoạn rây bột, căn nhiệt độ nước 78°C và đánh bọt chasen trước mặt khách với biên lợi nhuận gộp vượt trội &gt; 73%.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCustomizer}
              className="px-4 py-2.5 bg-[#162E25] hover:bg-[#234537] text-white text-xs font-semibold rounded-md transition-all shadow-xs cursor-pointer flex items-center gap-2"
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Tự Sáng Tạo Ly Riêng (Drink Builder)</span>
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredDrinks.map((drink) => (
            <div
              key={drink.id}
              className="bg-white rounded-lg border border-[#E8E2D8] overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all"
            >
              <div>
                <div className="aspect-[4/3] bg-[#EAE4D9] relative overflow-hidden">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {drink.badge && (
                    <span className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#162E25] text-[11px] font-semibold px-2 py-0.5 rounded border border-[#DDD6C8]">
                      {drink.badge}
                    </span>
                  )}
                  {/* F&B Insight Tag */}
                  <span className="absolute bottom-3 right-3 bg-[#162E25]/90 text-white text-[11px] font-mono tabular-nums px-2 py-0.5 rounded">
                    Biên lãi: {drink.profitMargin}
                  </span>
                </div>

                <div className="p-5">
                  <div className="text-xs text-[#73827A] font-serif italic mb-1">
                    {drink.japaneseName}
                  </div>
                  <h3 className="text-base font-semibold text-[#162E25] mb-2">
                    {drink.name}
                  </h3>
                  <p className="text-xs text-[#526058] line-clamp-2 leading-relaxed mb-4">
                    {drink.description}
                  </p>

                  {/* Recipe & Cost Breakdown (Key for business model!) */}
                  <div className="p-3 bg-[#FBF9F6] rounded-md border border-[#EFEAE2] text-xs space-y-1.5 mb-4">
                    <div className="flex justify-between items-center text-[#63726A]">
                      <span>Cost nguyên liệu:</span>
                      <span className="font-mono tabular-nums font-semibold text-[#8F3B2C]">
                        ~{formatPrice(drink.costEstimate)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[#63726A]">
                      <span>Thời gian ra món:</span>
                      <span className="font-mono tabular-nums text-[#162E25] font-semibold">4 - 5 phút (Đánh chasen tươi)</span>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="text-[11px] text-[#697971]">
                    <span className="font-medium text-[#162E25]">Thành phần: </span>
                    {drink.recipeHighlights.join(' · ')}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                  <div className="font-mono tabular-nums text-lg font-bold text-[#162E25]">
                    {formatPrice(drink.price)}
                  </div>

                  <button
                    onClick={() => handleOrderDrink(drink)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      addedDrinkId === drink.id
                        ? 'bg-[#2E6B4B] text-white'
                        : 'bg-[#162E25] hover:bg-[#234537] text-white shadow-xs'
                    }`}
                  >
                    {addedDrinkId === drink.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã thêm</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Đặt Ly</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The 5-Minute Artisanal Matcha Ritual SOP (Why 5 minutes creates massive brand value) */}
        <div className="bg-white rounded-xl border border-[#DCD5C8] p-6 lg:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EFEAE2]">
            <div>
              <div className="text-xs font-semibold tracking-wider text-[#355243] uppercase mb-1">
                Chuẩn Hóa Quy Trình Pha Chế (SOP)
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#162E25]">
                Vì Sao 5 Phút Là "Vũ Khí Kinh Doanh" Đắt Giá Nhất Của Matcha Specialty?
              </h3>
            </div>
            <div className="text-xs text-[#5C6C63] max-w-md bg-[#FAF8F5] p-3 rounded-md border border-[#E6DFD3]">
              Khách hàng sẵn sàng trả <strong>65.000đ - 85.000đ</strong> thay vì 25.000đ trà sữa công nghiệp chính là nhờ chứng kiến <strong className="text-[#162E25]">nghệ thuật 5 phút trà đạo trực tiếp tại quầy</strong>.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#EDE7DD]">
              <div className="font-mono text-xs font-bold text-[#2E6B4B] mb-1">PHÚT 1 (0:00 - 1:00)</div>
              <div className="text-xs font-semibold text-[#162E25] mb-1">Cân & Rây Tencha</div>
              <p className="text-[11px] text-[#63726A] leading-relaxed">
                Cân chính xác 3.5g - 4g bột matcha Uji qua lưới rây inox 1200 mesh để loại bỏ hoàn toàn vón cục trước khi châm nước.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#EDE7DD]">
              <div className="font-mono text-xs font-bold text-[#2E6B4B] mb-1">PHÚT 2 (1:00 - 2:00)</div>
              <div className="text-xs font-semibold text-[#162E25] mb-1">Tráng Nóng Chawan</div>
              <p className="text-[11px] text-[#63726A] leading-relaxed">
                Tráng nóng bát gốm Chawan và làm mềm nan chổi Chasen. Căn chuẩn nhiệt độ nước khoáng 78°C để không làm đắng vị trà.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#EDE7DD]">
              <div className="font-mono text-xs font-bold text-[#2E6B4B] mb-1">PHÚT 3 (2:00 - 3:00)</div>
              <div className="text-xs font-semibold text-[#162E25] mb-1">Đánh Chasen W-Motion</div>
              <p className="text-[11px] text-[#63726A] leading-relaxed">
                Đánh cổ tay chuyển động chữ W trong 35-45 giây trước mặt khách, tạo lớp micro-foam bọt tuyết xanh ngọc bích sánh mịn.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#EDE7DD]">
              <div className="font-mono text-xs font-bold text-[#2E6B4B] mb-1">PHÚT 4 (3:00 - 4:00)</div>
              <div className="text-xs font-semibold text-[#162E25] mb-1">Phân Tầng Nghệ Thuật</div>
              <p className="text-[11px] text-[#63726A] leading-relaxed">
                Rót nền sữa yến mạch Oatly hoặc sữa tươi thanh trùng trên đá bi, sau đó rót nhẹ lớp matcha nổi bồng bềnh phân tầng tuyệt đẹp.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#EDE7DD]">
              <div className="font-mono text-xs font-bold text-[#2E6B4B] mb-1">PHÚT 5 (4:00 - 5:00)</div>
              <div className="text-xs font-semibold text-[#162E25] mb-1">Hoàn Thiện & Trao Tay</div>
              <p className="text-[11px] text-[#63726A] leading-relaxed">
                Rắc nhẹ lớp bột matcha trang trí, đậy nắp và trao tay khách hàng kèm câu chuyện nguồn gốc vụ trà Kyoto tạo khoảnh khắc check-in lan tỏa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
