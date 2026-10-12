import React, { useState } from 'react';
import { Product } from '../data/matchaData';
import { Plus, Check, Sparkles, RefreshCw } from 'lucide-react';

interface DrinkBuilderLabProps {
  onAddToCart: (product: Product) => void;
}

interface CustomDrinkState {
  base: { id: string; name: string; extraPrice: number; color: string; desc: string };
  milk: { id: string; name: string; extraPrice: number; color: string };
  sweetness: string;
  ice: string;
  foam: { id: string; name: string; extraPrice: number; color: string };
  toppings: Array<{ id: string; name: string; extraPrice: number }>;
}

export const DrinkBuilderLab: React.FC<DrinkBuilderLabProps> = ({ onAddToCart }) => {
  const BASES = [
    { id: 'asahi', name: 'Matcha Uji Barista Blend', extraPrice: 0, color: '#3A6351', desc: 'Đậm đà hương thảo mộc, béo dịu tự nhiên' },
    { id: 'ceremonial', name: 'Ceremonial Matsu Đợt 1', extraPrice: 15000, color: '#254E3C', desc: '100% búp non Uji thượng phẩm, umami đỉnh cao' },
    { id: 'hojicha', name: 'Trà Rang Hojicha Kyoto', extraPrice: 0, color: '#825B32', desc: 'Thơm mùi củi nướng, ít caffein, ngọt hậu bùi' },
  ];

  const MILKS = [
    { id: 'oatly', name: 'Sữa Yến Mạch Oatly Barista', extraPrice: 12000, color: '#F4ECE1' },
    { id: 'dalat', name: 'Sữa Tươi Thanh Trùng Dalat', extraPrice: 0, color: '#FAF9F6' },
    { id: 'almond', name: 'Sữa Hạt Điều Nướng Thủ Công', extraPrice: 12000, color: '#EDE3D2' },
  ];

  const FOAMS = [
    { id: 'none', name: 'Không dùng Foam', extraPrice: 0, color: 'transparent' },
    { id: 'cheese', name: 'Cream Cheese Muối Hồng', extraPrice: 10000, color: '#FFFBF0' },
    { id: 'crema', name: 'Matcha Crema Tuyết Mịn', extraPrice: 12000, color: '#6A937D' },
  ];

  const AVAILABLE_TOPPINGS = [
    { id: 'warabi', name: 'Warabi Mochi Trúc Xanh', extraPrice: 12000 },
    { id: 'azuki', name: 'Đậu Đỏ Azuki Rim Đường Phèn', extraPrice: 8000 },
    { id: 'pearls', name: 'Trân Châu Củ Năng Giòn Dẻo', extraPrice: 8000 },
  ];

  const BASE_PRICE = 55000;

  const [state, setState] = useState<CustomDrinkState>({
    base: BASES[0],
    milk: MILKS[0],
    sweetness: '30%',
    ice: '70%',
    foam: FOAMS[1],
    toppings: [AVAILABLE_TOPPINGS[0]]
  });

  const [isAdded, setIsAdded] = useState(false);

  const calculateTotal = () => {
    const toppingTotal = state.toppings.reduce((sum, t) => sum + t.extraPrice, 0);
    return BASE_PRICE + state.base.extraPrice + state.milk.extraPrice + state.foam.extraPrice + toppingTotal;
  };

  const toggleTopping = (topping: { id: string; name: string; extraPrice: number }) => {
    const exists = state.toppings.some(t => t.id === topping.id);
    if (exists) {
      setState(prev => ({
        ...prev,
        toppings: prev.toppings.filter(t => t.id !== topping.id)
      }));
    } else {
      setState(prev => ({
        ...prev,
        toppings: [...prev.toppings, topping]
      }));
    }
  };

  const handleAddCustomToCart = () => {
    const toppingNames = state.toppings.map(t => t.name).join(', ') || 'Không topping';
    const customProduct: Product = {
      id: `custom-drink-${Date.now()}`,
      name: `Custom Matcha: ${state.base.name}`,
      japaneseName: 'カスタム オーダー ラテ',
      category: 'drink',
      tag: 'Công Thức Tự Phối',
      price: calculateTotal(),
      weight: 'Size L - 450ml',
      origin: 'Barista Lab Pha Tươi',
      harvest: 'Ngay khi đặt hàng',
      umami: state.base.id === 'ceremonial' ? 5 : 4,
      bitterness: 1,
      colorRating: 'Phân tầng nghệ thuật',
      description: `Đế: ${state.base.name} | Sữa: ${state.milk.name} | Kem: ${state.foam.name} | Ngọt: ${state.sweetness} | Đá: ${state.ice} | Topping: ${toppingNames}`,
      flavorNotes: [state.base.name, state.milk.name, state.foam.name],
      recommendedUse: 'Uống ngay khi còn mát lạnh',
      image: '/src/assets/images/product_iced_matcha_latte_1791770689064.jpg',
      inStock: true
    };

    onAddToCart(customProduct);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <section id="customizer" className="py-16 lg:py-24 border-b border-[#E8E2D8] bg-[#FAF8F5]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#355243] uppercase mb-2">
            <span>Matcha Customizer Lab</span>
            <span aria-hidden="true">·</span>
            <span>Trải Nghiệm Barista Tương Tác</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#162E25] tracking-tight">
            Tự Thiết Kế Ly Matcha Signature Của Bạn
          </h2>
          <p className="text-sm sm:text-base text-[#526058] mt-2 max-w-2xl">
            Tùy biến cốt trà, loại sữa hạt, độ ngọt và lớp bọt foam theo đúng gu ẩm thực cá nhân. Trải nghiệm trực quan quy trình phân tầng đồ uống của quán.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Visual Glass Preview (Interactive Animated Layers) */}
          <div className="lg:col-span-5 bg-white p-8 rounded-xl border border-[#E4DDD1] shadow-sm flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs text-[#6F7E75] mb-6 pb-3 border-b border-[#F0EAE1]">
              <span className="font-semibold text-[#162E25]">Mô Phỏng Ly Thủy Tinh (Visual Layer)</span>
              <button
                onClick={() => setState({
                  base: BASES[0],
                  milk: MILKS[0],
                  sweetness: '30%',
                  ice: '70%',
                  foam: FOAMS[1],
                  toppings: [AVAILABLE_TOPPINGS[0]]
                })}
                className="flex items-center gap-1 hover:text-[#162E25] cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Đặt lại</span>
              </button>
            </div>

            {/* Stylized Glass Graphic Container */}
            <div className="relative w-48 h-80 bg-gradient-to-b from-white/40 to-white/90 border-2 border-[#D8D0C3] rounded-b-3xl rounded-t-lg shadow-inner overflow-hidden p-2 flex flex-col justify-end">
              {/* Ice cubes visualization */}
              {state.ice !== '0%' && (
                <div className="absolute inset-0 pointer-events-none flex flex-wrap gap-2 p-4 justify-center items-center opacity-40">
                  <div className="w-8 h-8 border border-white/60 bg-white/40 rounded rotate-12 backdrop-blur-xs"></div>
                  <div className="w-9 h-9 border border-white/60 bg-white/40 rounded -rotate-6 backdrop-blur-xs"></div>
                  <div className="w-7 h-7 border border-white/60 bg-white/40 rounded rotate-45 backdrop-blur-xs"></div>
                </div>
              )}

              {/* Foam Layer (Top) */}
              {state.foam.id !== 'none' && (
                <div
                  className="w-full h-14 rounded-t transition-all duration-500 relative flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: state.foam.color }}
                >
                  <span className="text-[10px] font-semibold text-[#162E25]/80 bg-white/50 px-2 py-0.5 rounded backdrop-blur-xs">
                    {state.foam.name}
                  </span>
                </div>
              )}

              {/* Tea / Matcha Layer (Upper-Mid) */}
              <div
                className="w-full h-24 transition-all duration-500 relative flex items-center justify-center opacity-95 shadow-inner"
                style={{ backgroundColor: state.base.color }}
              >
                <span className="text-[11px] font-medium text-white/90 bg-black/30 px-2 py-0.5 rounded backdrop-blur-xs">
                  {state.base.name.split(' ')[0]} {state.base.name.split(' ')[1]}
                </span>
              </div>

              {/* Milk Layer (Mid-Lower) */}
              <div
                className="w-full h-28 transition-all duration-500 relative flex items-center justify-center shadow-inner"
                style={{ backgroundColor: state.milk.color }}
              >
                <span className="text-[10px] font-medium text-[#46544D] bg-white/70 px-2 py-0.5 rounded">
                  {state.milk.name.split(' ')[0]} {state.milk.name.split(' ')[1]}
                </span>
              </div>

              {/* Toppings Layer (Bottom) */}
              {state.toppings.length > 0 && (
                <div className="w-full h-12 bg-[#3A2419]/80 rounded-b-2xl transition-all duration-300 flex items-center justify-center gap-1 px-2">
                  <span className="text-[10px] text-white/90 font-medium truncate">
                    {state.toppings.map(t => t.name.split(' ')[0]).join(' + ')}
                  </span>
                </div>
              )}
            </div>

            {/* Price & Summary Box */}
            <div className="w-full mt-6 pt-5 border-t border-[#F0EAE1]">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs text-[#6F7E75]">Tổng giá ly tự pha:</span>
                <span className="font-mono tabular-nums text-2xl font-bold text-[#162E25]">
                  {formatPrice(calculateTotal())}
                </span>
              </div>
              <div className="text-xs text-[#526058] mb-4 space-y-0.5">
                <div>• Ngọt: {state.sweetness} · Đá: {state.ice}</div>
                <div>• Topping: {state.toppings.map(t => t.name).join(', ') || 'Không'}</div>
              </div>

              <button
                onClick={handleAddCustomToCart}
                className={`w-full py-3 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isAdded
                    ? 'bg-[#2E6B4B] text-white'
                    : 'bg-[#162E25] hover:bg-[#234537] text-white shadow-xs'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Đã Thêm Vào Giỏ Hàng!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Thêm Ly Này Vào Giỏ Hàng</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Base selection */}
            <div className="bg-white p-5 rounded-lg border border-[#E8E2D8]">
              <div className="text-xs font-semibold text-[#162E25] uppercase tracking-wider mb-3">
                1. Chọn Cốt Trà Nền (Base Tea)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BASES.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setState(prev => ({ ...prev, base: b }))}
                    className={`p-3 text-left rounded-md border text-xs transition-all cursor-pointer ${
                      state.base.id === b.id
                        ? 'border-[#162E25] bg-[#FAF8F5] shadow-xs'
                        : 'border-[#E4DDD1] hover:border-[#C4BAAB]'
                    }`}
                  >
                    <div className="font-semibold text-[#162E25] mb-0.5">{b.name}</div>
                    <div className="text-[11px] text-[#697971] mb-1.5">{b.desc}</div>
                    <div className="font-mono tabular-nums text-[11px] font-semibold text-[#162E25]">
                      {b.extraPrice > 0 ? `+${formatPrice(b.extraPrice)}` : 'Tiêu chuẩn'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Milk Selection */}
            <div className="bg-white p-5 rounded-lg border border-[#E8E2D8]">
              <div className="text-xs font-semibold text-[#162E25] uppercase tracking-wider mb-3">
                2. Chọn Loại Sữa (Milk Option)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {MILKS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setState(prev => ({ ...prev, milk: m }))}
                    className={`p-3 text-left rounded-md border text-xs transition-all cursor-pointer ${
                      state.milk.id === m.id
                        ? 'border-[#162E25] bg-[#FAF8F5] shadow-xs'
                        : 'border-[#E4DDD1] hover:border-[#C4BAAB]'
                    }`}
                  >
                    <div className="font-semibold text-[#162E25] mb-1">{m.name}</div>
                    <div className="font-mono tabular-nums text-[11px] font-semibold text-[#162E25]">
                      {m.extraPrice > 0 ? `+${formatPrice(m.extraPrice)}` : 'Đã bao gồm'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Foam / Kem Lớp Mặt */}
            <div className="bg-white p-5 rounded-lg border border-[#E8E2D8]">
              <div className="text-xs font-semibold text-[#162E25] uppercase tracking-wider mb-3">
                3. Lớp Kem Topping (Foam Layer)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {FOAMS.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setState(prev => ({ ...prev, foam: f }))}
                    className={`p-3 text-left rounded-md border text-xs transition-all cursor-pointer ${
                      state.foam.id === f.id
                        ? 'border-[#162E25] bg-[#FAF8F5] shadow-xs'
                        : 'border-[#E4DDD1] hover:border-[#C4BAAB]'
                    }`}
                  >
                    <div className="font-semibold text-[#162E25] mb-1">{f.name}</div>
                    <div className="font-mono tabular-nums text-[11px] font-semibold text-[#162E25]">
                      {f.extraPrice > 0 ? `+${formatPrice(f.extraPrice)}` : '+0đ'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Sweetness & Ice Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-lg border border-[#E8E2D8]">
                <div className="text-xs font-semibold text-[#162E25] uppercase tracking-wider mb-2">
                  Độ Ngọt: {state.sweetness}
                </div>
                <div className="flex gap-1.5">
                  {['0%', '30%', '50%', '70%', '100%'].map(s => (
                    <button
                      key={s}
                      onClick={() => setState(prev => ({ ...prev, sweetness: s }))}
                      className={`flex-1 py-1.5 text-xs font-mono tabular-nums rounded border transition-colors cursor-pointer ${
                        state.sweetness === s
                          ? 'border-[#162E25] bg-[#162E25] text-white font-semibold'
                          : 'border-[#E4DDD1] text-[#4F5E56] hover:border-[#C4BAAB]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-[#E8E2D8]">
                <div className="text-xs font-semibold text-[#162E25] uppercase tracking-wider mb-2">
                  Mức Đá: {state.ice}
                </div>
                <div className="flex gap-1.5">
                  {['0% (Nóng)', '30%', '70%', '100%'].map(i => (
                    <button
                      key={i}
                      onClick={() => setState(prev => ({ ...prev, ice: i }))}
                      className={`flex-1 py-1.5 text-xs font-mono tabular-nums rounded border transition-colors cursor-pointer ${
                        state.ice === i
                          ? 'border-[#162E25] bg-[#162E25] text-white font-semibold'
                          : 'border-[#E4DDD1] text-[#4F5E56] hover:border-[#C4BAAB]'
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Toppings Multi-select */}
            <div className="bg-white p-5 rounded-lg border border-[#E8E2D8]">
              <div className="text-xs font-semibold text-[#162E25] uppercase tracking-wider mb-3">
                5. Topping Thêm (Chọn nhiều)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {AVAILABLE_TOPPINGS.map(t => {
                  const isChecked = state.toppings.some(item => item.id === t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggleTopping(t)}
                      className={`p-3 text-left rounded-md border text-xs transition-all flex justify-between items-center cursor-pointer ${
                        isChecked
                          ? 'border-[#162E25] bg-[#FAF8F5]'
                          : 'border-[#E4DDD1] hover:border-[#C4BAAB]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-[#162E25]">{t.name}</div>
                        <div className="font-mono tabular-nums text-[11px] text-[#697971]">
                          +{formatPrice(t.extraPrice)}
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-[#162E25] border-[#162E25] text-white' : 'border-[#C4BAAB]'}`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
