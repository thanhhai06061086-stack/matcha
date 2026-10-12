import React, { useState } from 'react';
import { Coffee, CheckCircle, Send, ShieldCheck } from 'lucide-react';

interface SampleKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleKitModal: React.FC<SampleKitModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectName: '',
    city: 'Hà Nội',
    timeline: 'Mở quán trong 1-2 tháng tới',
    note: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-xl max-w-lg w-full border border-[#DED7CB] shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6B7A72] hover:text-[#162E25] text-sm p-1 cursor-pointer"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#355243] uppercase mb-2">
              <Coffee className="w-4 h-4 text-[#2E6B4B]" />
              <span>Chương Trình Đối Tác F&B 2026</span>
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[#162E25] mb-2">
              Đăng Ký Nhận Hộp Mẫu Thử (Sample Kit)
            </h3>
            <p className="text-xs text-[#526058] leading-relaxed mb-6">
              Chúng tôi gửi tặng miễn phí hộp sample gồm <strong>3 cấp độ bột Matcha Uji & Hojicha (30g/loại)</strong> kèm trọn bộ tài liệu tính cost ly và công thức chuẩn quán.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#162E25] mb-1">
                  Họ và tên người đại diện *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Thanh Hải"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#DCD5C9] rounded-md focus:border-[#162E25] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#162E25] mb-1">
                    Số điện thoại / Zalo *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="09xx xxx xxx"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#DCD5C9] rounded-md focus:border-[#162E25] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#162E25] mb-1">
                    Tỉnh / Thành phố mở quán *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#DCD5C9] rounded-md focus:border-[#162E25] focus:outline-none"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Tỉnh thành khác">Tỉnh thành khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#162E25] mb-1">
                  Tên quán / Dự án dự kiến *
                </label>
                <input
                  type="text"
                  required
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  placeholder="Ví dụ: Kiosk Matcha Cầu Giấy / Kumo Tea"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#DCD5C9] rounded-md focus:border-[#162E25] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#162E25] mb-1">
                  Kế hoạch triển khai:
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#DCD5C9] rounded-md focus:border-[#162E25] focus:outline-none"
                >
                  <option value="Mở quán trong 1-2 tháng tới">Mở quán trong 1-2 tháng tới</option>
                  <option value="Đang có quán sẵn cần đổi nguồn nguyên liệu tốt hơn">Đang có quán sẵn cần đổi nguồn nguyên liệu tốt hơn</option>
                  <option value="Nghiên cứu thị trường & lập kế hoạch vốn">Nghiên cứu thị trường & lập kế hoạch vốn</option>
                  <option value="Muốn mua thử nghiệm số lượng ít">Muốn mua thử nghiệm số lượng ít</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#162E25] mb-1">
                  Ghi chú hoặc mong muốn đặc biệt:
                </label>
                <textarea
                  rows={2}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Ví dụ: Cần tư vấn thêm máy đánh chasen điện và máy làm đá bi..."
                  className="w-full px-3.5 py-2 text-xs bg-white border border-[#DCD5C9] rounded-md focus:border-[#162E25] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#162E25] hover:bg-[#234537] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi Yêu Cầu Nhận Sample Kit</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#718077] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E6B4B]" />
                <span>Cam kết bảo mật thông tin & không spam cuộc gọi</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-[#E8F3ED] text-[#2E6B4B] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[#162E25] mb-2">
              Đăng Ký Thành Công!
            </h3>
            <p className="text-xs text-[#526058] leading-relaxed mb-6">
              Chuyên viên tư vấn F&B của Midori sẽ liên hệ qua Zalo/Điện thoại trong vòng <strong>2 giờ làm việc</strong> để xác nhận địa chỉ và gửi kiện hàng Sample Kit đến <strong className="text-[#162E25]">{formData.city}</strong>.
            </p>

            <div className="p-4 bg-white rounded-lg border border-[#E0D8CB] text-xs text-left mb-6 space-y-1.5 font-mono">
              <div className="text-[#6D7D75]">Mã hồ sơ: <span className="font-bold text-[#162E25]">#KIT-{Date.now().toString().slice(-6)}</span></div>
              <div className="text-[#6D7D75]">Đại diện: <span className="text-[#162E25]">{formData.fullName}</span></div>
              <div className="text-[#6D7D75]">Dự án: <span className="text-[#162E25]">{formData.projectName}</span></div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-[#162E25] hover:bg-[#234537] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
            >
              Hoàn Tất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
