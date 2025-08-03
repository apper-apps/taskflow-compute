export const CategoryService = {
  getAll: async () => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "color" } },
          { field: { Name: "icon" } },
          { field: { Name: "taskCount" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('category', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching categories:", error?.response?.data?.message);
      } else {
        console.error("Error fetching categories:", error.message);
      }
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "color" } },
          { field: { Name: "icon" } },
          { field: { Name: "taskCount" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ]
      };

      const response = await apperClient.getRecordById('category', parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching category with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching category with ID ${id}:`, error.message);
      }
      throw error;
    }
  },

  create: async (categoryData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Name: categoryData.Name || categoryData.name,
          color: categoryData.color,
          icon: categoryData.icon,
          taskCount: categoryData.taskCount || 0,
          Tags: categoryData.Tags || "",
          Owner: categoryData.Owner
        }]
      };

      const response = await apperClient.createRecord('category', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create category records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create category");
        }

        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating category:", error?.response?.data?.message);
      } else {
        console.error("Error creating category:", error.message);
      }
      throw error;
    }
  },

  update: async (id, updatedData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields plus Id
      const params = {
        records: [{
          Id: parseInt(id),
          Name: updatedData.Name || updatedData.name,
          color: updatedData.color,
          icon: updatedData.icon,
          taskCount: updatedData.taskCount,
          Tags: updatedData.Tags,
          Owner: updatedData.Owner
        }]
      };

      const response = await apperClient.updateRecord('category', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update category records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to update category");
        }

        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating category:", error?.response?.data?.message);
      } else {
        console.error("Error updating category:", error.message);
      }
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('category', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete category records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to delete category");
        }

        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting category:", error?.response?.data?.message);
      } else {
        console.error("Error deleting category:", error.message);
      }
      throw error;
    }
  },

  updateTaskCount: async (categoryId, count) => {
    return await CategoryService.update(categoryId, { taskCount: count });
  }
};