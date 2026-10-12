export interface Product {
  id: string;
  name: string;
  japaneseName: string;
  category: 'powder' | 'drink' | 'gear' | 'wholesale';
  tag: string;
  price: number;
  originalPrice?: number;
  weight: string;
  origin: string;
  harvest: string;
  umami: number; // 1-5
  bitterness: number; // 1-5
  colorRating: string;
  description: string;
  flavorNotes: string[];
  recommendedUse: string;
  image: string;
  inStock: boolean;
}

export interface CafeDrink {
  id: string;
  name: string;
  japaneseName: string;
  category: 'signature' | 'latte' | 'traditional' | 'refreshing';
  price: number;
  costEstimate: number; // For F&B business insight!
  profitMargin: string;
  description: string;
  recipeHighlights: string[];
  image: string;
  badge?: string;
}

export interface BusinessPackage {
  id: string;
  title: string;
  subTitle: string;
  badge: string;
  idealFor: string;
  spaceRequired: string;
  initialInvestment: string;
  paybackMonths: string;
  grossMargin: string;
  highlights: string[];
  includedItems: string[];
  popular?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'ceremonial-matsu',
    name: 'Uji Ceremonial Matcha "Matsu" (松)',
    japaneseName: '宇治 極上初摘み 抹茶',
    category: 'powder',
    tag: 'Đẳng cấp Trà Đạo',
    price: 450000,
    originalPrice: 520000,
    weight: '30g thiếc kín khí',
    origin: 'Wazuka, Uji, Kyoto, Nhật Bản',
    harvest: 'Vụ Xuân đầu tiên (First Flush - Ichibancha)',
    umami: 5,
    bitterness: 1,
    colorRating: 'Ngọc bích sáng rực (Vivid Emerald)',
    description: 'Dòng matcha thượng hạng chuyên dùng cho nghi thức trà đạo Koicha (đậm) và Usucha (thanh). 100% búp non Tencha che nắng 25 ngày, xay bằng cối đá granite tốc độ 35g/giờ.',
    flavorNotes: ['Vị ngọt umami dày', 'Hậu vị bơ hạt dẻ', 'Hương cốm non thanh khiết', 'Không hề đắng chát'],
    recommendedUse: 'Nghi thức trà đạo truyền thống, Usucha, Koicha thượng phẩm',
    image: '/src/assets/images/product_ceremonial_matcha_1791770671857.jpg',
    inStock: true
  },
  {
    id: 'barista-asahi',
    name: 'Barista Craft Matcha "Asahi" (朝日)',
    japaneseName: 'バリスタ クラフト 抹茶',
    category: 'powder',
    tag: 'Chuyên cho Matcha Latte',
    price: 680000,
    originalPrice: 750000,
    weight: '100g túi zip màng nhôm',
    origin: 'Uji & Ujitawara, Kyoto',
    harvest: 'Vụ 1 & Vụ 2 tuyển chọn',
    umami: 4,
    bitterness: 2,
    colorRating: 'Xanh lục tươi sáng (Bright Leaf Green)',
    description: 'Thiết kế riêng cho các barista và quán cafe specialty. Hàm lượng diệp lục cao giúp giữ màu xanh ngọc nổi bật khi hòa quyện với sữa hạt, sữa tươi thanh trùng mà không bị lấn át mùi trà.',
    flavorNotes: ['Đậm đà hương trà mộc', 'Béo nhẹ tự nhiên', 'Hòa quyện hoàn hảo với sữa Oatly', 'Tạo bọt mịn màng'],
    recommendedUse: 'Iced Matcha Latte, Matcha Macchiato, Cold Whisk Shaker',
    image: '/src/assets/images/product_ceremonial_matcha_1791770671857.jpg',
    inStock: true
  },
  {
    id: 'iced-oat-latte-ready',
    name: 'Signature Iced Matcha Oat Latte (Ly Bar)',
    japaneseName: '濃厚 抹茶オーツラテ',
    category: 'drink',
    tag: 'Best-Seller Tại Quán',
    price: 65000,
    weight: 'Size M - 400ml',
    origin: 'Công thức độc quyền Tencha Lab',
    harvest: 'Pha tươi mỗi sáng',
    umami: 4,
    bitterness: 1,
    colorRating: 'Phân tầng xanh ngọc & sữa yến mạch',
    description: 'Ly Matcha Latte bán chạy nhất chuỗi kiosk. Đánh whisk tươi trực tiếp bằng chasen trước mặt khách, rót phân tầng trên nền sữa yến mạch Oatly Barista béo ngậy.',
    flavorNotes: ['Kem béo mịn', 'Hương trà thơm mộc', 'Vị ngọt thanh dịu', 'Mát lạnh sảng khoái'],
    recommendedUse: 'Uống lạnh to-go hoặc thưởng thức tại quán',
    image: '/src/assets/images/product_iced_matcha_latte_1791770689064.jpg',
    inStock: true
  },
  {
    id: 'chasen-bamboo-whisk',
    name: 'Artisan Bamboo Chasen (100 Prongs)',
    japaneseName: '高山茶筌 百本立',
    category: 'gear',
    tag: 'Thủ công Takayama Nara',
    price: 320000,
    originalPrice: 380000,
    weight: '100 nan tre già',
    origin: 'Takayama, Nara, Nhật Bản',
    harvest: 'Tre già phơi khô 3 năm',
    umami: 0,
    bitterness: 0,
    colorRating: 'Tre tự nhiên hun khói nhẹ',
    description: 'Chổi đánh trà đạo thủ công với 100 sợi nan siêu mảnh uốn cong tinh tế. Giúp đánh tan 100% bột matcha và tạo lớp bọt foam mịn mượt như nhung chỉ trong 15-20 giây.',
    flavorNotes: ['Tạo foam bông xốp', 'Không để lại cặn', 'Độ đàn hồi cao, bền bỉ'],
    recommendedUse: 'Dụng cụ bắt buộc cho barista chuyên nghiệp & người yêu trà đạo',
    image: '/src/assets/images/hero_matcha_ceremony_1791770658172.jpg',
    inStock: true
  },
  {
    id: 'black-raku-chawan',
    name: 'Handcrafted Raku Chawan Bowl',
    japaneseName: '黒楽茶碗 手捻り',
    category: 'gear',
    tag: 'Gốm Men Mộc Wabi-sabi',
    price: 580000,
    weight: 'Bát nung nhiệt cao 380g',
    origin: 'Lò nung truyền thống Kyoto',
    harvest: 'Thủ công độc bản',
    umami: 0,
    bitterness: 0,
    colorRating: 'Đen nhám khoáng thạch (Matte Carbon)',
    description: 'Bát trà Raku được tạo hình tay với lòng bát rộng chuẩn kích thước đánh chasen. Lớp men khoáng mộc wabi-sabi tôn lên màu xanh ngọc bích rực rỡ của matcha.',
    flavorNotes: ['Giữ nhiệt ổn định', 'Cầm đầm tay', 'Tôn vinh màu sắc matcha'],
    recommendedUse: 'Thưởng thức trà đạo truyền thống, chụp ảnh sản phẩm F&B',
    image: '/src/assets/images/hero_matcha_ceremony_1791770658172.jpg',
    inStock: true
  },
  {
    id: 'horeca-master-bag-1kg',
    name: 'Horeca Master Pack Uji Blend 1Kg',
    japaneseName: '業務用水出し 宇治抹茶 1kg',
    category: 'wholesale',
    tag: 'Dành Cho Quán F&B & Chuỗi',
    price: 3800000,
    originalPrice: 4200000,
    weight: '1kg túi bạc van 1 chiều',
    origin: 'Uji, Kyoto (Chuẩn JAS Organic & COA)',
    harvest: 'Vụ Xuân mới nhất hàng năm',
    umami: 4,
    bitterness: 2,
    colorRating: 'Xanh diệp lục tươi chuẩn xuất khẩu',
    description: 'Giải pháp bột matcha chuyên nghiệp tối ưu cost cho quán cafe, trà sữa cao cấp, tiệm bánh ngọt. Tương đương pha được 250 - 300 ly latte với cost nguyên liệu chỉ 12.000đ - 14.000đ/ly.',
    flavorNotes: ['Cost đồ uống tối ưu 26%', 'Màu sắc cực bền sau khi pha', 'Hương vị ổn định 12 tháng', 'Hỗ trợ công thức pha chế'],
    recommendedUse: 'Mô hình quán cafe, chuỗi đồ uống to-go, làm bánh lạnh Nama Matcha',
    image: '/src/assets/images/product_ceremonial_matcha_1791770671857.jpg',
    inStock: true
  }
];

