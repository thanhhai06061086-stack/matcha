import React from 'react';
import { Sparkles, Sun, ShieldCheck } from 'lucide-react';

export const HeritageSection: React.FC = () => {
  return (
    <section id="heritage" className="py-16 lg:py-24 border-b border-[#E8E2D8] bg-[#FAF8F5]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Farm Visual */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden border border-[#DCD5C9] shadow-lg group">
              <div className="aspect-[16/10] bg-[#EAE4D9]">
                <img
                  src="/src/assets/images/matcha_farm_kyoto_harvest_1791770701228.jpg"
                  alt="Đồn điền trà Uji Kyoto phủ giàn che râm tana"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Caption Tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#FAF8F5]/95 backdrop-blur-md p-4 rounded-md border border-[#E0D8CB] text-xs">
                <div className="flex justify-between items-center text-[#162E25] font-semibold mb-1">
                  <span>Wazuka Valley, Uji, Kyoto</span>
                  <span className="font-mono tabular-nums text-[#2E6B4B]">Vụ Xuân 2026</span>
                </div>
                <p className="text-[#55635B]">
                  Nơi khởi nguồn của văn hóa trà đạo Nhật Bản hơn 800 năm tuổi với thổ nhưỡng sương mù dày đặc và chênh lệch nhiệt độ ngày đêm lý tưởng.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Craft Story */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#355243] uppercase mb-3">
              <span>Nguồn Gốc & Triết Lý</span>
              <span aria-hidden="true">·</span>
              <span>Wabi-Sabi & Khoa Học Trà Đạo</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#162E25] tracking-tight leading-tight mb-6 [text-wrap:balance]">
              Vì Sao Matcha Uji Tạo Nên Rào Cản Cạnh Tranh Bền Vững Cho Quán Của Bạn?
            </h2>

            <p className="text-sm sm:text-base text-[#526058] leading-relaxed mb-8">
              Khách hàng ngày nay rất tinh tế: họ phân biệt ngay giữa bột trà xanh công nghiệp đắng chát với bột Matcha Uji ngọt hậu béo ngậy. Sự khác biệt đến từ 3 nguyên tắc bất di bất dịch của nghệ nhân Kyoto:
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-md bg-[#E8F0EA] border border-[#CCDCD0] flex items-center justify-center shrink-0 mt-0.5">
                  <Sun className="w-4 h-4 text-[#2E6B4B]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#162E25] mb-1">
                    1. Che Nắng 21 Ngày (Phương pháp Tana)
                  </h3>
                  <p className="text-xs text-[#5C6C63] leading-relaxed">
                    Trước khi thu hoạch, đồn điền được phủ bạt đen che khuất 98% ánh sáng mặt trời. Cây trà buộc phải đẩy mạnh sản sinh diệp lục và axit amin <strong className="font-medium text-[#162E25]">L-theanine</strong>, tạo nên màu xanh ngọc bích tự nhiên và vị ngọt Umami sâu thẳm.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-md bg-[#E8F0EA] border border-[#CCDCD0] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-[#2E6B4B]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#162E25] mb-1">
                    2. Tinh Lọc Tencha Tuyệt Đối
                  </h3>
                  <p className="text-xs text-[#5C6C63] leading-relaxed">
                    Sau khi hấp và sấy khô, lá trà trải qua công đoạn rút bỏ 100% cuống và gân lá xơ cứng, chỉ giữ lại phần thịt lá mỏng manh gọi là Tencha. Nhờ đó, ly đồ uống của quán luôn mịn màng không gợn cặn.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-md bg-[#E8F0EA] border border-[#CCDCD0] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#2E6B4B]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#162E25] mb-1">
                    3. Cối Đá Sa Thạch Granite Xay Chậm
                  </h3>
                  <p className="text-xs text-[#5C6C63] leading-relaxed">
                    Mỗi cối đá chỉ nghiền được 35g - 40g bột/giờ để bề mặt đá không bao giờ nóng lên làm cháy hương thơm tế nhị của trà. Hạt bột mịn đạt kích thước siêu vi 5-10 micron (1200+ mesh), tan ngay lập tức khi đánh chasen.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
