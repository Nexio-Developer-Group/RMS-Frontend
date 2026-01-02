import { 
  Utensils, 
  Coffee, 
  Pizza, 
  IceCream, 
  Sandwich, 
  Beer 
} from "lucide-react";

const BusinessTypes = () => {
  const types = [
    { icon: Utensils, name: "Fine Dining", description: "Full service restaurants" },
    { icon: Coffee, name: "Café & Bakery", description: "Quick service outlets" },
    { icon: Pizza, name: "QSR", description: "Quick Service Restaurants" },
    { icon: IceCream, name: "Dessert Parlors", description: "Ice cream & sweets" },
    { icon: Sandwich, name: "Food Trucks", description: "Mobile food vendors" },
    { icon: Beer, name: "Pubs & Bars", description: "Nightlife venues" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-primary dark:bg-gray-900 text-primary-foreground">
      <div className="px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <span className="inline-block font-semibold text-sm uppercase tracking-wider mb-4 opacity-80">
            For All Business Types
          </span>
          <h2 className="text-3xl text-primary-foreground lg:text-4xl xl:text-5xl font-bold mb-4">
            Built for all types of food business
          </h2>
          <p className="text-lg text-primary-foreground opacity-80">
            Whether you run a fine dining restaurant or a food truck, RestoPOS adapts to your needs
          </p>
        </div>

        {/* Business Types Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {types.map((type, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-foreground/10 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                <type.icon className="w-7 h-7" />
              </div>
              <h5 className="font-semibold mb-1 text-primary-foreground">{type.name}</h5>
              <p className="text-sm text-primary-foreground opacity-70">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessTypes;