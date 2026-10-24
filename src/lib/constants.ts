export const SITE_CONFIG = {
  name: "DigiStore",
  slogan: "Nền tảng mua sắm kỹ thuật số hàng đầu",
  description: "Cung cấp các sản phẩm công nghệ, phụ kiện và thiết bị kỹ thuật số chính hãng với giá tốt nhất.",
  url: "http://localhost:3000",
  currency: "VND" as const,
  hotline: "1900 6868",
  supportEmail: "support@digistore.vn",
  address: "Tòa nhà Innovation Hub, Quận 1, TP. Hồ Chí Minh",
};

export const NAVIGATION_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/products" },
  { label: "Điện thoại & Tablet", href: "/products?category=dien-thoai" },
  { label: "Laptop & PC", href: "/products?category=laptop" },
  { label: "Phụ kiện thông minh", href: "/products?category=phu-kien" },
  { label: "Khuyến mãi", href: "/products?deals=true" },
];

export const SORT_OPTIONS = [
  { label: "Mới nhất", value: "newest" },
  { label: "Phổ biến nhất", value: "popular" },
  { label: "Giá tăng dần", value: "price-asc" },
  { label: "Giá giảm dần", value: "price-desc" },
  { label: "Đánh giá cao", value: "rating" },
];
