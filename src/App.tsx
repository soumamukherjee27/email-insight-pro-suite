
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";

// Eager load critical pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load non-critical pages to improve performance
const Verify = lazy(() => import("./pages/Verify"));
const Compose = lazy(() => import("./pages/Compose"));
const IPLookup = lazy(() => import("./pages/IPLookup"));
const Track = lazy(() => import("./pages/Track"));
const Extract = lazy(() => import("./pages/Extract"));
const Community = lazy(() => import("./pages/Community"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

// Create a new query client with better caching options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/compose" element={<Compose />} />
              <Route path="/lookup" element={<IPLookup />} />
              <Route path="/track" element={<Track />} />
              <Route path="/extract" element={<Extract />} />
              <Route path="/community" element={<Community />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
