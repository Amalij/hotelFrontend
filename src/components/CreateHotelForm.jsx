import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCreateHotelMutation } from "@/lib/api";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Hotel name is required" }),
  location: z.string().min(1),
  image: z.instanceof(File).optional(),
  price: z.preprocess((val) => Number(val) || 0, z.number().min(1, "Price must be greater than zero")),
  description: z.string().min(1),
  province: z.string().optional(),
  gym: z.boolean().default(false),
  spa: z.boolean().default(false),
  bar: z.boolean().default(false),
  restaurent: z.boolean().default(false),
  laundry: z.boolean().default(false),
  bikeRental: z.boolean().default(false),
  freeWifi: z.boolean().default(false),
  movieNight: z.boolean().default(false),
  swimmingPool: z.boolean().default(false),
  coffeeShop: z.boolean().default(false),
});

const CreateHotelForm = () => {
  const [createHotel, { isLoading }] = useCreateHotelMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      image: null,
      price:  0,
      description: "",
      province: "",
      gym: false,
      spa: false,
      bar: false,
      restaurent: false,
      laundry: false,
      bikeRental: false,
      freeWifi: false,
      movieNight: false,
      swimmingPool: false,
      coffeeShop: false,
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));  
      form.setValue("image", file);
    }
  };

  const handleSubmit = async (values, event) => {
    event.preventDefault();  
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "image" && values.image instanceof File) {
        formData.append(key, values.image);
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      toast.loading("Creating hotel...");
      await createHotel(formData).unwrap();
      toast.success("Hotel created successfully");
      form.reset();
      setSelectedImage(null);
    } catch (error) {
      toast.error("Hotel creation failed");
    }
  };

  return (
    <Form {...form}>
      <form className="w-1/2" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Name</FormLabel>
                <FormControl>
                  <Input placeholder="Hotel Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" onChange={handleImageChange} />
                </FormControl>
                {selectedImage && (
                  <img src={selectedImage} alt="Selected" className="mt-2 w-32 h-32 object-cover rounded" />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
  control={form.control}
  name="price"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Price</FormLabel>
      <FormControl>
        <Input
          type="number"
          placeholder="Price"
          onChange={(e) => {
            const value = e.target.value;
            field.onChange(value ? parseFloat(value) : "");
          }}
          value={field.value || ""}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel>Choose Amenities</FormLabel>
            <FormDescription>Select amenities available at your hotel.</FormDescription>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                "gym",
                "spa",
                "bar",
                "restaurent",
                "laundry",
                "bikeRental",
                "freeWifi",
                "movieNight",
                "swimmingPool",
                "coffeeShop",
              ].map((amenity) => (
                <FormField
                  key={amenity}
                  control={form.control}
                  name={amenity}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="capitalize">{amenity.replace(/([A-Z])/g, ' $1')}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Hotel"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateHotelForm;