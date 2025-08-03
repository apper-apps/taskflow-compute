import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/molecules/TaskCard";
import TaskEditModal from "@/components/molecules/TaskEditModal";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TaskList = ({ tasks, onToggleComplete, onUpdateTask, onDeleteTask, categories }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [sortBy, setSortBy] = useState("dueDate"); // dueDate, priority, created
  const [sortOrder, setSortOrder] = useState("asc"); // asc, desc

  const sortedTasks = [...tasks].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case "dueDate":
        const dateA = a.dueDate ? new Date(a.dueDate) : new Date("9999-12-31");
        const dateB = b.dueDate ? new Date(b.dueDate) : new Date("9999-12-31");
        comparison = dateA - dateB;
        break;
      case "priority":
        comparison = a.priority - b.priority;
        break;
      case "created":
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleSaveTask = async (updatedTask) => {
    await onUpdateTask(updatedTask);
    setEditingTask(null);
  };

  const completedTasks = sortedTasks.filter(task => task.completed);
  const pendingTasks = sortedTasks.filter(task => !task.completed);

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-card">
        <h3 className="font-medium font-display text-gray-900">
          Tasks ({tasks.length})
        </h3>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <Button
            variant={sortBy === "dueDate" ? "primary" : "ghost"}
            size="sm"
            onClick={() => handleSort("dueDate")}
          >
            Due Date
            {sortBy === "dueDate" && (
              <ApperIcon 
                name={sortOrder === "asc" ? "ChevronUp" : "ChevronDown"} 
                className="w-3 h-3 ml-1" 
              />
            )}
          </Button>
          <Button
            variant={sortBy === "priority" ? "primary" : "ghost"}
            size="sm"
            onClick={() => handleSort("priority")}
          >
            Priority
            {sortBy === "priority" && (
              <ApperIcon 
                name={sortOrder === "asc" ? "ChevronUp" : "ChevronDown"} 
                className="w-3 h-3 ml-1" 
              />
            )}
          </Button>
        </div>
      </div>

      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div>
          <h4 className="font-medium font-display text-gray-900 mb-3 px-1">
            Pending ({pendingTasks.length})
          </h4>
          <AnimatePresence>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <motion.div
                  key={task.Id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <TaskCard
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onEdit={handleEditTask}
                    onDelete={onDeleteTask}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h4 className="font-medium font-display text-gray-600 mb-3 px-1">
            Completed ({completedTasks.length})
          </h4>
          <AnimatePresence>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <motion.div
                  key={task.Id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <TaskCard
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onEdit={handleEditTask}
                    onDelete={onDeleteTask}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      )}

      {/* Edit Modal */}
      <TaskEditModal
        task={editingTask}
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleSaveTask}
        categories={categories}
      />
    </div>
  );
};

export default TaskList;