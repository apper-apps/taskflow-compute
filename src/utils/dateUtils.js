import { format, isToday, isTomorrow, isYesterday, parseISO, addDays, startOfDay } from "date-fns";

export const formatTaskDate = (date) => {
  if (!date) return "";
  
  const taskDate = typeof date === "string" ? parseISO(date) : date;
  
  if (isToday(taskDate)) {
    return "Today";
  } else if (isTomorrow(taskDate)) {
    return "Tomorrow";
  } else if (isYesterday(taskDate)) {
    return "Yesterday";
  } else {
    return format(taskDate, "MMM dd");
  }
};

export const isOverdue = (date) => {
  if (!date) return false;
  const taskDate = typeof date === "string" ? parseISO(date) : date;
  return startOfDay(taskDate) < startOfDay(new Date());
};

export const getDueDateColor = (date, completed) => {
  if (completed) return "text-gray-500";
  if (!date) return "text-gray-400";
  
  if (isOverdue(date)) return "text-error";
  if (isToday(parseISO(date))) return "text-warning";
  return "text-gray-600";
};

export const parseDateInput = (input) => {
  const today = new Date();
  const lowerInput = input.toLowerCase().trim();
  
  if (lowerInput === "today") {
    return startOfDay(today);
  } else if (lowerInput === "tomorrow") {
    return startOfDay(addDays(today, 1));
  } else if (lowerInput.match(/^\d{1,2}\/\d{1,2}$/)) {
    // MM/DD format
    const [month, day] = lowerInput.split("/").map(Number);
    const currentYear = today.getFullYear();
    return new Date(currentYear, month - 1, day);
  } else if (lowerInput.match(/^\d{4}-\d{2}-\d{2}$/)) {
    // YYYY-MM-DD format
    return parseISO(lowerInput);
  }
  
  return null;
};