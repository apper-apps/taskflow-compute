import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { parseDateInput } from "@/utils/dateUtils";

const QuickAddTask = ({ onAddTask, categories }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: 2,
    dueDate: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: parseInt(formData.category) || categories[0]?.Id,
      priority: parseInt(formData.priority),
      dueDate: formData.dueDate ? parseDateInput(formData.dueDate) || new Date() : null,
      completed: false
    };

    try {
      await onAddTask(taskData);
setFormData({
        title: "",
        description: "",
        category: "",
        priority: 2,
        dueDate: ""
      });
      setIsExpanded(false);
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  const handleQuickAdd = (e) => {
    if (e.key === "Enter" && !isExpanded) {
      e.preventDefault();
      if (formData.title.trim()) {
        handleSubmit(e);
      } else {
        setIsExpanded(true);
      }
    }
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-xl shadow-card p-4 mb-6"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <Input
              placeholder="Add a new task... (Press Enter for quick add)"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              onKeyDown={handleQuickAdd}
              onFocus={() => !formData.title && setIsExpanded(true)}
              className="border-0 shadow-none focus:ring-0 text-base"
            />
          </div>
          
          {formData.title && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-600 hover:text-primary-700"
            >
              <ApperIcon 
                name={isExpanded ? "ChevronUp" : "Settings"} 
                className="w-4 h-4" 
              />
            </Button>
          )}
        </div>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pt-4 space-y-3">
            <Input
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              >
{categories.map(category => (
                  <option key={category.Id} value={category.Id}>
                    {category.Name}
                  </option>
                ))}
              </Select>
              
              <Select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              >
                <option value={3}>Low Priority</option>
                <option value={2}>Medium Priority</option>
                <option value={1}>High Priority</option>
              </Select>
              
              <Input
                placeholder="Due date (today, tomorrow, MM/DD)"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsExpanded(false);
                  setFormData(prev => ({ ...prev, description: "", dueDate: "" }));
                }}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm">
                <ApperIcon name="Plus" className="w-4 h-4 mr-1" />
                Add Task
              </Button>
            </div>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default QuickAddTask;