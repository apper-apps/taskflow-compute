import { motion } from "framer-motion";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { formatTaskDate, getDueDateColor, isOverdue } from "@/utils/dateUtils";
import { cn } from "@/utils/cn";

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const priorityColors = {
    1: "priority-high",
    2: "priority-medium",
    3: "priority-low"
  };

  const priorityLabels = {
    1: "High",
    2: "Medium", 
    3: "Low"
  };

  const categoryColors = {
    work: "text-blue-600 bg-blue-50",
    personal: "text-green-600 bg-green-50",
    shopping: "text-amber-600 bg-amber-50",
    health: "text-red-600 bg-red-50",
    finance: "text-purple-600 bg-purple-50"
  };

  const handleToggleComplete = () => {
    onToggleComplete(task.Id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        "bg-white rounded-xl p-4 shadow-card task-card-hover border-l-4",
        `category-border-${task.category}`,
        task.completed && "task-completed"
      )}
    >
      <div className="flex items-start space-x-3">
        <div className="mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className={cn(
              "font-medium text-gray-900 mb-1 font-display",
              task.completed && "line-through opacity-60"
            )}>
              {task.title}
            </h3>
            
            <div className="flex items-center space-x-1 ml-2">
              <button
                onClick={() => onEdit(task)}
                className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
              >
                <ApperIcon name="Edit3" className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.Id)}
                className="p-1 text-gray-400 hover:text-error transition-colors"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className={cn(
              "text-sm text-gray-600 mb-3 line-clamp-2",
              task.completed && "opacity-60"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <span className={cn("priority-dot", priorityColors[task.priority])}></span>
              <span className="text-gray-500">{priorityLabels[task.priority]}</span>
            </div>
            
            <Badge 
              variant="default" 
              className={cn("capitalize", categoryColors[task.category])}
            >
              {task.category}
            </Badge>
            
            {task.dueDate && (
              <div className="flex items-center space-x-1">
                <ApperIcon name="Calendar" className="w-3 h-3 text-gray-400" />
                <span className={cn(
                  "text-xs",
                  getDueDateColor(task.dueDate, task.completed),
                  isOverdue(task.dueDate) && !task.completed && "font-medium"
                )}>
                  {formatTaskDate(task.dueDate)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;