export const CAFE_DRINKS: CafeDrink[] = [
  {
    id: 'drink-1',
    name: 'Iced Matcha Oat Latte',
    japaneseName: '濃厚 抹茶オーツラテ',
    category: 'latte',
    price: 65000,
    costEstimate: 16500,
    profitMargin: '74.6%',
    description: 'Matcha Uji đánh tươi rót phân tầng trên sữa yến mạch Oatly Barista nguyên bản.',
    recipeHighlights: ['4g Bột Matcha Uji Asahi', '150ml Oatly Barista', '10ml Mật ong hoa nhãn', 'Đá bi tinh khiết'],
    image: '/src/assets/images/product_iced_matcha_latte_1791770689064.jpg',
    badge: 'Món quốc dân'
  },
  {
    id: 'drink-2',
    name: 'Strawberry Cloud Matcha',
    japaneseName: '苺クリーム 抹茶ラテ',
    category: 'signature',
    price: 72000,
    costEstimate: 18900,
    profitMargin: '73.7%',
    description: 'Sốt dâu tây tươi hữu cơ Đà Lạt nghiền tay, sữa tươi béo dịu và lớp matcha tươi ngọc bích.',
    recipeHighlights: ['40g Dâu tươi rim mộc', '120ml Sữa tươi thanh trùng', '3.5g Matcha Ceremonial', 'Lớp bọt sữa tuyết'],
    image: '/src/assets/images/product_iced_matcha_latte_1791770689064.jpg',
    badge: 'Trending TikTok'
  },
  {
    id: 'drink-3',
    name: 'Ceremonial Usucha Trà Đạo',
    japaneseName: '薄茶 お濃茶体験',
    category: 'traditional',
    price: 55000,
    costEstimate: 12000,
    profitMargin: '78.2%',
    description: 'Trải nghiệm trà truyền thống không đường sữa, đánh bọt chasen bông xốp, hậu ngọt sâu.',
    recipeHighlights: ['2g Matcha Matsu đợt 1', '60ml Nước khoáng 78°C', 'Đánh chasen W-motion 20s', 'Kèm bánh Wagashi'],
    image: '/src/assets/images/hero_matcha_ceremony_1791770658172.jpg',
    badge: 'Chuẩn Nhật'
  },
  {
    id: 'drink-4',
    name: 'Yuzu Sparkling Matcha Tonic',
    japaneseName: 'ゆず スパークリング抹茶',
    category: 'refreshing',
    price: 68000,
    costEstimate: 15500,
    profitMargin: '77.2%',
    description: 'Thanh mát bừng tỉnh với mứt thanh yên Yuzu Nhật Bản, nước có ga và shot matcha lạnh.',
    recipeHighlights: ['25ml Yuzu Purée Nhật', '120ml Soda Tonic cao cấp', 'Chanh vàng lát', 'Shot cold-whisk matcha'],
    image: '/src/assets/images/product_iced_matcha_latte_1791770689064.jpg',
    badge: 'Giải nhiệt hè'
  }
];

