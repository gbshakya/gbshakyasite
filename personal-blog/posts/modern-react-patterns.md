---
title: "Modern React Patterns You Should Know in 2024"
date: "2024-03-05"
description: "Explore the latest React patterns and best practices that will make your applications more maintainable and performant."
excerpt: "React continues to evolve, and so do the patterns we use to build applications. Discover the modern React patterns that will level up your development skills."
tags: ["React", "JavaScript", "Patterns", "Web Development"]
---

# Modern React Patterns You Should Know in 2024

React has come a long way since its inception, and with the introduction of hooks and concurrent features, new patterns have emerged. Let's explore the modern React patterns that every developer should know in 2024.

## 1. Custom Hooks for Logic Reuse

Custom hooks are the cornerstone of modern React development. They allow you to extract and reuse stateful logic:

```jsx
// Custom hook for API calls
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{user.name}</div>;
}
```

## 2. Compound Components Pattern

The compound components pattern is perfect for building flexible and composable UI components:

```jsx
import { createContext, useContext } from 'react';

const TabsContext = createContext();

function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) return null;
  
  return <div className="tab-panel">{children}</div>;
}

// Usage
<Tabs defaultValue="profile">
  <TabList>
    <Tab value="profile">Profile</Tab>
    <Tab value="settings">Settings</Tab>
  </TabList>
  <TabPanels>
    <TabPanel value="profile">Profile content</TabPanel>
    <TabPanel value="settings">Settings content</TabPanel>
  </TabPanels>
</Tabs>
```

## 3. Render Props with Children as a Function

While less common with hooks, render props are still useful for certain scenarios:

```jsx
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return children({ data, loading });
}

// Usage
<DataFetcher url="/api/users">
  {({ data, loading }) => {
    if (loading) return <div>Loading...</div>;
    return <div>{JSON.stringify(data)}</div>;
  }}
</DataFetcher>
```

## 4. State Reducer Pattern

For complex state management, the reducer pattern provides better predictability:

```jsx
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
  });

  const addTodo = (text) => {
    dispatch({
      type: 'ADD_TODO',
      payload: { id: Date.now(), text, completed: false },
    });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  return (
    <div>
      {/* Todo UI */}
    </div>
  );
}
```

## 5. Context API for Global State

For medium-sized applications, Context API is perfect for global state:

```jsx
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    checkAuthStatus().then(user => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const login = async (credentials) => {
    const user = await loginUser(credentials);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return children;
}
```

## 6. Error Boundaries

Error boundaries are crucial for handling errors gracefully:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## 7. Lazy Loading with Suspense

Improve performance by lazy loading components:

```jsx
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

## 8. Server Components (React 18+)

React 18 introduced Server Components for better performance:

```jsx
// ServerComponent.server.js - Runs on server
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data');
  const posts = await data.json();
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

// ClientComponent.client.js - Runs on client
'use client';
import { useState } from 'react';

function ClientComponent({ children }) {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      {children}
    </div>
  );
}
```

## Conclusion

These patterns represent the modern way of building React applications. By understanding and applying these patterns, you'll write more maintainable, performant, and scalable React code.

Remember that the key is to choose the right pattern for the right use case. Not every pattern is suitable for every situation, so always consider your specific requirements and constraints.

Keep learning and experimenting with these patterns to become a more effective React developer!
