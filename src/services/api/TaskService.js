export const TaskService = {
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "category" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ],
        orderBy: [
          {
            fieldName: "createdAt",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('task', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
      } else {
        console.error("Error fetching tasks:", error.message);
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
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "category" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ]
      };

      const response = await apperClient.getRecordById('task', parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching task with ID ${id}:`, error.message);
      }
      throw error;
    }
  },

  create: async (taskData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields, format dates properly
      const params = {
        records: [{
          Name: taskData.Name || taskData.title,
          title: taskData.title,
          description: taskData.description || "",
          priority: parseInt(taskData.priority),
          dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
          completed: taskData.completed || false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          category: parseInt(taskData.category),
          Tags: taskData.Tags || "",
          Owner: taskData.Owner
        }]
      };

      const response = await apperClient.createRecord('task', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create task records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create task");
        }

        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error("Error creating task:", error.message);
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

      // Only include Updateable fields plus Id, format dates properly
      const params = {
        records: [{
          Id: parseInt(id),
          Name: updatedData.Name || updatedData.title,
          title: updatedData.title,
          description: updatedData.description,
          priority: parseInt(updatedData.priority),
          dueDate: updatedData.dueDate ? new Date(updatedData.dueDate).toISOString() : null,
          completed: updatedData.completed,
          updatedAt: new Date().toISOString(),
          category: parseInt(updatedData.category),
          Tags: updatedData.Tags,
          Owner: updatedData.Owner
        }]
      };

      const response = await apperClient.updateRecord('task', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update task records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to update task");
        }

        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
      } else {
        console.error("Error updating task:", error.message);
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

      const response = await apperClient.deleteRecord('task', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete task records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to delete task");
        }

        return true;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
      } else {
        console.error("Error deleting task:", error.message);
      }
      throw error;
    }
  },

  getByCategory: async (categoryId) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "category" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ],
        where: categoryId !== "all" ? [
          {
            FieldName: "category",
            Operator: "EqualTo",
            Values: [parseInt(categoryId)]
          }
        ] : [],
        orderBy: [
          {
            fieldName: "createdAt",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('task', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by category:", error?.response?.data?.message);
      } else {
        console.error("Error fetching tasks by category:", error.message);
      }
      throw error;
    }
  },

  search: async (query) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "category" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "title",
                    operator: "Contains",
                    values: [query]
                  }
                ],
                operator: "OR"
              },
              {
                conditions: [
                  {
                    fieldName: "description",
                    operator: "Contains",
                    values: [query]
                  }
                ],
                operator: "OR"
              }
            ]
          }
        ],
        orderBy: [
          {
            fieldName: "createdAt",
            sorttype: "DESC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('task', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching tasks:", error?.response?.data?.message);
      } else {
        console.error("Error searching tasks:", error.message);
      }
      throw error;
    }
  }
};