"use client";

import MovieCarousel3D from "@/component/carousel/MovieCarousel3D";
import { eventData } from "@/data/Data";

const EventSlider = ({ startIndex, endIndex, autoplay = true }) => {
  const items =
    startIndex !== undefined && endIndex !== undefined
      ? eventData.slice(startIndex, endIndex)
      : eventData.slice(endIndex);

  return <MovieCarousel3D items={items} autoplay={autoplay} />;
};

export default EventSlider;
