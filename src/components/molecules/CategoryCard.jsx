import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const CategoryCard = ({ category, isActive }) => {
  const categoryIcons = {
    work: "Briefcase",
    personal: "User",
    shopping: "ShoppingBag",
    health: "Heart",
    finance: "DollarSign"
  };

  const categoryColors = {
    work: "from-blue-500 to-blue-600",
    personal: "from-green-500 to-green-600",
    shopping: "from-amber-500 to-amber-600",
    health: "from-red-500 to-red-600",
    finance: "from-purple-500 to-purple-600"
  };

  return (
    <NavLink 
      to={category.id === "all" ? "/" : `/category/${category.id}`}
      className="block"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "p-4 rounded-xl transition-all duration-200 cursor-pointer",
          isActive
            ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow"
            : "bg-white hover:bg-gray-50 text-gray-700 shadow-card hover:shadow-card-hover"
        )}
      >
        <div className="flex items-center space-x-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            isActive
              ? "bg-white/20"
              : `bg-gradient-to-br ${categoryColors[category.id] || "from-gray-400 to-gray-500"} text-white`
          )}>
            <ApperIcon 
              name={categoryIcons[category.id] || "Folder"} 
              className="w-5 h-5" 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium font-display truncate">
              {category.name}
            </h3>
            <p className={cn(
              "text-sm",
              isActive ? "text-white/80" : "text-gray-500"
            )}>
              {category.taskCount} tasks
            </p>
          </div>
        </div>
      </motion.div>
    </NavLink>
  );
};

export default CategoryCard;