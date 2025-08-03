import tasksData from "@/services/mockData/tasks.json";

export const TaskService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...tasksData];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const task = tasksData.find(item => item.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  },

  create: async (taskData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const maxId = Math.max(...tasksData.map(item => item.Id), 0);
    const newTask = {
      Id: maxId + 1,
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    tasksData.unshift(newTask);
    return { ...newTask };
  },

  update: async (id, updatedData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = tasksData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    tasksData[index] = {
      ...tasksData[index],
      ...updatedData,
      Id: parseInt(id),
      updatedAt: new Date()
    };
    
    return { ...tasksData[index] };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const index = tasksData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    const deletedTask = { ...tasksData[index] };
    tasksData.splice(index, 1);
    return deletedTask;
  },

  getByCategory: async (categoryId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (categoryId === "all") {
      return [...tasksData];
    }
    
    return tasksData.filter(task => task.category === categoryId);
  },

  search: async (query) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const searchTerm = query.toLowerCase();
    return tasksData.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm) ||
      task.category.toLowerCase().includes(searchTerm)
    );
  }
};