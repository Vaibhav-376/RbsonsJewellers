"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function CarouselOrientation() {
  const images = [
    "/carousel/carousel1.jpg",
    "/carousel/carousel2.jpg",
    "/carousel/carousel3.jpg",
    "/carousel4.webp",
    "/carousel5.webp",
  ];

  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="horizontal"
        className="w-full overflow-hidden"
      >
        <CarouselContent className="flex w-full h-[220px] sm:h-[280px] md:h-[350px] lg:h-[450px] xl:h-[520px]">
          {images.map((src, index) => (
            <CarouselItem key={index} className="basis-full">
              <Card className="h-full w-full border-none shadow-none rounded-none">
                <CardContent className="relative h-full w-full p-0 overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={src}
                      alt={`Carousel Image ${index + 1}`}
                      fill
                      priority
                      className="object-fit w-full h-full"
                    />
                  </div>
                </CardContent>

              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2" />
      </Carousel>
    </div>
  );
}
