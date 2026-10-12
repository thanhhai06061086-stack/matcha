import React from 'react';
import { ShoppingBag, Sparkles, Coffee } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  onOpenSampleModal: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenQuiz,
  onOpenSampleModal,
  activeSection,
  onNavigate
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-left group cursor-pointer focus-visible:outline-none"
        >
          <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-[#162E25] group-hover:text-[#2A4736] transition-colors whitespace-nowrap shrink-0">
            MIDORI & CO.
          </span>
        </button>

        {/* Zone 2: 5 Concise Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-[#46544C]">
          <button
            onClick={() => onNavigate('products')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#162E25] cursor-pointer pb-1 border-b-2 ${
              activeSection === 'products' ? 'border-[#162E25] text-[#162E25] font-semibold' : 'border-transparent'
            }`}
          >
            Sản Phẩm Trà Đạo
          </button>
          <button
            onClick={() => onNavigate('drinks')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#162E25] cursor-pointer pb-1 border-b-2 ${
              activeSection === 'drinks' ? 'border-[#162E25] text-[#162E25] font-semibold' : 'border-transparent'
            }`}
          >
            Menu Quán
          </button>
          <button
            onClick={() => onNavigate('customizer')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#162E25] cursor-pointer pb-1 border-b-2 ${
              activeSection === 'customizer' ? 'border-[#162E25] text-[#162E25] font-semibold' : 'border-transparent'
            }`}
          >
            Tự Phối Ly (Lab)
          </button>
          <button
            onClick={() => onNavigate('business')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#162E25] cursor-pointer pb-1 border-b-2 ${
              activeSection === 'business' ? 'border-[#162E25] text-[#162E25] font-semibold' : 'border-transparent'
            }`}
          >
            Mô Hình Kinh Doanh & ROI
          </button>
          <button
            onClick={() => onNavigate('heritage')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#162E25] cursor-pointer pb-1 border-b-2 ${
              activeSection === 'heritage' ? 'border-[#162E25] text-[#162E25] font-semibold' : 'border-transparent'
            }`}
          >
            Di Sản Uji Kyoto
          </button>
        </nav>

        {/* Zone 3: Primary Action & Shopping Bag */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenQuiz}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#162E25] bg-[#EAE4D9]/60 hover:bg-[#EAE4D9] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
            title="Trắc nghiệm chọn loại Matcha phù hợp"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#162E25]" />
            <span>Chọn Gu Matcha</span>
          </button>

          <button
            onClick={onOpenSampleModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#162E25] hover:bg-[#234537] rounded-md transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Nhận Mẫu Thử B2B</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Giỏ hàng"
            className="relative p-2.5 text-[#162E25] hover:bg-[#EAE4D9] rounded-md transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8F3B2C] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
