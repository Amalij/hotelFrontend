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

const formSchema = z.object({
  name: z.string().min(1, { message: "Hotel name is required" }),
  location: z.string().min(1),
  image: z.string().min(1),
  price: z.number(),
  description: z.string().min(1),
  province: z.string().optional(),
  gym: z.boolean().optional(),
  spa:z.boolean().optional(),
  restaurent:z.boolean().optional(),
  laundry: z.boolean().optional(),
  bikeRental:z.boolean().optional(),
  freeWifi:z.boolean().optional(),
  movieNight:z.boolean().optional(),
  swimmingPool:z.boolean().optional(),
  coffeeShop:z.boolean().optional()


});

const CreateHotelForm = () => {
  const [createHotel, { isLoading }] = useCreateHotelMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values) => {
    const { name, location, image, price, description,province,gym,spa,restaurent,
      laundry,
      bikeRental ,
      freeWifi ,
      movieNight ,
      swimmingPool ,
      coffeeShop } = values;
    try {
      toast.loading("Creating hotel...");
      await createHotel({
        name,
        location,
        image,
        price,
        description,
        province,
        gym,
        spa,restaurent,
      laundry,
      bikeRental ,
      freeWifi ,
      movieNight ,
      swimmingPool ,
      coffeeShop 
      }).unwrap();
      toast.success("Hotel created successfully");
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="Image" {...field} />
                </FormControl>
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
                      field.onChange(parseFloat(e.target.value));
                    }}
                    value={field.value}
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
            <FormLabel>Choose Amentities</FormLabel>
            <FormDescription>Choose Amentities popular in your hotel</FormDescription>
            <div className="grid grid-cols-2 gap-4 mt-2"></div>
            <FormField
              control={form.control}
              name="Gym"
              render={({ field }) => (
                <FormItem>
                   
                  <FormControl>
                     
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-4">
          <Button type="submit">Create Hotel</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateHotelForm;