
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import EnhancedNavigation from '@/components/EnhancedNavigation';
import EnhancedFooter from '@/components/EnhancedFooter';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <EnhancedNavigation />
      
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
          </p>
          <div className="space-y-4">
            <Link to="/">
              <Button className="bg-orange-600 hover:bg-orange-700 w-full">
                Return to Home
              </Button>
            </Link>
            <Link to="/wildlife">
              <Button variant="outline" className="border-orange-600 text-orange-600 w-full">
                Explore Wildlife
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <EnhancedFooter />
    </div>
  );
};

export default NotFound;
