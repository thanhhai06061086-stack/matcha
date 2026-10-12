import React, { useState } from 'react';
import { CartItem } from './CartDrawer';
import { ShieldCheck, CheckCircle2, QrCode, Truck, CreditCard, Copy, Check } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vietqr' | 'card'>('vietqr');
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Hà Nội',
    note: ''
  });

  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingFee = rawSubtotal >= 600000 ? 0 : 30000;
  const finalTotal = rawSubtotal + shippingFee;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `MDR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('confirmed');
    onOrderSuccess();
  };

  const handleCopyAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-xl max-w-2xl w-full border border-[#DED7CB] shadow-2xl p-6 sm:p-8 relative my-6">
        
        {step === 'form' ? (
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8] mb-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#162E25]">
                  Xác Nhận Đơn Hàng & Thanh Toán
                </h3>
                <p className="text-xs text-[#63726A] mt-0.5">
                  Đơn hàng gồm {items.length} mặt hàng · Tổng giá trị: <strong className="text-[#162E25] font-mono">{formatPrice(finalTotal)}</strong>
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-[#6B7A72] hover:text-[#162E25] p-1 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Customer Information */}
              <div>
                <div className="text-xs font-semibold text-[#162E25] uppercase tracking-wider mb-3">
                  1. Thông tin giao hàng
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-[#526058] mb-1">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD5C9] rounded focus:outline-none focus:border-[#162E25]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#526058] mb-1">Số điện thoại nhận hàng *</label>
                    <input
                      type="tel"
                      required
                      placeholder="09xx xxx xxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD5C9] rounded focus:outline-none focus:border-[#162E25] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-[#526058] mb-1">Địa chỉ giao hàng chi tiết *</label>
                    <input
                      type="text"
                      required
                      placeholder="Số nhà, tên đường, phường/xã"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD5C9] rounded focus:outline-none focus:border-[#162E25]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#526058] mb-1">Tỉnh / Thành phố *</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DCD5C9] rounded focus:outline-none focus:border-[#162E25]"
                    >
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Tỉnh khác">Tỉnh khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#526058] mb-1">Ghi chú đơn hàng (Tùy chọn)</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DCD5C9] rounded focus:outline-none focus:border-[#162E25]"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <div className="text-xs font-semibold text-[#162E25] uppercase tracking-wider mb-3">
                  2. Phương thức thanh toán
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vietqr')}
                    className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                      paymentMethod === 'vietqr'
                        ? 'border-[#162E25] bg-white shadow-xs ring-1 ring-[#162E25]'
                        : 'border-[#E4DDD1] bg-white/70 hover:border-[#C4BAAB]'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs text-[#162E25] mb-1">
                      <QrCode className="w-4 h-4 text-[#2E6B4B]" />
                      <span>Chuyển Khoản VietQR</span>
                    </div>
                    <p className="text-[11px] text-[#63726A]">Quét mã QR 24/7 tự động xác nhận</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#162E25] bg-white shadow-xs ring-1 ring-[#162E25]'
                        : 'border-[#E4DDD1] bg-white/70 hover:border-[#C4BAAB]'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs text-[#162E25] mb-1">
                      <Truck className="w-4 h-4 text-[#2E6B4B]" />
                      <span>Nhận Hàng (COD)</span>
                    </div>
                    <p className="text-[11px] text-[#63726A]">Kiểm tra hàng trước khi thanh toán</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#162E25] bg-white shadow-xs ring-1 ring-[#162E25]'
                        : 'border-[#E4DDD1] bg-white/70 hover:border-[#C4BAAB]'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold text-xs text-[#162E25] mb-1">
                      <CreditCard className="w-4 h-4 text-[#2E6B4B]" />
                      <span>Thẻ Visa / Master</span>
                    </div>
                    <p className="text-[11px] text-[#63726A]">Cổng thanh toán bảo mật tiêu chuẩn</p>
                  </button>
                </div>
              </div>

              {/* VietQR instructions panel if selected */}
              {paymentMethod === 'vietqr' && (
                <div className="p-4 bg-white rounded-lg border border-[#E0D8CB] flex flex-col sm:flex-row items-center gap-4 text-xs">
                  {/* Generated QR Mockup */}
                  <div className="w-28 h-28 bg-[#162E25] p-2 rounded-md flex flex-col items-center justify-center text-white shrink-0">
                    <QrCode className="w-16 h-16 text-white" />
                    <span className="text-[9px] font-mono tracking-widest mt-1">VIETQR 24/7</span>
                  </div>

                  <div className="flex-1 space-y-1.5 w-full">
                    <div className="font-semibold text-[#162E25] text-xs">
                      Thông tin chuyển khoản định danh:
                    </div>
                    <div className="flex justify-between items-center text-[#55645C]">
                      <span>Ngân hàng:</span>
                      <strong className="text-[#162E25]">Vietcombank (Hội sở)</strong>
                    </div>
                    <div className="flex justify-between items-center text-[#55645C]">
                      <span>Số tài khoản:</span>
                      <div className="flex items-center gap-1.5">
                        <strong className="font-mono text-[#162E25]">1048829988</strong>
                        <button
                          type="button"
                          onClick={() => handleCopyAccount('1048829988')}
                          className="text-[#6B7B73] hover:text-[#162E25] cursor-pointer"
                          title="Sao chép"
                        >
                          {copied ? <Check className="w-3 h-3 text-[#2E6B4B]" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[#55645C]">
                      <span>Chủ tài khoản:</span>
                      <strong className="text-[#162E25]">MIDORI MATCHA LAB</strong>
                    </div>
                    <div className="flex justify-between items-center text-[#55645C]">
                      <span>Số tiền cần chuyển:</span>
                      <strong className="font-mono tabular-nums text-[#8F3B2C] text-sm">{formatPrice(finalTotal)}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#162E25] hover:bg-[#234537] text-white text-xs font-semibold rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Hoàn Tất Đặt Hàng ({formatPrice(finalTotal)})</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A8A81]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E6B4B]" />
                <span>Giao hàng hỏa tốc trong 24h · Hỗ trợ đồng kiểm trước khi nhận</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-[#E8F3ED] text-[#2E6B4B] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-xs font-semibold text-[#2E6B4B] uppercase tracking-wider mb-1">
              Đặt Hàng Thành Công
            </div>

            <h3 className="font-serif text-3xl font-semibold text-[#162E25] mb-2">
              Cảm Ơn Quý Khách Đã Lựa Chọn Midori
            </h3>

            <p className="text-xs text-[#526058] max-w-md mx-auto leading-relaxed mb-6">
              Mã đơn hàng <strong className="font-mono text-[#162E25]">#{orderId}</strong> đã được ghi nhận vào hệ thống. Đơn hàng đang được chuẩn bị đóng gói chân không từ kho Kyoto Atelier.
            </p>

            {/* Receipt Summary Box */}
            <div className="p-5 bg-white rounded-lg border border-[#E0D8CB] text-xs text-left mb-6 max-w-md mx-auto space-y-2">
              <div className="flex justify-between text-[#687870]">
                <span>Người nhận:</span>
                <strong className="text-[#162E25]">{formData.fullName} ({formData.phone})</strong>
              </div>
              <div className="flex justify-between text-[#687870]">
                <span>Địa chỉ nhận:</span>
                <span className="text-[#162E25] truncate max-w-[240px]">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between text-[#687870]">
                <span>Phương thức:</span>
                <span className="text-[#162E25]">
                  {paymentMethod === 'vietqr' ? 'Chuyển khoản VietQR' : paymentMethod === 'cod' ? 'Thanh toán khi nhận (COD)' : 'Thẻ quốc tế'}
                </span>
              </div>
              <div className="flex justify-between text-[#687870] pt-2 border-t border-[#F0EAE1]">
                <span>Tổng thanh toán:</span>
                <strong className="font-mono tabular-nums text-sm text-[#162E25]">{formatPrice(finalTotal)}</strong>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#162E25] hover:bg-[#234537] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
            >
              Tiếp Tục Mua Sắm & Khám Phá
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
