import React, { useState } from 'react';
import { SOMMELIER_QUESTIONS, PRODUCTS, Product } from '../data/matchaData';
import { Sparkles, ArrowRight, Check, RotateCcw } from 'lucide-react';

interface SommelierQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const SommelierQuizModal: React.FC<SommelierQuizModalProps> = ({
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (questionId: string, optionId: string) => {
    const updated = { ...answers, [questionId]: optionId };
    setAnswers(updated);

    if (currentStep < SOMMELIER_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Determine recommendation
      let match = PRODUCTS[0]; // default Matsu
      if (updated['goal'] === 'business-cafe') {
        match = PRODUCTS.find(p => p.id === 'horeca-master-bag-1kg') || PRODUCTS[5];
      } else if (updated['goal'] === 'daily-latte') {
        match = PRODUCTS.find(p => p.id === 'barista-asahi') || PRODUCTS[1];
      } else if (updated['goal'] === 'traditional-tea') {
        match = PRODUCTS.find(p => p.id === 'ceremonial-matsu') || PRODUCTS[0];
      } else {
        match = PRODUCTS.find(p => p.id === 'barista-asahi') || PRODUCTS[1];
      }
      setRecommendedProduct(match);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendedProduct(null);
  };

  const currentQ = SOMMELIER_QUESTIONS[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] rounded-xl max-w-lg w-full border border-[#DED7CB] shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6B7A72] hover:text-[#162E25] text-sm p-1 cursor-pointer"
        >
          ✕
        </button>

        {!recommendedProduct ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#355243] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2E6B4B]" />
              <span>Matcha Sommelier Finder (Bước {currentStep + 1}/{SOMMELIER_QUESTIONS.length})</span>
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[#162E25] mb-2">
              {currentQ.title}
            </h3>
            <p className="text-xs text-[#6F7E75] mb-6">
              Trả lời 2 câu hỏi ngắn để chọn đúng cấp độ matcha tối ưu cho nhu cầu của bạn.
            </p>

            <div className="space-y-3">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className="w-full text-left p-4 rounded-lg bg-white border border-[#E4DDD1] hover:border-[#162E25] hover:bg-[#FAF8F5] transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="text-sm font-semibold text-[#162E25] group-hover:text-[#234537] mb-0.5">
                    {opt.label}
                  </div>
                  <div className="text-xs text-[#6B7B73] leading-relaxed">
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#2E6B4B] uppercase mb-2">
              <Check className="w-4 h-4" />
              <span>Kết Quả Đề Xuất Dành Riêng Cho Bạn</span>
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[#162E25] mb-4">
              {recommendedProduct.name}
            </h3>

            <div className="bg-white p-4 rounded-lg border border-[#E2DBD0] mb-6 flex gap-4 items-center">
              <img
                src={recommendedProduct.image}
                alt={recommendedProduct.name}
                className="w-20 h-20 object-cover rounded-md bg-[#EDE7DD]"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs space-y-1">
                <div className="font-semibold text-[#162E25]">{recommendedProduct.tag}</div>
                <div className="text-[#687870]">{recommendedProduct.weight} · {recommendedProduct.origin}</div>
                <div className="font-mono tabular-nums text-sm font-bold text-[#162E25]">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(recommendedProduct.price)}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#4F5E56] leading-relaxed mb-6">
              {recommendedProduct.description}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  onAddToCart(recommendedProduct);
                  onClose();
                }}
                className="flex-1 py-3 bg-[#162E25] hover:bg-[#234537] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Thêm Vào Giỏ Hàng</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleReset}
                className="p-3 bg-[#EAE4D9]/70 hover:bg-[#EAE4D9] text-[#162E25] text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center justify-center"
                title="Làm lại trắc nghiệm"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
