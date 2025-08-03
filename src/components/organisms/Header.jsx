import { useState, useContext } from "react";
import { useSelector } from 'react-redux';
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { AuthContext } from "../../App";
const Header = ({ onSearch, onMenuToggle, stats }) => {
  const [showStats, setShowStats] = useState(false);
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="Menu" className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold font-display text-gray-900">
              TaskFlow
            </h1>
          </div>
        </div>

        <div className="hidden sm:block flex-1 max-w-md mx-6">
          <SearchBar onSearch={onSearch} />
        </div>

<div className="flex items-center space-x-4">
          {user && (
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <ApperIcon name="User" className="w-4 h-4" />
              <span>{user.firstName} {user.lastName}</span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-gray-600 hover:text-gray-800"
          >
            <ApperIcon name="LogOut" className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
          
          <button
            onClick={() => setShowStats(!showStats)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="BarChart3" className="w-5 h-5 text-gray-600" />
            {stats.overdue > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {stats.overdue}
              </span>
            )}
          </button>
          
          {showStats && (
            <div className="absolute top-16 right-4 bg-white rounded-xl shadow-xl p-4 min-w-[200px] z-50 border">
              <h3 className="font-semibold font-display text-gray-900 mb-3">
                Today's Progress
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-medium text-success">{stats.completed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending:</span>
                  <span className="font-medium text-gray-900">{stats.pending}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Overdue:</span>
                  <span className="font-medium text-error">{stats.overdue}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium text-gray-900">{stats.total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sm:hidden mt-4">
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;