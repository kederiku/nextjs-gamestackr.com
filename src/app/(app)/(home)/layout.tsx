import { Manufacturer, Platform } from "@/payload-types";
import configPromise from "@payload-config"
import { getPayload } from "payload";

import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";


interface Props {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: "manufacturers",
    depth: 1,
    pagination: false
  });

  const formattedData = data.docs.map((manufacturer) => ({
    ...manufacturer,
    platforms: (manufacturer.platforms?.docs ?? []).map((platform) => ({
      ...(platform as Platform),
    }))
  }))

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;