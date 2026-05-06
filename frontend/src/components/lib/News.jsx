import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getnews } from "../store/News/Actions";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80";

const SCROLL_STEP = 320;
const SCROLL_INTERVAL = 3000;

const News = () => {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const newsObject = useSelector(
    (state) => state.news?.newsObject ?? []
  );

  useEffect(() => {
    dispatch(getnews());
  }, [dispatch]);

  const startAutoScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollAmount = slider.scrollLeft;

    intervalRef.current = setInterval(() => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      scrollAmount += SCROLL_STEP;

      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
      }

      slider.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, SCROLL_INTERVAL);
  }, []);

  const stopAutoScroll = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  useEffect(() => {
    if (newsObject.length) startAutoScroll();
    return stopAutoScroll;
  }, [newsObject, startAutoScroll, stopAutoScroll]);

  return (
    <section className="w-full py-8 bg-black">
      <div
        ref={sliderRef}
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
        className="flex gap-6 px-6 overflow-x-hidden"
      >
        {newsObject.map((item) => (
          <a
            key={item.article_id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              min-w-[300px] max-w-[300px] h-[200px]
              rounded-2xl
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              shadow-lg shadow-black/40
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-[0_20px_40px_rgba(255,255,255,0.08)]
              hover:border-white/20
              flex flex-col overflow-hidden
            "
          >
            <img
              src={item.image_url || FALLBACK_IMAGE}
              alt={item.title || "Market news"}
              loading="lazy"
              onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
              className="h-[120px] w-full object-cover opacity-90"
            />

            <div className="px-4 py-3 flex-1 flex items-center">
              <h3 className="text-sm font-medium text-white/90 leading-snug line-clamp-2">
                {item.title || "Latest market insights & trends"}
              </h3>
            </div>

            {/* subtle glass shine */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default News;
