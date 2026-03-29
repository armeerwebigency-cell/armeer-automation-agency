import React, { useState } from 'react';
import { Switch, Route, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  Header, Footer, CustomCursor, Preloader, Chatbot
} from '@/components/layout-elements';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import Services from '@/pages/services';
import UseCases from '@/pages/use-cases';
import Compare from '@/pages/compare';
import Blog from '@/pages/blog';
import { motion, useScroll, useSpring } from 'framer-motion';

const queryClient = new QueryClient();

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left', position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 5001 }}
    >
      <div className="w-full h-full" style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 60%, #8b5cf6 100%)' }} />
    </motion.div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollBar />
      <CustomCursor />
      <Header />
      <main className="w-full">{children}</main>
      <Footer />
      <Chatbot />
    </>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/use-cases" component={UseCases} />
        <Route path="/compare" component={Compare} />
        <Route path="/blog" component={Blog} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {loading ? (
          <Preloader onComplete={() => setLoading(false)} />
        ) : (
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
