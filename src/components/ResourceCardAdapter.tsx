// Add this to src/pages/Resources-Listing.tsx after your imports

// Define the Resource interface
interface Resource {
  title: string;
  description: string;
  url: string;
  categories: string[];
  image?: string;
}

// Adapter component to convert string categories to object format
export const ResourceCardAdapter = ({ resource }: { resource: Resource }) => {
    // Transform the categories from strings to objects with name/id properties
    const formattedCategories = resource.categories.mconst formattedCategories = categories.map(cat => cat.name); // Ensure string array
    ap((categorySlug: any) => ({
      name: categorySlug,
      id: categorySlug
    }));
    
    // Create a compatible resource object for ResourceCard
    const compatibleResource = {
      title: resource.title,
      description: resource.description,
      url: resource.url,
      categories: formattedCategories,
      // Add other needed properties
      image: resource.image
    };
    
    return <ResourceCardAdapter resource={compatibleResource} />;
  };