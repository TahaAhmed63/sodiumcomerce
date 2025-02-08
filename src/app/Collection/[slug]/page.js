"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"

import { cn } from "@/lib/utils"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductData } from "@/store/slice/productslice"
import { Button } from "@/components/ui/button"

export default function ProductPage({ params }) {
  const [selectedAttributes, setSelectedAttributes] = useState({})
  const [selectedVariation, setSelectedVariation] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  const publishedProducts = products?.products?.filter(
    (product) => product.status !== "draft"
  );
  const filteredsingleProduct = publishedProducts?.find((e) => e?.slug === params?.slug);

  // Extract unique attributes
  const attributes = {};
  filteredsingleProduct?.variations?.forEach(variation => {
    Object.entries(variation.attributes).forEach(([key, value]) => {
      if (!attributes[key]) attributes[key] = new Set();
      attributes[key].add(value);
    });
  });

  // Convert Set to array
  const attributeOptions = Object.fromEntries(
    Object.entries(attributes).map(([key, value]) => [key, Array.from(value)])
  );

  // Handle Attribute Selection
  const handleAttributeChange = (attribute, value) => {
    const newSelectedAttributes = { ...selectedAttributes, [attribute]: value };
    setSelectedAttributes(newSelectedAttributes);

    // Find the matching variation
    const matchedVariation = filteredsingleProduct?.variations?.find(variation =>
      Object.entries(newSelectedAttributes).every(
        ([attr, val]) => variation.attributes[attr] === val
      )
    );

    if (matchedVariation) {
      setSelectedVariation(matchedVariation);
      setSelectedImage(matchedVariation?.image?.src || filteredsingleProduct?.images[0]?.src);
    }
  };

  // Clear Selection
  const handleClearSelection = () => {
    setSelectedAttributes({});
    setSelectedVariation(null);
    setSelectedImage(filteredsingleProduct?.images[0]?.src);
  };

  if (!filteredsingleProduct) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
              <Image
                src={selectedImage || filteredsingleProduct?.images[0]?.src}
                alt="Product image"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex space-x-4 overflow-auto pb-2">
              {filteredsingleProduct?.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image?.src)}
                  className={cn(
                    "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border",
                    selectedImage === image?.src && "ring-2 ring-primary ring-offset-2",
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
              <h1 className="text-3xl font-bold">{filteredsingleProduct?.name}</h1>
              <div
                className="text-2xl font-semibold text-primary"
                dangerouslySetInnerHTML={{ __html: selectedVariation?.price_html || filteredsingleProduct?.price_html }}
              />
            </div>

            <p className="text-muted-foreground" dangerouslySetInnerHTML={{
              __html: filteredsingleProduct?.short_description,
            }} />

            {/* Variation Selectors */}
            {Object.entries(attributeOptions).map(([attribute, options]) => (
              <div key={attribute} className="space-y-4">
                <p className="font-medium">{attribute}</p>
                <div className="flex gap-2">
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAttributeChange(attribute, option)}
                      className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-md border ${selectedAttributes[attribute] === option ? 'bg-primary text-white' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Clear Selection */}
            {Object.keys(selectedAttributes).length > 0 && (
              <button onClick={handleClearSelection} className="text-blue-500">
                Clear
              </button>
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
      </div>
    </div>
  )
}