export const BUSINESS_PACKAGES: BusinessPackage[] = [
  {
    id: 'kiosk-togo',
    title: 'Matcha Bar To-Go / Kiosk',
    subTitle: 'Mô hình tinh gọn, tối ưu mặt bằng nhỏ, tập trung khách văn phòng & giới trẻ',
    badge: 'Thu hồi vốn nhanh nhất',
    idealFor: 'Mặt bằng 12m² – 25m², sảnh tòa nhà văn phòng, khu phố đi bộ, trung tâm thương mại',
    spaceRequired: '12m² – 25m²',
    initialInvestment: '135 - 195 Triệu VNĐ',
    paybackMonths: '3.5 - 5 Tháng',
    grossMargin: '72% - 78%',
    highlights: [
      'Công suất 100 - 200 ly/ngày với 1-2 barista vận hành quầy',
      'Quy trình ra món chuẩn trà đạo 4 - 5 phút/ly (tạo trải nghiệm nghệ thuật wabi-sabi trực tiếp tại quầy)',
      'Định phí mặt bằng thấp, tỷ lệ rủi ro thấp nhất ngành F&B'
    ],
    includedItems: [
      'Bộ quầy bar inox module chuyên dụng matcha 1.8m',
      'Trọn bộ dụng cụ chasen điện & chasen trúc thủ công Nara',
      'Gói 5kg Bột Matcha Horeca Uji & nguyên liệu mở bán ban đầu',
      'Quy trình SOP chuẩn, đào tạo Barista 5 ngày thực chiến',
      'Bộ nhận diện thương hiệu, POS bán hàng và menu thiết kế sẵn'
    ],
    popular: true
  },
  {
    id: 'boutique-cafe',
    title: 'Matcha Tea Room & Atelier',
    subTitle: 'Không gian trải nghiệm văn hóa trà đạo Nhật Bản wabi-sabi cao cấp kết hợp bánh ngọt',
    badge: 'Giá trị thương hiệu cao',
    idealFor: 'Mặt bằng 50m² – 90m², view đẹp, đối tượng khách hàng trung & cao cấp',
    spaceRequired: '50m² – 90m²',
    initialInvestment: '380 - 550 Triệu VNĐ',
    paybackMonths: '7 - 10 Tháng',
    grossMargin: '68% - 75%',
    highlights: [
      'Giá bán trung bình cao: 65.000đ - 95.000đ/ly + bánh wagashi/croissant',
      'Bán kèm bán lẻ retail (hộp matcha, dụng cụ trà đạo, quà tặng cao cấp)',
      'Check-in thẩm mỹ lan tỏa tự nhiên trên mạng xã hội'
    ],
    includedItems: [
      'Thiết kế kiến trúc 3D & thi công phong cách Zen Wabi-sabi',
      'Hệ thống máy pha chasen hiện đại kết hợp bếp lạnh làm bánh',
      'Chuyển giao 20 công thức đồ uống + 6 món tráng miệng Matcha độc quyền',
      'Đào tạo quản lý vận hành, marketing khai trương & KOL review',
      'Hỗ trợ giấy phép ATTP & công bố tiêu chuẩn nguyên liệu'
    ]
  },
  {
    id: 'b2b-supply-partner',
    title: 'B2B Nguyên Liệu & Horeca Partner',
    subTitle: 'Cung cấp sỉ chính ngạch bột matcha Uji/Kyoto cho chuỗi cafe, nhà hàng, xưởng bánh',
    badge: 'Dành cho chủ quán có sẵn',
    idealFor: 'Các quán cafe, chuỗi trà sữa, tiệm bánh, xưởng sản xuất F&B muốn đổi nguồn trà cao cấp',
    spaceRequired: 'Linh hoạt (Quán sẵn có)',
    initialInvestment: 'Từ 5 Triệu VNĐ (Đơn sỉ đầu tiên)',
    paybackMonths: 'Tối ưu chi phí ngay lập tức',
    grossMargin: 'Tiết kiệm 20-30% cost',
    highlights: [
      'Nhập khẩu trực tiếp từ đồn điền Uji, Kyoto có COA, JAS Organic, hóa đơn VAT',
      'Giá sỉ bậc thang chiết khấu tới 35% cho đại lý và chuỗi quán',
      'Hỗ trợ mẫu thử (Sample Kit) miễn phí tận nơi trước khi ký kết'
    ],
    includedItems: [
      'Gửi mẫu thử 3 cấp độ matcha Uji kiểm định thực tế',
      'Bảng tính Cost Drink & hướng dẫn cân đối định lượng ra ly',
      'Chính sách bảo hành đổi trả 100% nếu phát hiện ẩm mốc hay bay màu',
      'Tài liệu marketing, hình ảnh đồn điền Kyoto hỗ trợ quán quảng bá'
    ]
  }
];

