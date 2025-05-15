// Date formatting utility
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Currency formatting utility
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "";
  // Đảm bảo số được làm tròn đến 2 chữ số thập phân
  const roundedAmount = Number(Number(amount).toFixed(2));
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundedAmount);
};
