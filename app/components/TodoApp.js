'use client'

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, Edit3, Calendar, Filter, Search, Sun, Moon, Star, Clock, CheckCircle2, Circle, MoreHorizontal } from 'lucide-react';

export default function AdvancedTodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('advanced-todos');
    const savedDarkMode = localStorage.getItem('dark-mode');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('advanced-todos', JSON.stringify(todos));
  }, [todos]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        priority: 'medium',
        category: 'general'
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = () => {
    if (editValue.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editValue.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const togglePriority = (id) => {
    const priorities = ['low', 'medium', 'high'];
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const currentIndex = priorities.indexOf(todo.priority);
        const nextIndex = (currentIndex + 1) % priorities.length;
        return { ...todo, priority: priorities[nextIndex] };
      }
      return todo;
    }));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed);
    
    return matchesSearch && matchesFilter && (showCompleted || !todo.completed);
  });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500 border-red-200';
      case 'medium': return 'text-yellow-500 border-yellow-200';
      case 'low': return 'text-green-500 border-green-200';
      default: return 'text-gray-500 border-gray-200';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-50 hover:bg-red-100';
      case 'medium': return 'bg-yellow-50 hover:bg-yellow-100';
      case 'low': return 'bg-green-50 hover:bg-green-100';
      default: return 'bg-gray-50 hover:bg-gray-100';
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;
  const progressPercentage = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse ${
          darkMode ? 'bg-purple-400' : 'bg-yellow-300'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse ${
          darkMode ? 'bg-pink-400' : 'bg-pink-300'
        }`} style={{animationDelay: '2s'}}></div>
        <div className={`absolute top-40 left-40 w-60 h-60 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse ${
          darkMode ? 'bg-blue-400' : 'bg-blue-300'
        }`} style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-2xl ${darkMode ? 'bg-white/10 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-lg'} shadow-lg`}>
                <CheckCircle2 className={`w-8 h-8 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Catat.in
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Organize your life, achieve your goals
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-2xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-white/10 backdrop-blur-lg text-yellow-300 hover:bg-white/20' 
                  : 'bg-white/80 backdrop-blur-lg text-gray-600 hover:bg-white'
              } shadow-lg hover:scale-105`}
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>

          {/* Progress Bar */}
          {todos.length > 0 && (
            <div className={`p-6 rounded-3xl ${
              darkMode ? 'bg-white/10 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-lg'
            } shadow-lg mb-6`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Progress Today
                </span>
                <span className={`text-2xl font-bold ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div className={`w-full rounded-full h-3 ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{width: `${progressPercentage}%`}}
                ></div>
              </div>
              <div className="flex justify-between mt-3 text-sm">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {completedCount} completed
                </span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {activeCount} remaining
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {/* Input Section */}
          <div className={`p-6 rounded-3xl ${
            darkMode ? 'bg-white/10 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-lg'
          } shadow-lg mb-6`}>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="What needs to be done today?"
                  className={`w-full px-6 py-4 rounded-2xl border-0 text-lg placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-200 ${
                    darkMode 
                      ? 'bg-white/20 text-white focus:ring-purple-500/30 backdrop-blur-lg' 
                      : 'bg-white text-gray-800 focus:ring-purple-500/30 shadow-inner'
                  }`}
                />
              </div>
              <button
                onClick={addTodo}
                disabled={!inputValue.trim()}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className={`p-6 rounded-3xl ${
            darkMode ? 'bg-white/10 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-lg'
          } shadow-lg mb-6`}>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    darkMode 
                      ? 'bg-white/20 text-white placeholder-gray-400 focus:ring-purple-500/50 backdrop-blur-lg' 
                      : 'bg-white text-gray-800 placeholder-gray-500 focus:ring-purple-500/50 shadow-inner'
                  }`}
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="flex gap-2">
                {['all', 'active', 'completed'].map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 capitalize ${
                      filter === filterType
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : darkMode
                          ? 'bg-white/20 text-gray-300 hover:bg-white/30 backdrop-blur-lg'
                          : 'bg-white text-gray-600 hover:bg-gray-50 shadow-inner'
                    }`}
                  >
                    {filterType}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Todo List */}
          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className={`p-12 rounded-3xl text-center ${
                darkMode ? 'bg-white/10 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-lg'
              } shadow-lg`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  <CheckCircle2 className={`w-8 h-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <p className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {todos.length === 0 ? 'Ready to be productive?' : 'No tasks found'}
                </p>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {todos.length === 0 
                    ? 'Add your first task to get started' 
                    : 'Try adjusting your search or filter'}
                </p>
              </div>
            ) : (
              filteredTodos.map((todo, index) => (
                <div
                  key={todo.id}
                  className={`group p-5 rounded-3xl transition-all duration-300 transform hover:scale-[1.02] animate-slideIn ${
                    darkMode ? 'bg-white/10 backdrop-blur-lg hover:bg-white/20' : 'bg-white/80 backdrop-blur-lg hover:bg-white'
                  } shadow-lg hover:shadow-xl border-l-4 ${getPriorityColor(todo.priority).split(' ')[1]}`}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Completion Toggle */}
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        todo.completed
                          ? 'bg-gradient-to-r from-green-400 to-green-500 border-green-500 text-white shadow-lg'
                          : darkMode
                            ? 'border-gray-500 hover:border-green-400 hover:bg-green-400/20'
                            : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                      }`}
                    >
                      {todo.completed ? <Check className="w-5 h-5" /> : <Circle className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </button>

                    {/* Todo Text */}
                    <div className="flex-1 min-w-0">
                      {editingId === todo.id ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyPress={handleEditKeyPress}
                          onBlur={saveEdit}
                          autoFocus
                          className={`w-full px-3 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 ${
                            darkMode 
                              ? 'bg-white/20 text-white focus:ring-purple-500/50 backdrop-blur-lg' 
                              : 'bg-white text-gray-800 focus:ring-purple-500/50 shadow-inner'
                          }`}
                        />
                      ) : (
                        <div
                          onDoubleClick={() => startEditing(todo.id, todo.text)}
                          className="cursor-pointer"
                        >
                          <p className={`text-lg font-medium transition-all duration-200 ${
                            todo.completed
                              ? darkMode ? 'text-gray-400 line-through' : 'text-gray-500 line-through'
                              : darkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            {todo.text}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(todo.priority)} ${getPriorityBg(todo.priority)}`}>
                              {todo.priority}
                            </span>
                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              <Clock className="w-3 h-3 inline mr-1" />
                              {new Date(todo.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => togglePriority(todo.id)}
                        className={`p-2 rounded-xl transition-all duration-200 ${
                          darkMode 
                            ? 'hover:bg-white/20 text-gray-300 hover:text-white' 
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                        }`}
                        title="Change Priority"
                      >
                        <Star className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => startEditing(todo.id, todo.text)}
                        className={`p-2 rounded-xl transition-all duration-200 ${
                          darkMode 
                            ? 'hover:bg-white/20 text-gray-300 hover:text-white' 
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                        }`}
                        title="Edit Task"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className={`p-2 rounded-xl transition-all duration-200 ${
                          darkMode 
                            ? 'hover:bg-red-500/20 text-gray-300 hover:text-red-400' 
                            : 'hover:bg-red-50 text-gray-500 hover:text-red-600'
                        }`}
                        title="Delete Task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Stats */}
          {todos.length > 0 && (
            <div className={`mt-8 p-6 rounded-3xl ${
              darkMode ? 'bg-white/10 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-lg'
            } shadow-lg`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className={`text-3xl font-bold ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                    {todos.length}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Total Tasks
                  </div>
                </div>
                <div>
                  <div className={`text-3xl font-bold ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                    {completedCount}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Completed
                  </div>
                </div>
                <div>
                  <div className={`text-3xl font-bold ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>
                    {activeCount}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Active
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-20px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slideIn {
          animation: slideInFromLeft 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}