export const SOMMELIER_QUESTIONS = [
  {
    id: 'goal',
    title: 'Mục đích chính của bạn khi tìm kiếm Matcha là gì?',
    options: [
      { id: 'daily-latte', label: 'Pha Matcha Latte đá thơm béo mỗi ngày tại nhà/văn phòng', desc: 'Cần vị đậm đà, màu xanh tươi, hòa quyện với sữa tươi hoặc sữa hạt.' },
      { id: 'traditional-tea', label: 'Thưởng thức trà đạo nguyên bản (Usucha / Koicha)', desc: 'Cần vị umami sâu thẳm, không đắng chát, bọt trà mịn màng.' },
      { id: 'baking-dessert', label: 'Làm bánh bông lan, kem gelato, nama socola', desc: 'Cần màu xanh bền nhiệt, hương thơm nổi bật sau nướng.' },
      { id: 'business-cafe', label: 'Tìm nguồn sỉ mở quán cafe / kiosk kinh doanh F&B', desc: 'Cần cost tối ưu, nguồn hàng ổn định, đầy đủ giấy tờ kiểm nghiệm.' }
    ]
  },
  {
    id: 'flavor-pref',
    title: 'Bạn thích gu hương vị matcha như thế nào?',
    options: [
      { id: 'rich-umami', label: 'Umami ngọt bùi, hoàn toàn không đắng, hương cốm non', desc: 'Chuẩn búp trà xuân đầu mùa che nắng kỹ lưỡng.' },
      { id: 'balanced', label: 'Cân bằng, vị trà mộc rõ nét, béo ngậy khi kết hợp sữa', desc: 'Rất hợp gu giới trẻ hiện đại thích latte đậm trà.' },
      { id: 'bold-strong', label: 'Đậm đà cá tính, dậy mùi thơm nồng nàn', desc: 'Thích hợp cho cả đồ uống đá xay và làm bánh ngọt cao cấp.' }
    ]
  }
];
