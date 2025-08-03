import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Mock stats for header
  const stats = {
    completed: 12,
    pending: 8,
    overdue: 3,
    total: 23
  };

  // Mock categories for sidebar
  const categories = [
    { id: "all", name: "All Tasks", taskCount: 23 },
    { id: "work", name: "Work", taskCount: 8 },
    { id: "personal", name: "Personal", taskCount: 7 },
    { id: "shopping", name: "Shopping", taskCount: 4 },
    { id: "health", name: "Health", taskCount: 2 },
    { id: "finance", name: "Finance", taskCount: 2 }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        categories={categories}
        activeCategory="all"
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onSearch={handleSearch}
          onMenuToggle={handleMenuToggle}
          stats={stats}
        />
        
        <main className="flex-1 overflow-y-auto">
          <Outlet context={{ searchTerm }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;