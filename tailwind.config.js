/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // این خط بالا تمام فایل‌های داخل app و زیرپوشه‌هایش (مثل layout/components) را پوشش می‌دهد

    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}" // این برای پوشه components در روت پروژه است (اگر دارید)
  ],
  theme: {
    extend: {
      // تنظیمات تم
    }
  },
  plugins: []
};
