import { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import QuickAddTask from "@/components/molecules/QuickAddTask";
import TaskList from "@/components/organisms/TaskList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { TaskService } from "@/services/api/TaskService";
import { CategoryService } from "@/services/api/CategoryService";

const TasksPage = () => {
  const { categoryId } = useParams();
  const { searchTerm } = useOutletContext() || { searchTerm: "" };
  
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [tasksData, categoriesData] = await Promise.all([
        TaskService.getAll(),
        CategoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await TaskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      throw new Error("Failed to create task");
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      if (!task) return;

      const updatedTask = {
        ...task,
        completed: !task.completed,
        updatedAt: new Date()
      };

      await TaskService.update(taskId, updatedTask);
      setTasks(prev => 
        prev.map(t => t.Id === taskId ? updatedTask : t)
      );

      if (updatedTask.completed) {
        toast.success("Task completed! 🎉");
      } else {
        toast.info("Task marked as pending");
      }
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error toggling task:", err);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await TaskService.update(updatedTask.Id, updatedTask);
      setTasks(prev => 
        prev.map(t => t.Id === updatedTask.Id ? updatedTask : t)
      );
    } catch (err) {
      throw new Error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await TaskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  // Filter tasks based on category and search term
const filteredTasks = tasks.filter(task => {
    const matchesCategory = !categoryId || categoryId === "all" || 
      (task.category?.Id === parseInt(categoryId)) || 
      (task.category === parseInt(categoryId));
    const matchesSearch = !searchTerm || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.category?.Name && task.category.Name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto">
      <QuickAddTask 
        onAddTask={handleAddTask} 
categories={categories.filter(c => c.Id !== 1)}
      />
      
      {filteredTasks.length === 0 ? (
        <Empty
          title={searchTerm ? "No tasks found" : "No tasks yet"}
          description={
            searchTerm 
              ? `No tasks match "${searchTerm}". Try adjusting your search.`
              : "Start your productive day by adding your first task!"
          }
          action={!searchTerm ? () => {
            const input = document.querySelector('input[placeholder*="Add a new task"]');
            if (input) input.focus();
          } : undefined}
          actionLabel="Add Your First Task"
        />
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
categories={categories.filter(c => c.Id !== 1)}
        />
      )}
    </div>
  );
};

export default TasksPage;