import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import HotelListings from "./components/HotelListings";
import { UploadButton, UploadDropzone } from "./uploadthing";

const App = () => {

  return (
    <>
      <Navigation name="Amali" />
      <div className="relative min-h-screen">
        <Hero />
        <img
          src="/assets/hero/hero_1.jpg"
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
      </div>
      <HotelListings />
    </>
  );
};

export default App;