import { Button } from "@/components/ui/button";
import { Music, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-background">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
              Empowering Musical Excellence
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl max-w-4xl">
              Manage Your Music Association with <span className="text-primary">Trovantina</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px]">
              The all-in-one platform for music associations to track instruments, manage members, and organize rehearsals seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link to="/register">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                <a href="#about">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Us</h2>
            <p className="text-lg text-muted-foreground max-w-[800px]">
              Trovantina was founded with a single mission: to simplify the logistical burden of running a music association, allowing you to focus on what truly matters—the music.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <Music className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instrument Inventory</h3>
              <p className="text-center text-muted-foreground">
                Easily track every instrument in your collection, from maintenance logs to current borrowers.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Member Management</h3>
              <p className="text-center text-muted-foreground">
                Keep your member data secure and organized. Manage roles, permissions, and contact information.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Made for Associations</h3>
              <p className="text-center text-muted-foreground">
                Built specifically for the unique needs of musical groups, bands, and community orchestras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t mt-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Music className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">Trovantina</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2026 Trovantina Music Association Management System. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
