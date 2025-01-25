"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductData } from "@/store/slice/productslice"

export default function ProductPage({params}) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("m")
  const [singleProductData,setsingleProductData]=useState()

const {slug}=params
console.log(params)
  const images = [
   
  ]

console.log(singleProductData,"singleProductData")
const sizes = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
]

const dispatch = useDispatch();
const products = useSelector((state) => state.products.data);

const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true); // Start loading
    await dispatch(fetchProductData());
    setLoading(false); // End loading
  };
  fetchData();
}, [dispatch]);
const publishedProducts = products?.products?.filter(
  (product) => product.status !== "draft"
);
const filteredsingleProduct=publishedProducts?.filter((e)=>e?.slug === slug)
console.log(filteredsingleProduct,"filteredsingleProduct")
return (
  <div className="min-h-screen bg-background">
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt="Product image"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex space-x-4 overflow-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border",
                  selectedImage === index && "ring-2 ring-primary ring-offset-2",
                )}
              >
                <Image
                  src={image || "/placeholder.svg"}
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
            <h1 className="text-3xl font-bold">Daisy Summer Dress</h1>
            <p className="text-2xl font-semibold text-primary">$129.00</p>
          </div>

          <p className="text-muted-foreground">
            A beautiful summer dress perfect for any occasion. Made with high-quality materials for comfort and style.
            Features a flattering cut and delicate daisy pattern.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="size">Select Size</Label>
              <RadioGroup
                id="size"
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="flex flex-wrap gap-3"
              >
                {sizes.map(({ value, label }) => (
                  <div key={value}>
                    <RadioGroupItem value={value} id={`size-${value}`} className="peer hidden" />
                    <Label
                      htmlFor={`size-${value}`}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                    >
                      {label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

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

          <div className="space-y-4 rounded-lg bg-muted p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Material</p>
                <p className="text-muted-foreground">100% Cotton</p>
              </div>
              <div>
                <p className="font-medium">Care</p>
                <p className="text-muted-foreground">Machine wash cold</p>
              </div>
              <div>
                <p className="font-medium">Shipping</p>
                <p className="text-muted-foreground">2-3 business days</p>
              </div>
              <div>
                <p className="font-medium">Returns</p>
                <p className="text-muted-foreground">30 day returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
