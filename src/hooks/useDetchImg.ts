import { useEffect } from "react";
// 将地址为url的图片，挂载到domRef的backgroundImage上
export default function useDetchImg(domRef, url) {
  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        const source = await fetch(url, {
          signal: controller.signal,
        });
        // json 调用 json()  image/webp  调用blob()
        let blob = await source.blob();
        let imgUrl = URL.createObjectURL(blob);
        if (domRef.current) {
          domRef.current.style.backgroundImage = `url(${imgUrl})`;
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      // 中断请求
      controller.abort("cancel request");
    };
  }, []);
}
