import { motion, AnimatePresence } from "framer-motion";
import CategoryCard from "@/components/molecules/CategoryCard";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ categories, activeCategory, isOpen, onClose }) => {
  // Desktop sidebar - static positioning
  const DesktopSidebar = () => (
    <div className="hidden lg:block w-80 bg-background border-r border-gray-200 h-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold font-display text-gray-900">
            Categories
          </h2>
          <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <ApperIcon name="FolderOpen" className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <div className="space-y-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
            />
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
          <div className="flex items-center space-x-3 mb-2">
            <ApperIcon name="Lightbulb" className="w-5 h-5 text-primary-600" />
            <h3 className="font-medium font-display text-primary-900">
              Pro Tip
            </h3>
          </div>
          <p className="text-sm text-primary-700">
            Use quick entry shortcuts like "today", "tomorrow", or "12/25" for due dates.
          </p>
        </div>
      </div>
    </div>
  );

  // Mobile sidebar - overlay with transforms
  const MobileSidebar = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold font-display text-gray-900">
                  Categories
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} onClick={onClose}>
                    <CategoryCard
                      category={category}
                      isActive={activeCategory === category.id}
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <ApperIcon name="Lightbulb" className="w-5 h-5 text-primary-600" />
                  <h3 className="font-medium font-display text-primary-900">
                    Pro Tip
                  </h3>
                </div>
                <p className="text-sm text-primary-700">
                  Use quick entry shortcuts like "today", "tomorrow", or "12/25" for due dates.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;