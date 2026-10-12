import React, { useState } from 'react';
import { Product } from '../data/matchaData';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout
}) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [voucherMsg, setVoucherMsg] = useState<{ text: string; error: boolean } | null>(null);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 600000; // 600k VNĐ

  const rawSubtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = rawSubtotal * (discountPercent / 100);
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const isFreeShipping = rawSubtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const shippingFee = items.length === 0 ? 0 : (isFreeShipping ? 0 : 30000);
  const finalTotal = subtotalAfterDiscount + shippingFee;

  const progressPercent = Math.min(100, Math.round((rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = voucherCode.trim().toUpperCase();
    if (clean === 'MIDORI2026' || clean === 'KHOINGHIEP' || clean === 'BARISTA') {
      setDiscountPercent(10);
      setVoucherMsg({ text: 'Áp dụng mã thành công: Giảm 10% tổng đơn!', error: false });
    } else {
      setVoucherMsg({ text: 'Mã không hợp lệ. Thử nhập mã MIDORI2026', error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#DED7CB] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D8] flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#162E25]">
                Giỏ Hàng Của Bạn
              </h2>
              <div className="text-xs text-[#6B7B73]">
                {items.length === 0 ? 'Chưa có sản phẩm nào' : `${items.reduce((s, i) => s + i.quantity, 0)} sản phẩm`}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#6B7B73] hover:text-[#162E25] cursor-pointer text-sm"
            >
              ✕
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="px-6 py-3 bg-[#F3EFE8] border-b border-[#E6E0D4] text-xs">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[#55645C]">
                  {isFreeShipping ? (
                    <strong className="text-[#2E6B4B]">Bạn được Miễn Phí Vận Chuyển toàn quốc!</strong>
                  ) : (
                    <span>Mua thêm <strong className="text-[#162E25]">{formatPrice(FREE_SHIPPING_THRESHOLD - rawSubtotal)}</strong> để freeship</span>
                  )}
                </span>
                <span className="font-mono tabular-nums text-[11px] text-[#788880]">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#DDD5C7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2E6B4B] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 text-[#7E8D85]">
                <p className="text-sm">Giỏ hàng của bạn đang trống.</p>
                <p className="text-xs mt-1">Hãy khám phá bộ sưu tập Matcha Uji và thực đơn quán.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white rounded-lg border border-[#E8E2D8]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 object-cover rounded-md bg-[#EDE7DD] shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-semibold text-[#162E25] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#9EAEA5] hover:text-[#8F3B2C] cursor-pointer"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#728279] mt-0.5">
                        {item.product.weight}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center border border-[#DDD5C8] rounded bg-[#FAF8F5]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-[#64746C] hover:text-[#162E25] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono tabular-nums font-semibold text-[#162E25]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-[#64746C] hover:text-[#162E25] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-mono tabular-nums text-xs font-bold text-[#162E25]">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E8E2D8] bg-white space-y-4">
              {/* Voucher Code Form */}
              <form onSubmit={handleApplyVoucher} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Mã voucher (thử: MIDORI2026)"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#DDD5C8] rounded focus:outline-none focus:border-[#162E25] font-mono uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#EAE4D9] hover:bg-[#DED7CB] text-[#162E25] text-xs font-semibold rounded cursor-pointer transition-colors"
                >
                  Áp Dụng
                </button>
              </form>
              {voucherMsg && (
                <div className={`text-[11px] ${voucherMsg.error ? 'text-[#8F3B2C]' : 'text-[#2E6B4B]'}`}>
                  {voucherMsg.text}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5E6E65]">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span className="font-mono tabular-nums text-[#162E25]">{formatPrice(rawSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E6B4B]">
                    <span>Khuyến mãi ({discountPercent}%):</span>
                    <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí giao hàng:</span>
                  <span className="font-mono tabular-nums text-[#162E25]">
                    {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#162E25] pt-2 border-t border-[#F0EAE1]">
                  <span>Tổng thanh toán:</span>
                  <span className="font-mono tabular-nums text-base">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={onProceedCheckout}
                className="w-full py-3.5 bg-[#162E25] hover:bg-[#234537] text-white text-xs font-semibold rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Tiến Hành Đặt Hàng ({formatPrice(finalTotal)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A8A81]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E6B4B]" />
                <span>Cam kết chính hãng 100% Uji Kyoto · Đổi trả 7 ngày</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
