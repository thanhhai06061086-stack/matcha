import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, Award, TrendingUp, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onOpenCalculator: () => void;
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onOpenCalculator,
  onOpenQuiz
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-[#E8E2D8]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#355243] uppercase mb-4">
              <span>Đồn Điền Uji & Kyoto</span>
              <span aria-hidden="true">·</span>
              <span>100% Cối Đá Xay Chậm</span>
              <span aria-hidden="true">·</span>
              <span>Giải Pháp F&B Toàn Diện</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#162E25] font-semibold tracking-tight leading-[1.15] mb-6 [text-wrap:balance]">
              Tinh Hoa Trà Đạo Uji. Nền Tảng Kinh Doanh F&B Bền Vững.
            </h1>

            <p className="text-base sm:text-lg text-[#4A5750] leading-relaxed mb-8 max-w-2xl">
              Cung ứng bột Matcha Nhật Bản chính ngạch từ nông trại Kyoto với chứng nhận JAS Organic.
              Đồng hành cùng chủ quán xây dựng mô hình <strong className="font-semibold text-[#162E25]">Matcha Bar & Kiosk To-Go</strong> với tỷ suất lợi nhuận gộp lên đến <span className="font-mono tabular-nums font-semibold text-[#162E25]">75%</span> và thời gian hoàn vốn chỉ từ 4 tháng.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExploreProducts}
                className="px-6 py-3.5 bg-[#162E25] hover:bg-[#224537] text-white text-sm font-semibold rounded-md shadow-sm transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>Xem Sản Phẩm & Bảng Giá Sỉ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="px-6 py-3.5 bg-[#EAE4D9]/80 hover:bg-[#EAE4D9] text-[#162E25] text-sm font-semibold rounded-md transition-colors flex items-center gap-2 cursor-pointer border border-[#DCD5C9]"
              >
                <Calculator className="w-4 h-4 text-[#162E25]" />
                <span>Bảng Tính Dòng Tiền & ROI Quán</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#E8E2D8] text-xs text-[#526058]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E6B4B]" />
                <span>Không đắng gắt, umami đậm đà</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E6B4B]" />
                <span>Cost đồ uống tối ưu 12k - 16k/ly</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E6B4B]" />
                <span>Đào tạo công thức & chuyển giao SOP</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Artwork */}
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="aspect-[4/3] lg:aspect-[1/1] overflow-hidden rounded-lg shadow-xl border border-[#DFD8CC] bg-[#EDE8DE]">
                <img
                  src="/src/assets/images/hero_matcha_ceremony_1791770658172.jpg"
                  alt="Nghi thức pha trà matcha với chasen và bát chawan tại Uji Kyoto"
                  className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle Floating Editorial Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#FAF8F5]/95 backdrop-blur-md p-4 rounded-md border border-[#E4DDD1] shadow-sm">
                  <div className="flex items-center justify-between text-xs text-[#5D6B63] mb-1">
                    <span className="font-semibold text-[#162E25]">Ceremonial Harvest #1</span>
                    <span className="font-mono tabular-nums">40g / giờ xay</span>
                  </div>
                  <p className="text-xs text-[#3C4A42] leading-tight">
                    Búp trà Tencha hảo hạng che râm 21 ngày, nghiền bằng cối đá sa thạch nguyên khối.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof Row (Adhering to Section 1C/1H) */}
        <div className="mt-14 pt-10 border-t border-[#E8E2D8] grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[#162E25] mb-1">
              <Award className="w-4 h-4 text-[#2E6B4B]" />
              <span className="font-serif text-2xl lg:text-3xl font-semibold font-mono tabular-nums">100%</span>
            </div>
            <p className="text-xs font-semibold text-[#162E25]">Uji Kyoto Chính Ngạch</p>
            <p className="text-xs text-[#63726A] mt-0.5">Đầy đủ chứng nhận xuất xứ COA & JAS Organic</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[#162E25] mb-1">
              <TrendingUp className="w-4 h-4 text-[#2E6B4B]" />
              <span className="font-serif text-2xl lg:text-3xl font-semibold font-mono tabular-nums">72 - 78%</span>
            </div>
            <p className="text-xs font-semibold text-[#162E25]">Biên Lợi Nhuận Gộp F&B</p>
            <p className="text-xs text-[#63726A] mt-0.5">Cost nguyên liệu chỉ chiếm ~25-28% giá bán</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[#162E25] mb-1">
              <ShieldCheck className="w-4 h-4 text-[#2E6B4B]" />
              <span className="font-serif text-2xl lg:text-3xl font-semibold font-mono tabular-nums">85+</span>
            </div>
            <p className="text-xs font-semibold text-[#162E25]">Đối Tác Chuỗi & Quán Cafe</p>
            <p className="text-xs text-[#63726A] mt-0.5">Đang vận hành thành công khắp các thành phố lớn</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[#162E25] mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#2E6B4B]" />
              <span className="font-serif text-2xl lg:text-3xl font-semibold font-mono tabular-nums">4 - 6</span>
              <span className="text-xs text-[#63726A] self-end mb-1">tháng</span>
            </div>
            <p className="text-xs font-semibold text-[#162E25]">Điểm Hòa Vốn Kiosk To-Go</p>
            <p className="text-xs text-[#63726A] mt-0.5">Vốn đầu tư ban đầu tinh gọn, quay vòng vốn nhanh</p>
          </div>
        </div>

      </div>
    </section>
  );
};
