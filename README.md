# 🛍️ DigiStore - Digital E-Commerce Platform Frontend

Khung sườn (boilerplate / starter template) dự án Frontend thương mại điện tử chuyên nghiệp, xây dựng trên nền tảng **ReactJS / Next.js (App Router)** với **TypeScript** và **Tailwind CSS v3**.

---

## 🚀 Công nghệ sử dụng (Tech Stack)

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| **Next.js (App Router)** | 16.x | Framework SSR/SSG tối ưu SEO cho sản phẩm E-commerce |
| **React** | 19.x | Thư viện UI hiện đại |
| **TypeScript** | 5.x | Kiểm soát kiểu dữ liệu chặt chẽ (Type-Safe) |
| **Tailwind CSS** | v3.4.x | Utility-first CSS, thiết kế giao diện linh hoạt & nhanh chóng |
| **Lucide React** | Mới nhất | Bộ icon vector thanh lịch, chuẩn UI thương mại điện tử |
| **Context API + LocalStorage** | Thuần React | Quản lý giỏ hàng và phiên đăng nhập realtime |

---

## 📁 Cấu trúc thư mục (Project Architecture)

```text
WEB-frontend/
├── public/                 # Tài nguyên tĩnh (favicon, icons, robots.txt)
├── src/
│   ├── app/                # Next.js App Router (Định tuyến & Trang giao diện)
│   │   ├── layout.tsx      # Root Layout (bọc CartProvider, AuthProvider, Navbar, Footer)
│   │   ├── page.tsx        # Trang chủ (Hero Banner, Flash Sale, Featured Products)
│   │   ├── globals.css     # Cấu hình Tailwind directives & custom CSS variables
│   │   ├── products/
│   │   │   ├── page.tsx    # Trang danh sách sản phẩm (Filter, Sort, Search)
│   │   │   └── [slug]/
│   │   │       └── page.tsx # Trang chi tiết sản phẩm (Gallery, Specs, Reviews)
│   │   ├── cart/
│   │   │   └── page.tsx    # Trang quản lý giỏ hàng chi tiết
│   │   ├── checkout/
│   │   │   └── page.tsx    # Trang thanh toán (Địa chỉ giao hàng & Cổng thanh toán)
│   │   └── auth/
│   │       └── login/
│   │           └── page.tsx # Trang đăng nhập tài khoản
│   ├── components/         # Các thành phần giao diện tái sử dụng
│   │   ├── ui/             # Primitive UI components (Button, Input, Badge, Skeleton)
│   │   ├── layout/         # Bố cục chính (Navbar, Footer, CartDrawer, MobileNav)
│   │   └── ecommerce/      # E-commerce widgets (ProductCard, CategoryCard, HeroBanner)
│   ├── context/            # React Contexts toàn cục
│   │   ├── cart-context.tsx # Quản lý giỏ hàng, số lượng, lưu localStorage
│   │   └── auth-context.tsx # Quản lý phiên đăng nhập & thông tin người dùng
│   ├── hooks/              # Custom React Hooks (useCart, useAuth, useDebounce)
│   ├── lib/                # Tiện ích chung & Dữ liệu mẫu
│   │   ├── utils.ts        # Helper: formatCurrency (VND), cn(), calculateDiscount()
│   │   ├── constants.ts    # Hằng số: Menu links, sort options, site metadata
│   │   └── mock-data.ts    # Dữ liệu mẫu thực tế hỗ trợ dev không cần chờ backend
│   ├── services/           # Tầng kết nối API (API Client Layer)
│   │   ├── api-client.ts   # Fetch client tự động đính kèm JWT Bearer token
│   │   ├── product.service.ts # Gọi API sản phẩm (có cơ chế fallback mock data)
│   │   └── auth.service.ts # Gọi API xác thực người dùng
│   └── types/              # Định nghĩa kiểu TypeScript
│       ├── product.ts      # Product, Category, Review, ProductFilter
│       ├── cart.ts         # CartItem, CartSummary, Coupon
│       ├── user.ts         # UserProfile, ShippingAddress, AuthTokens
│       ├── order.ts        # Order, OrderStatus, PaymentMethod
│       └── api.ts          # ApiResponse, PaginatedResponse, ApiError
├── .env.example            # Mẫu cấu hình biến môi trường
├── .env.local              # Biến môi trường cục bộ
├── next.config.ts          # Cấu hình Next.js (remote image patterns, turbopack)
├── tailwind.config.ts      # Bảng màu thương hiệu (Brand colors, glow shadows)
├── postcss.config.mjs      # Cấu hình PostCSS cho Tailwind v3
├── tsconfig.json           # Cấu hình TypeScript & path aliases (@/*)
└── package.json            # Quản lý dependencies & scripts
```

---

## 🛠️ Hướng dẫn cài đặt & khởi chạy

### 1. Cài đặt các gói phụ thuộc (Dependencies)
```bash
npm install
```

### 2. Khởi chạy môi trường phát triển (Development)
```bash
npm run dev
```
Mở trình duyệt tại: [http://localhost:3000](http://localhost:3000)

### 3. Kiểm tra và đóng gói sản phẩm (Build & Production)
```bash
# Kiểm tra lỗi Typescript và biên dịch bản build tối ưu
npm run build

# Chạy bản production đã build
npm run start
```

---

## 🔌 Hướng dẫn kết nối Backend API

File `.env.local` đã được chuẩn bị sẵn:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_NAME=DigiStore
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Tất cả các lời gọi mạng đều đi qua `src/services/api-client.ts`:
- Tự động lấy JWT token từ `localStorage` để đính kèm vào Header `Authorization: Bearer <token>`.
- Đã có cơ chế **Fallback Mock Data**: Nếu backend chưa chạy, giao diện vẫn hoạt động trơn tru với dữ liệu mẫu đẹp mắt để bạn phát triển giao diện trước. Khi backend sẵn sàng, chỉ cần cập nhật API Endpoint.

---

## 💎 Điểm nổi bật đã hoàn thiện sẵn

1. **Hiệu ứng giao diện cao cấp**: Glassmorphism, hiệu ứng hover mềm mại, gradient thời thượng, hỗ trợ responsive hoàn hảo trên mọi kích thước màn hình (Mobile, Tablet, Desktop).
2. **Giỏ hàng trượt (Cart Drawer)**: Thêm/sửa/xóa sản phẩm realtime, tự động lưu vào LocalStorage, tự động tính tổng tiền theo chuẩn tiền tệ Việt Nam (VNĐ).
3. **Bộ lọc & Sắp xếp sản phẩm**: Lọc theo danh mục, mức giá tối đa, sắp xếp theo giá tăng/giảm, đánh giá sao.
4. **Trang thanh toán Checkout**: Đầy đủ form địa chỉ người nhận và lựa chọn phương thức thanh toán phổ biến tại VN (COD, VNPAY, MoMo, VietQR).
