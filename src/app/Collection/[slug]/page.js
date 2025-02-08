"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "@/store/slice/productslice";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProductPage({ params }) {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const { slug } = params;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchProductData());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const publishedProducts = products?.products?.filter(
    (product) => product.status !== "draft"
  );
  const filteredSingleProduct = publishedProducts?.filter(
    (e) => e?.slug === slug
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        {filteredSingleProduct?.map((singleproduct, index) => (
          <div className="grid gap-8 lg:grid-cols-2" key={index}>
            {/* Product Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
                <Image
                  src={selectedImage || singleproduct?.images[0]?.src}
                  alt="Product image"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex space-x-4 overflow-auto pb-2">
                {singleproduct?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image?.src)}
                    className={cn(
                      "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border",
                      selectedImage === image?.src && "ring-2 ring-primary ring-offset-2"
                    )}
                  >
                    <Image
                      src={image?.src || "/placeholder.svg"}
                      alt={`Product thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{singleproduct?.name}</h1>
                <div
                  className="text-2xl font-semibold text-primary"
                  dangerouslySetInnerHTML={{ __html: singleproduct?.price_html }}
                />
              </div>

              <p
                className="text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: singleproduct?.short_description }}
              />

              {/* Size Selection with Button Group */}
              {singleproduct?.type === "variable" && singleproduct?.variations && (
                <div className="space-y-2">
                  <Label>Select Size</Label>
                  <div className="flex gap-2">
                    {singleproduct?.variations?.map((variation, index) => {
                      const size = variation?.attributes?.sizes || variation?.attributes?.pa_size;
                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            "px-4 py-2 border rounded-md text-sm font-medium transition",
                            selectedSize === size
                              ? "bg-primary text-white border-primary"
                              : "bg-white text-black border-gray-300 hover:bg-gray-100"
                          )}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="flex-1 gap-2" size="lg">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
