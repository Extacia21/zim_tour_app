
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DestinationPage from "./pages/DestinationPage";
import HotelsPage from "./pages/HotelsPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import WildlifePage from "./pages/WildlifePage";
import PlanningPage from "./pages/PlanningPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/destination/:slug" element={<DestinationPage />} />
          <Route path="/hotels/:destination" element={<HotelsPage />} />
          <Route path="/activities/:destination" element={<ActivitiesPage />} />
          <Route path="/wildlife" element={<WildlifePage />} />
          <Route path="/planning" element={<PlanningPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
