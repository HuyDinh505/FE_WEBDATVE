import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Biến kiểm tra component có còn mounted không

    const fetchData = async () => {
      setLoading(true);  // Đặt lại trạng thái loading khi `url` thay đổi
      setError(null);    // Reset lỗi nếu có
      try {
        const response = await axios.get(url);
        if (isMounted) {
          setData(response.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Hủy cập nhật state nếu component bị unmount
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;