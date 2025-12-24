import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getnews } from "../store/News/Actions";

const News = () => {
    const dispatch = useDispatch();
    const sliderRef = useRef(null);
    const { newsObject } = useSelector((state) => state.news);
    useEffect(() => {
        dispatch(getnews());
    }, [dispatch]);

    useEffect(() => {
        const slider = sliderRef.current;
        let scrollAmount = 0;

        const interval = setInterval(() => {
            if (!slider) return;

            scrollAmount += 320;

            if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
                scrollAmount = 0;
            }

            slider.scrollTo({
                left: scrollAmount,
                behavior: "smooth",
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [newsObject]);

    return (
        <div className="w-full bg-black py-6 overflow-hidden">
            <div
                ref={sliderRef}
                className="flex gap-5 px-6 overflow-hidden"
            >
                {newsObject.map((item) => (
                    <a
                        key={item.article_id}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              min-w-[300px] max-w-[300px] h-[190px]
              bg-neutral-900
              border border-neutral-700
              rounded-lg
              transition-all duration-300
              hover:border-neutral-400
              hover:-translate-y-0.5
              hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]
              flex flex-col
            "
                    >
                        <img
                            src={item.image_url}
                            alt={item.title}
                            loading="lazy"
                            className="
                w-full h-[120px]
                object-cover
                rounded-t-lg
                opacity-90
              "
                        />

                        <div className="px-3 py-2">
                            <h3 className="text-sm font-medium text-neutral-100 leading-snug line-clamp-2">
                                {item.title}
                            </h3>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default News;
