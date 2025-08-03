import categoriesData from "@/services/mockData/categories.json";

export const CategoryService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return [...categoriesData];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const category = categoriesData.find(item => item.id === id);
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  },

  create: async (categoryData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const maxId = Math.max(...categoriesData.map(item => item.Id), 0);
    const newCategory = {
      Id: maxId + 1,
      ...categoryData,
      taskCount: 0
    };
    
    categoriesData.push(newCategory);
    return { ...newCategory };
  },

  update: async (id, updatedData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = categoriesData.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    categoriesData[index] = {
      ...categoriesData[index],
      ...updatedData
    };
    
    return { ...categoriesData[index] };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const index = categoriesData.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    const deletedCategory = { ...categoriesData[index] };
    categoriesData.splice(index, 1);
    return deletedCategory;
  },

  updateTaskCount: async (categoryId, count) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = categoriesData.findIndex(item => item.id === categoryId);
    if (index !== -1) {
      categoriesData[index].taskCount = count;
      return { ...categoriesData[index] };
    }
    
    throw new Error("Category not found");
  }
};