import React, { useState } from 'react';
import { BUSINESS_PACKAGES, BusinessPackage } from '../data/matchaData';
import { Calculator, Download, CheckCircle, HelpCircle, ArrowRight, TrendingUp } from 'lucide-react';

interface BusinessModelSectionProps {
  onOpenSampleModal: () => void;
}

export const BusinessModelSection: React.FC<BusinessModelSectionProps> = ({ onOpenSampleModal }) => {
  // Financial Calculator States
  const [dailyCups, setDailyCups] = useState<number>(120);
  const [avgPrice, setAvgPrice] = useState<number>(55000);
  const [cogsPercent, setCogsPercent] = useState<number>(27); // 27% cost
  const [rentAndUtilities, setRentAndUtilities] = useState<number>(18000000); // 18m rent
  const [staffCount, setStaffCount] = useState<number>(2);
  const [staffSalary, setStaffSalary] = useState<number>(7500000); // 7.5m per staff
  const [selectedPackage, setSelectedPackage] = useState<string>('kiosk-togo');

  // Calculations
  const monthlyRevenue = dailyCups * avgPrice * 30;
  const monthlyCogs = monthlyRevenue * (cogsPercent / 100);
  const monthlyGrossProfit = monthlyRevenue - monthlyCogs;
  const monthlyStaffCost = staffCount * staffSalary;
  const monthlyOpex = rentAndUtilities + monthlyStaffCost + (monthlyRevenue * 0.05); // 5% packaging & misc
  const monthlyNetProfit = Math.max(0, monthlyGrossProfit - monthlyOpex);
  const netMarginPercent = monthlyRevenue > 0 ? (monthlyNetProfit / monthlyRevenue) * 100 : 0;
  
  // Payback estimation on 165M average kiosk setup
  const estimatedInitialCap = 165000000;
  const paybackMonths = monthlyNetProfit > 0 ? (estimatedInitialCap / monthlyNetProfit).toFixed(1) : '> 24';

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleDownloadDeck = () => {
    // Generate clean business plan summary text file download
    const content = `MIDORI & CO. - BẢN KẾ HOẠCH KINH DOANH MÔ HÌNH MATCHA UJI
======================================================
1. MÔ HÌNH KINH DOANH: Matcha Bar To-Go & Specialty Atelier
2. DỰ TOÁN TÀI CHÍNH MÔ PHỎNG:
   - Sản lượng mục tiêu: ${dailyCups} ly/ngày (${dailyCups * 30} ly/tháng)
   - Giá bán bình quân: ${formatPrice(avgPrice)}/ly
   - Doanh thu dự kiến: ${formatPrice(monthlyRevenue)}/tháng
   - Tỷ lệ Cost nguyên liệu: ${cogsPercent}% (~${formatPrice(monthlyCogs)}/tháng)
   - Lợi nhuận gộp: ${formatPrice(monthlyGrossProfit)}/tháng
   - Chi phí cố định (Mặt bằng + Nhân sự ${staffCount} người): ${formatPrice(monthlyOpex)}/tháng
   - LỢI NHUẬN RÒNG DỰ KIẾN: ${formatPrice(monthlyNetProfit)}/tháng
   - Tỷ suất lợi nhuận ròng: ${netMarginPercent.toFixed(1)}%
   - Thời gian hoàn vốn dự tính: ${paybackMonths} tháng (Vốn đầu tư ban đầu: ${formatPrice(estimatedInitialCap)})
======================================================
3. TIÊU CHUẨN NGUYÊN LIỆU:
   - Nguồn gốc: Wazuka, Uji, Kyoto, Nhật Bản
   - Giấy chứng nhận: JAS Organic, COA kiểm định vi sinh & kim loại nặng
   - Quy chuẩn: Xay cối đá granite, bột mịn 1200+ mesh
======================================================
Liên hệ tư vấn nhượng quyền & cung ứng sỉ: Midori Matcha Lab`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ke_Hoach_Kinh_Doanh_Matcha_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="business" className="py-16 lg:py-24 border-b border-[#E8E2D8] bg-[#F7F4EE]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#355243] uppercase mb-2">
            <span>Chiến Lược F&B 2026</span>
            <span aria-hidden="true">·</span>
            <span>Mô Hình Kinh Doanh & Dòng Tiền</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#162E25] tracking-tight [text-wrap:balance]">
            Mô Hình Kinh Doanh Matcha Đột Phá & Bền Vững
          </h2>
          <p className="text-base text-[#526058] mt-3 leading-relaxed">
            Khác biệt với trà sữa truyền thống bão hòa, Matcha Uji chất lượng cao đánh trúng xu hướng <strong>sức khỏe (healthy), tỉnh thức và lối sống tinh tế</strong>. Lợi thế cốt lõi nằm ở tỷ lệ cost nguyên liệu thấp, quy trình tinh gọn và tệp khách hàng trung thành sẵn sàng chi trả cao.
          </p>
        </div>

        {/* 3 Business Packages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {BUSINESS_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`bg-white rounded-xl border p-7 flex flex-col justify-between transition-all cursor-pointer relative ${
                selectedPackage === pkg.id
                  ? 'border-[#162E25] shadow-lg ring-1 ring-[#162E25]'
                  : 'border-[#E4DDD1] hover:border-[#C4BAAB]'
              }`}
            >
              <div>
                {/* Header of Card */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#2E6B4B]">
                    {pkg.badge}
                  </span>
                  {pkg.popular && (
                    <span className="text-[11px] bg-[#162E25] text-white font-semibold px-2 py-0.5 rounded">
                      Được Lựa Chọn Nhiều Nhất
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl font-semibold text-[#162E25] mb-1">
                  {pkg.title}
                </h3>
                <p className="text-xs text-[#526058] leading-relaxed mb-6">
                  {pkg.subTitle}
                </p>

                {/* KPI Metrics */}
                <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#EDE7DD] space-y-2.5 mb-6 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6D7D75]">Vốn đầu tư:</span>
                    <span className="font-mono tabular-nums font-bold text-[#162E25]">{pkg.initialInvestment}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6D7D75]">Hoàn vốn dự kiến:</span>
                    <span className="font-mono tabular-nums font-semibold text-[#2E6B4B]">{pkg.paybackMonths}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6D7D75]">Biên lãi gộp:</span>
                    <span className="font-mono tabular-nums font-semibold text-[#162E25]">{pkg.grossMargin}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6D7D75]">Mặt bằng:</span>
                    <span className="font-medium text-[#162E25]">{pkg.spaceRequired}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <div className="text-xs font-semibold text-[#162E25] uppercase tracking-wider mb-2">
                    Lợi thế mô hình:
                  </div>
                  <ul className="space-y-2 text-xs text-[#4F5E56]">
                    {pkg.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#2E6B4B] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-[#F0EAE1]">
                <button
                  onClick={onOpenSampleModal}
                  className="w-full py-2.5 bg-[#162E25] hover:bg-[#234537] text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Tư Vấn Chi Tiết Gói Này</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive ROI & Cash Flow Calculator (Heart of Business Decision) */}
        <div className="bg-white rounded-2xl border border-[#DCD5C8] p-6 lg:p-10 shadow-sm mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#EDE7DD]">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#355243] uppercase mb-1">
                <Calculator className="w-4 h-4 text-[#2E6B4B]" />
                <span>Công Cụ Định Lượng Tài Chính</span>
              </div>
              <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-[#162E25]">
                Bảng Tính Dòng Tiền & Lợi Nhuận Thực Tế
              </h3>
              <p className="text-xs sm:text-sm text-[#5D6D65] mt-1">
                Kéo thanh trượt để kiểm tra tính khả thi dòng tiền của quán theo vị trí mặt bằng và năng lực bán hàng.
              </p>
            </div>

            <button
              onClick={handleDownloadDeck}
              className="px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#F0EAE1] text-[#162E25] text-xs font-semibold rounded-md border border-[#DCD5C9] transition-colors flex items-center gap-2 cursor-pointer self-start lg:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải Báo Cáo Kế Hoạch (.TXT)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Controls (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: Daily Cups */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-[#162E25]">1. Số ly phục vụ bình quân mỗi ngày:</span>
                  <span className="font-mono tabular-nums text-sm font-bold text-[#162E25] bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#E0D8CB]">
                    {dailyCups} ly / ngày ({dailyCups * 30} ly/tháng)
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="350"
                  step="10"
                  value={dailyCups}
                  onChange={(e) => setDailyCups(Number(e.target.value))}
                  className="w-full h-2 bg-[#EAE4D9] rounded-lg appearance-none cursor-pointer accent-[#162E25]"
                />
                <div className="flex justify-between text-[11px] text-[#7A8981] mt-1 font-mono">
                  <span>50 ly (Mức an toàn)</span>
                  <span>150 ly (Mức phổ biến)</span>
                  <span>350 ly (Vị trí đắc địa)</span>
                </div>
              </div>

              {/* Slider 2: Average Price */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-[#162E25]">2. Giá bán trung bình mỗi ly:</span>
                  <span className="font-mono tabular-nums text-sm font-bold text-[#162E25] bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#E0D8CB]">
                    {formatPrice(avgPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="35000"
                  max="85000"
                  step="5000"
                  value={avgPrice}
                  onChange={(e) => setAvgPrice(Number(e.target.value))}
                  className="w-full h-2 bg-[#EAE4D9] rounded-lg appearance-none cursor-pointer accent-[#162E25]"
                />
                <div className="flex justify-between text-[11px] text-[#7A8981] mt-1 font-mono">
                  <span>35.000đ (Bình dân)</span>
                  <span>55.000đ (Kiosk To-Go)</span>
                  <span>85.000đ (Tea Room cao cấp)</span>
                </div>
              </div>

              {/* Slider 3: Cost Rate */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-[#162E25]">3. Tỷ lệ Cost nguyên liệu & ly nắp (COGS):</span>
                  <span className="font-mono tabular-nums text-sm font-bold text-[#162E25] bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#E0D8CB]">
                    {cogsPercent}% (~{formatPrice(avgPrice * (cogsPercent / 100))}/ly)
                  </span>
                </div>
                <input
                  type="range"
                  min="22"
                  max="35"
                  step="1"
                  value={cogsPercent}
                  onChange={(e) => setCogsPercent(Number(e.target.value))}
                  className="w-full h-2 bg-[#EAE4D9] rounded-lg appearance-none cursor-pointer accent-[#162E25]"
                />
                <div className="flex justify-between text-[11px] text-[#7A8981] mt-1 font-mono">
                  <span>22% (Dùng Horeca 1kg)</span>
                  <span>27% (Chuẩn Midori)</span>
                  <span>35% (Sữa hạt cao cấp)</span>
                </div>
              </div>

              {/* Two Column Cost Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#162E25] mb-1.5">
                    Mặt bằng + Điện nước / tháng:
                  </label>
                  <select
                    value={rentAndUtilities}
                    onChange={(e) => setRentAndUtilities(Number(e.target.value))}
                    className="w-full p-2.5 text-xs bg-[#FAF8F5] border border-[#DCD5C9] rounded-md font-mono tabular-nums"
                  >
                    <option value={10000000}>10.000.000đ (Mặt bằng nhỏ / chung)</option>
                    <option value={18000000}>18.000.000đ (Kiosk sảnh tòa nhà / phố)</option>
                    <option value={30000000}>30.000.000đ (Mặt bằng trung tâm)</option>
                    <option value={45000000}>45.000.000đ (Mặt bằng đắc địa lớn)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#162E25] mb-1.5">
                    Nhân sự vận hành (Ca trực):
                  </label>
                  <select
                    value={staffCount}
                    onChange={(e) => setStaffCount(Number(e.target.value))}
                    className="w-full p-2.5 text-xs bg-[#FAF8F5] border border-[#DCD5C9] rounded-md font-mono tabular-nums"
                  >
                    <option value={1}>1 Barista (Quán nhỏ to-go)</option>
                    <option value={2}>2 Barista (Xoay 2 ca tiêu chuẩn)</option>
                    <option value={3}>3 Barista (Giờ cao điểm đông)</option>
                    <option value={4}>4 Nhân viên (Mô hình cafe ngồi lại)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Financial Results Scorecard (Right 5 Cols) */}
            <div className="lg:col-span-5 bg-[#FAF8F5] p-6 lg:p-7 rounded-xl border border-[#DED7CB] flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-[#3E5C4B] uppercase tracking-wider mb-4 pb-2 border-b border-[#E8E2D8]">
                  Dự Phóng Tài Chính Tháng
                </div>

                {/* Main Metrics */}
                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-xs text-[#6B7B73]">Tổng Doanh Thu Tháng:</span>
                    <div className="font-mono tabular-nums text-2xl lg:text-3xl font-bold text-[#162E25]">
                      {formatPrice(monthlyRevenue)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#EAE4D9] text-xs">
                    <div>
                      <span className="text-[#6B7B73]">Chi phí nguyên liệu:</span>
                      <div className="font-mono tabular-nums font-semibold text-[#8F3B2C]">
                        {formatPrice(monthlyCogs)}
                      </div>
                    </div>
                    <div>
                      <span className="text-[#6B7B73]">Lợi nhuận gộp ({(100 - cogsPercent)}%):</span>
                      <div className="font-mono tabular-nums font-semibold text-[#2E6B4B]">
                        {formatPrice(monthlyGrossProfit)}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#EAE4D9] text-xs">
                    <div className="flex justify-between text-[#6B7B73] mb-1">
                      <span>Định phí mặt bằng + Nhân sự:</span>
                      <span className="font-mono tabular-nums">{formatPrice(monthlyOpex)}</span>
                    </div>
                  </div>

                  {/* Net Profit Callout Box */}
                  <div className="p-4 bg-white rounded-lg border border-[#DCD5C9] shadow-xs">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-semibold text-[#162E25]">LỢI NHUẬN RÒNG / THÁNG (NET):</span>
                      <span className="font-mono tabular-nums font-bold text-[#2E6B4B] bg-[#E8F3ED] px-2 py-0.5 rounded text-[11px]">
                        Biên ròng: {netMarginPercent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="font-mono tabular-nums text-2xl font-bold text-[#2E6B4B]">
                      {formatPrice(monthlyNetProfit)}
                    </div>
                  </div>
                </div>

                {/* Payback period indicator */}
                <div className="p-3 bg-[#EAE4D9]/60 rounded-md border border-[#DDD6C8] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#162E25]">
                    <TrendingUp className="w-4 h-4 text-[#2E6B4B]" />
                    <span className="font-medium">Thời gian hoàn vốn dự kiến:</span>
                  </div>
                  <span className="font-mono tabular-nums font-bold text-sm text-[#162E25]">
                    {paybackMonths} tháng
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E0D8CB]">
                <button
                  onClick={onOpenSampleModal}
                  className="w-full py-3 bg-[#162E25] hover:bg-[#234537] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Nhận Hộp Mẫu Thử & Đặt Lịch Tư Vấn</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Business FAQ (Answering real founder questions) */}
        <div className="max-w-4xl mx-auto">
          <h4 className="font-serif text-2xl font-semibold text-[#162E25] mb-6 text-center">
            Câu Hỏi Thường Gặp Khi Khởi Nghiệp Mô Hình Matcha
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg border border-[#E8E2D8]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#162E25] mb-2">
                <HelpCircle className="w-4 h-4 text-[#2E6B4B]" />
                <span>Chưa từng pha chế có mở quán matcha được không?</span>
              </div>
              <p className="text-xs text-[#526058] leading-relaxed">
                Hoàn toàn được. Midori chuyển giao toàn bộ quy trình SOP chuẩn hóa từng gam bột, lượng nước và tốc độ đánh chasen điện/trúc. Đào tạo nhân sự chỉ mất 3 - 5 ngày là có thể ra ly đồng nhất 100%.
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-[#E8E2D8]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#162E25] mb-2">
                <HelpCircle className="w-4 h-4 text-[#2E6B4B]" />
                <span>Bột matcha để lâu có bị ngả vàng hoặc mất mùi không?</span>
              </div>
              <p className="text-xs text-[#526058] leading-relaxed">
                Matcha chuẩn Uji rất nhạy cảm với ánh sáng và nhiệt độ. Toàn bộ bao bì Midori sử dụng túi màng nhôm đa lớp khóa zip kín khí. Chúng tôi hướng dẫn phương pháp trữ tủ mát chuyên dụng giúp giữ sắc xanh ngọc và mùi thơm cốm tới 12 tháng.
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-[#E8E2D8]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#162E25] mb-2">
                <HelpCircle className="w-4 h-4 text-[#2E6B4B]" />
                <span>Giá nhập sỉ có biến động theo tỷ giá Yên Nhật không?</span>
              </div>
              <p className="text-xs text-[#526058] leading-relaxed">
                Midori ký hợp đồng bao tiêu sản lượng hàng năm trực tiếp với hợp tác xã trà Uji Kyoto, do đó giá sỉ tại Việt Nam luôn được giữ cố định theo hợp đồng 12 tháng, bảo vệ biên lợi nhuận cho đối tác.
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border border-[#E8E2D8]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#162E25] mb-2">
                <HelpCircle className="w-4 h-4 text-[#2E6B4B]" />
                <span>Hồ sơ pháp lý và xuất xứ sản phẩm ra sao?</span>
              </div>
              <p className="text-xs text-[#526058] leading-relaxed">
                Đầy đủ 100%: Tờ khai hải quan nhập khẩu chính ngạch, Chứng nhận xuất xứ C/O Form JV, Chứng nhận hữu cơ JAS Organic Nhật Bản, và Kết quả kiểm nghiệm vi sinh đạt chuẩn An toàn thực phẩm Bộ Y Tế.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
