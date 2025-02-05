"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"



import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductData } from "@/store/slice/productslice"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ProductPage({params}) {
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedSize, setSelectedSize] = useState("")
  const [singleProductData,setsingleProductData]=useState({})

const {slug}=params
console.log(params)
console.log(selectedImage,"selectimage")

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
   {
filteredsingleProduct?.map((singleproduct,index)=>(
  <div className="grid gap-8 lg:grid-cols-2" key={index}>
  {/* Product Gallery */}
  <div className="space-y-4">
    <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
      
      <Image
        src={selectedImage ? selectedImage : singleproduct?.images[0]?.src}
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
            selectedImage === index && "ring-2 ring-primary ring-offset-2",
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

    <p className="text-muted-foreground"                dangerouslySetInnerHTML={{
                  __html: singleproduct?.short_description,
                }}/>
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="size">Select Size</Label>
     <div className="flex gap-2">
   {singleproduct?.type == "variable"  ? singleproduct?.variations?.map((variation,index)=>(

<RadioGroup
id="size"
value={variation?.attributes?.sizes}
onValueChange={setSelectedSize}
className="flex flex-wrap gap-3"
>
            <Label

            key={index}
                htmlFor={`size-${variation?.attributes?.sizes}}`}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
              >
                {variation?.attributes?.sizes}
              </Label>
      
              </RadioGroup>
     
   )) :null}
     </div>
 </div>
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
    {/* <div className="space-y-4 rounded-lg bg-muted p-4">
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
    </div> */}
  </div>

))
   

   }   
  
    </div>
  </div>
)
}
