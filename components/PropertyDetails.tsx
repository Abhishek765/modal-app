"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Autoplay from "embla-carousel-autoplay";

export function PropertyDetails() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const { toast } = useToast();
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the form data to your backend
      console.log(formData);
      toast({
        title: "Message sent",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(formData, null, 2)}
            </code>
          </pre>
        ),
      });
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      imageContainerRef.current?.requestFullscreen();
      isFullScreen ? setIsFullScreen(false) : setIsFullScreen(true);
    } else {
      document.exitFullscreen();
    }
  };

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const images = [
    "/1.webp",
    "/2.webp",
    "/3.webp",
    "/4.webp",
    "/5.webp",
    "/6.webp",
    "/7.webp",
  ];

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="relative w-full">
          <Carousel
            className="w-full h-full"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={src}
                    alt={`Property image ${index + 1}`}
                    width={1920}
                    height={1080}
                    priority
                    className="object-cover w-full h-full md:aspect-[1920/880] aspect-auto"
                  />
                  <Button
                    onClick={toggleFullScreen}
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 md:block hidden" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 md:block hidden" />
          </Carousel>
        </div>
        <div className="md:max-w-[1030px] mx-auto px-4 md:px-6 pb-12 md:pb-24 pt-6">
          <div className="grid gap-4 md:grid-cols-1 lg:gap-6">
            <div>
              <h2 className="text-xl font-bold tracking-tighter sm:text-4xl md:text-2xl">
                13345 Mississippi River Blvd Minneapolis MN 55769
              </h2>
              <div className="mt-4 space-y-2 text-muted-foreground md:text-lg/relaxed">
                <div className=" flex gap-2">
                  <div className="font-bold ">1</div>
                  <div className="text-gray-600 ">Bed</div>
                </div>
                <div className=" flex gap-2">
                  <div className="font-bold ">5</div>
                  <div className="text-gray-600 ">Bath</div>
                </div>
                <div className=" flex gap-2">
                  <div className="font-bold ">4,789</div>
                  <div className="text-gray-600 ">Finished Sqft</div>
                </div>
                <div className=" flex gap-2">
                  <div className="font-bold ">2.4</div>
                  <div className="text-gray-600 ">Acres</div>
                </div>
                <div className=" flex gap-2">
                  <div className="font-bold ">4</div>
                  <div className="text-gray-600 ">Parking</div>
                </div>
                <div className=" flex gap-2">
                  <div className="font-bold ">N/A</div>
                  <div className="text-gray-600 ">Waterfront</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tighter md:text-2xl">
                $1,564,987
              </h2>
            </div>
          </div>
          <p className="text-gray-600 mt-5">
            The purpose of lorem ipsum is to create a natural looking block of
            text (sentence, paragraph, page, etc.) that doesnt distract from the
            layout. A practice not without controversy, laying out pages with
            meaningless filler text can be very useful when the focus is meant
            to be on design, not content.
          </p>

          <div className=" bg-transparent border-0 mt-6">
            <div className="md:grid grid-cols-2 items-start md:gap-12 gap-4">
              <div className="flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src="/path-to-agent-image.png"
                    alt="Mike Wilen"
                    width={500}
                    height={400}
                  />
                </div>
                <div className="flex gap-2 mb-8">
                  <div className="font-bold text-sm">Mike Wilen</div>
                  <div className="text-gray-600 text-sm">Real Estate Agent</div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="E-mail *"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Textarea
                    placeholder="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  SEND
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
