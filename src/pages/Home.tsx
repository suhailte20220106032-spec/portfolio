import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBackground from '@/assets/hero-bg.jpg';

const Home = () => {
  return (
    <main className="min-h-screen">
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40" />
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-40 h-40 rounded-full border-4 border-primary/30 overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-6xl font-serif font-bold text-primary-foreground">S</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-white">
            Hello, I'm <span className="text-primary-foreground">Your Name</span>
          </h1>

          <div className="text-xl sm:text-2xl md:text-3xl mb-12 h-20 flex items-center justify-center">
            <span className="text-emerald-400 font-medium">And I am passionate about </span>
            <TypeAnimation
              sequence={[
                'Web Development',
                2000,
                'UI/UX Design',
                2000,
                'Creative Solutions',
                2000,
                'Innovation',
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="ml-2 font-semibold text-white"
              repeat={Infinity}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              <Link to="/portfolio">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/50 text-white hover:bg-primary-foreground/10"
            >
              <Link to="/contact">
                Get In Touch
              </Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
