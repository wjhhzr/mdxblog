import { useEffect, useState } from "react";

/**
 * 
 * @param keys 
 * @returns 
 */

export default function useLocalStorange(keys) {
  const [cache, setCache] = useState({});
  useEffect(() => {
    let data = {};
    keys.forEach((k) => {
      const r = localStorage.getItem(k);
      if (r) {
        data[k] = r;
      }
    });
    setCache(data);
  }, []);

  const saveCache = (obj) => {
    Object.entries(obj).forEach(([k, v]) => {
      // 没有值不操作
      if (!v) return;
      // 和缓存值相等也不操作
      if (v === cache[k]) return;
      cache[k] = v;
      localStorage.setItem(k, cache[k] as string);
    });
  };

  return [cache, saveCache];
}
