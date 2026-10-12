import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSampleModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSampleModal }) => {
  return (
    <footer className="bg-[#162E25] text-[#D8E2DC] pt-16 pb-12 border-t border-[#234537]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#244738]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <span className="font-serif text-2xl font-semibold tracking-tight text-white mb-3 block">
              MIDORI & CO.
            </span>
            <p className="text-xs text-[#A8BDB1] leading-relaxed max-w-sm mb-6">
              Đơn vị tiên phong nhập khẩu và phát triển hệ sinh thái Matcha Uji nguyên bản tại Việt Nam. Đồng hành cùng hơn 85+ chuỗi F&B và nhà đầu tư xây dựng mô hình đồ uống tinh gọn, biên lợi nhuận cao.
            </p>

            <div className="text-xs text-[#8BA496] space-y-1 font-mono">
              <div>Văn phòng: Tầng 6, Tháp Doanh Nhân, Ba Đình, Hà Nội</div>
              <div>Xưởng Uji Atelier: Wazuka-cho, Soraku-gun, Kyoto, Japan</div>
              <div>Hotline / Zalo B2B: (+84) 988 238 910</div>
            </div>
          </div>

          {/* Nav Links Column 1 */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Sản Phẩm & Quán
            </div>
            <ul className="space-y-2.5 text-xs text-[#A8BDB1]">
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors cursor-pointer">
                  Matcha Ceremonial Đợt 1
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors cursor-pointer">
                  Matcha Barista Blend 100g
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors cursor-pointer">
                  Dụng cụ chasen & chawan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('drinks')} className="hover:text-white transition-colors cursor-pointer">
                  Menu đồ uống signature
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('customizer')} className="hover:text-white transition-colors cursor-pointer">
                  Tự phối ly cá nhân (Lab)
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2 */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Hợp Tác Kinh Doanh
            </div>
            <ul className="space-y-2.5 text-xs text-[#A8BDB1]">
              <li>
                <button onClick={() => onNavigate('business')} className="hover:text-white transition-colors cursor-pointer">
                  Mô hình Kiosk To-Go
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('business')} className="hover:text-white transition-colors cursor-pointer">
                  Bảng tính ROI & dòng tiền
                </button>
              </li>
              <li>
                <button onClick={onOpenSampleModal} className="hover:text-white transition-colors cursor-pointer text-[#6BCB95]">
                  Đăng ký nhận Sample Kit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('heritage')} className="hover:text-white transition-colors cursor-pointer">
                  Hồ sơ nguồn gốc Uji Kyoto
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('business')} className="hover:text-white transition-colors cursor-pointer">
                  Cung ứng sỉ Horeca 1kg
                </button>
              </li>
            </ul>
          </div>

          {/* Standards & Certifications */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Tiêu Chuẩn & Pháp Lý
            </div>
            <div className="space-y-3 text-xs text-[#A8BDB1]">
              <div className="p-3 bg-[#1C3A2F] rounded-md border border-[#274F40]">
                <div className="font-semibold text-white mb-0.5">JAS Organic Certified</div>
                <div className="text-[11px] text-[#8BA496]">Tiêu chuẩn nông nghiệp hữu cơ Nhật Bản</div>
              </div>

              <div className="p-3 bg-[#1C3A2F] rounded-md border border-[#274F40]">
                <div className="font-semibold text-white mb-0.5">C/O & COA Form JV</div>
                <div className="text-[11px] text-[#8BA496]">Chứng nhận xuất xứ & kiểm nghiệm Bộ Y Tế</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8BA496]">
          <div>
            © 2026 MIDORI & CO. Bản quyền thuộc về Midori Matcha Atelier.
          </div>
          <div className="flex gap-6 text-[11px]">
            <span>Chính sách đổi trả 7 ngày</span>
            <span aria-hidden="true">·</span>
            <span>Bảo mật thông tin</span>
            <span aria-hidden="true">·</span>
            <span>Điều khoản nhượng quyền F&B</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
