import { Button } from "@/components/shadcn/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-primary to-primary p-8 lg:p-16 text-primary-foreground">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl text-primary-foreground lg:text-4xl xl:text-5xl font-bold mb-6">
              Ready to supercharge your Restaurant POS?
            </h2>
            <p className="text-lg text-primary-foreground mb-8 opacity-90">
              Join 1,00,000+ restaurants already using RestoPOS to streamline their operations and boost profits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="gap-2"
              >
                Start Free Trial
                <ArrowRight size={18} />
              </Button>
              <Button 
                size="lg" 
                variant="secondary"
                className="gap-2"
              >
                <Phone size={18} />
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;