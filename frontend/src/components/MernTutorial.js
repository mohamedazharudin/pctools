import React, { useState, useMemo } from 'react';
import { 
  PlusCircle, 
  Eye, 
  Edit3, 
  Trash2, 
  Code, 
  Server, 
  Play, 
  Check, 
  Copy, 
  CheckCircle2, 
  Info,
  Terminal,
  Layers,
  Sparkles,
  RefreshCw,
  X,
  AlertCircle
} from 'lucide-react';

export default function App() {
  // Active CRUD operations (multi-select)
  const [selectedOps, setSelectedOps] = useState({
    create: true,
    read: true,
    update: false,
    delete: false,
  });

  // State for active code tab (All-in-one or separated)
  const [codeTab, setCodeTab] = useState('combined');
  const [copiedSide, setCopiedSide] = useState(null);

  // Live Preview State (Simulating MongoDB / In-memory state)
  const [items, setItems] = useState([
    { _id: '101', name: 'Build MERN API', email: 'dev@express.js', status: 'Completed' },
    { _id: '102', name: 'Connect React Frontend', email: 'user@react.dev', status: 'In Progress' },
    { _id: '103', name: 'Deploy to Cloud', email: 'admin@node.org', status: 'Pending' }
  ]);

  // Form Inputs for Live Preview
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  
  // Edit State for Live Preview
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // Notification Toast for Preview Interactions
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleOp = (opKey) => {
    setSelectedOps(prev => {
      const next = { ...prev, [opKey]: !prev[opKey] };
      // Ensure at least one operation is selected
      if (!Object.values(next).some(Boolean)) {
        return prev;
      }
      return next;
    });
  };

  const selectAllOps = () => {
    setSelectedOps({ create: true, read: true, update: true, delete: true });
  };

  // Live Interactive Handlers
  const handleCreate = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      showToast('Please enter a user name', 'error');
      return;
    }
    const newItem = {
      _id: Date.now().toString().slice(-4),
      name: nameInput.trim(),
      email: emailInput.trim() || 'user@example.com',
      status: 'Active'
    };
    setItems([newItem, ...items]);
    setNameInput('');
    setEmailInput('');
    showToast(`POST /api/users - Created "${newItem.name}"`);
  };

  const handleStartEdit = (item) => {
    setEditingId(item._id);
    setEditName(item.name);
    setEditEmail(item.email);
  };

  const handleSaveUpdate = (id) => {
    if (!editName.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }
    setItems(items.map(item => 
      item._id === id ? { ...item, name: editName.trim(), email: editEmail.trim() } : item
    ));
    setEditingId(null);
    showToast(`PUT /api/users/${id} - Updated item successfully`);
  };

  const handleDelete = (id, name) => {
    setItems(items.filter(item => item._id !== id));
    showToast(`DELETE /api/users/${id} - Removed "${name}"`, 'warning');
  };

  const generatedFrontendCode = useMemo(() => {
    const imports = [
      "import React, { useState" + (selectedOps.read ? ", useEffect" : "") + " } from 'react';",
      "import axios from 'axios';",
      "",
      "const API_URL = 'http://localhost:5000/api/users';"
    ].join('\n');

    let stateDefs = ["  const [users, setUsers] = useState([]);"];
    if (selectedOps.create) {
      stateDefs.push("  const [name, setName] = useState('');");
      stateDefs.push("  const [email, setEmail] = useState('');");
    }
    if (selectedOps.update) {
      stateDefs.push("  const [editingId, setEditingId] = useState(null);");
      stateDefs.push("  const [editName, setEditName] = useState('');");
    }

    let functions = [];

    if (selectedOps.read) {
      functions.push(`  // READ: Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);`);
    }

    if (selectedOps.create) {
      functions.push(`  // CREATE: Add new user
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, { name, email });
      alert("User Created!");
      setName('');
      setEmail('');
      ${selectedOps.read ? 'fetchUsers(); // Refresh list' : '// Note: Enable Read to view dynamic list update'}
    } catch (error) {
      console.error("Creation failed:", error);
    }
  };`);
    }

    if (selectedOps.update) {
      functions.push(`  // UPDATE: Modify user by ID
  const startEdit = (user) => {
    setEditingId(user._id);
    setEditName(user.name);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(\`\${API_URL}/\${id}\`, { name: editName });
      setEditingId(null);
      ${selectedOps.read ? 'fetchUsers();' : ''}
    } catch (error) {
      console.error("Update failed:", error);
    }
  };`);
    }

    if (selectedOps.delete) {
      functions.push(`  // DELETE: Remove user by ID
  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        await axios.delete(\`\${API_URL}/\${id}\`);
        ${selectedOps.read ? 'fetchUsers();' : ''}
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };`);
    }

    // JSX Render assembly
    let jsxElements = [];

    if (selectedOps.create) {
      jsxElements.push(`      {/* CREATE FORM */}
      <form onSubmit={handleCreate} className="create-form">
        <h3>Add User</h3>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button type="submit">Submit</button>
      </form>`);
    }

    if (selectedOps.read) {
      let itemContent = [];

      if (selectedOps.update) {
        itemContent.push(`            {editingId === user._id ? (
              <>
                <input 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)} 
                />
                <button onClick={() => handleUpdate(user._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{user.name} ({user.email})</span>
                <button onClick={() => startEdit(user)}>Edit</button>
              </>`
        );
      } else {
        itemContent.push(`            <span>{user.name} ({user.email})</span>`);
      }

      if (selectedOps.delete) {
        itemContent.push(`            <button onClick={() => handleDelete(user._id)}>Delete</button>`);
      }

      if (selectedOps.update) {
        itemContent.push(`            )}`);
      }

      jsxElements.push(`      {/* READ LIST */}
      <div className="user-list">
        <h3>Users List</h3>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
${itemContent.join('\n')}
            </li>
          ))}
        </ul>
      </div>`);
    }

    return `${imports}

export default function UserManagement() {
${stateDefs.join('\n')}

${functions.join('\n\n')}

  return (
    <div className="app-container">
      <h2>MERN CRUD Demo</h2>

${jsxElements.join('\n\n')}
    </div>
  );
}`;
  }, [selectedOps]);

  const generatedBackendCode = useMemo(() => {
    let controllers = [];
    let routes = [];

    if (selectedOps.read) {
      controllers.push(`// READ: Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};`);
      routes.push(`router.get('/', exports.getUsers);`);
    }

    if (selectedOps.create) {
      controllers.push(`// CREATE: Add new user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};`);
      routes.push(`router.post('/', exports.createUser);`);
    }

    if (selectedOps.update) {
      controllers.push(`// UPDATE: Modify user by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};`);
      routes.push(`router.put('/:id', exports.updateUser);`);
    }

    if (selectedOps.delete) {
      controllers.push(`// DELETE: Remove user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};`);
      routes.push(`router.delete('/:id', exports.deleteUser);`);
    }

    return `// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);


// controllers/userController.js
${controllers.join('\n\n')}


// routes/userRoutes.js
const express = require('express');
const router = express.Router();

${routes.join('\n')}

module.exports = router;`;
  }, [selectedOps]);

  // Copy to clipboard helper
  const copyCode = (code, side) => {
    navigator.clipboard.writeText(code);
    setCopiedSide(side);
    setTimeout(() => setCopiedSide(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Top Header / Banner */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-xl shadow-lg shadow-cyan-500/20">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              MERN Stack Interactive CRUD Architect
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Toggle operations to see combined React Frontend & Express Backend code in real time
            </p>
          </div>
        </div>

        {/* Preset Selectors */}
        <div className="flex items-center gap-2">
          <button
            onClick={selectAllOps}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Enable Full CRUD (All 4)
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-6 max-w-[1700px] mx-auto w-full space-y-6">
        
        {/* Step 1: Multi-select CRUD Operations Toolbar */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold border border-cyan-500/30">1</span>
                Select Active CRUD Operations
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Check one or multiple boxes to dynamically combine frontend code, backend endpoints, and live UI.</p>
            </div>
            <div className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
              Active: <span className="text-cyan-400 font-bold">{Object.entries(selectedOps).filter(([, val]) => val).map(([key]) => key.toUpperCase()).join(' + ') || 'None'}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* CREATE TOGGLE */}
            <button
              onClick={() => toggleOp('create')}
              className={`p-3.5 rounded-xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                selectedOps.create
                  ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-950/40'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg mt-0.5 ${selectedOps.create ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                <PlusCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">CREATE</span>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedOps.create ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'}`}>
                    {selectedOps.create && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs opacity-75 mt-1 font-mono">POST /api/users</p>
              </div>
            </button>

            {/* READ TOGGLE */}
            <button
              onClick={() => toggleOp('read')}
              className={`p-3.5 rounded-xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                selectedOps.read
                  ? 'bg-sky-500/10 border-sky-500/50 text-sky-300 shadow-lg shadow-sky-950/40'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg mt-0.5 ${selectedOps.read ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-500'}`}>
                <Eye className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">READ</span>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedOps.read ? 'bg-sky-500 border-sky-400 text-slate-950' : 'border-slate-700'}`}>
                    {selectedOps.read && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs opacity-75 mt-1 font-mono">GET /api/users</p>
              </div>
            </button>

            {/* UPDATE TOGGLE */}
            <button
              onClick={() => toggleOp('update')}
              className={`p-3.5 rounded-xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                selectedOps.update
                  ? 'bg-amber-500/10 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-950/40'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg mt-0.5 ${selectedOps.update ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>
                <Edit3 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">UPDATE</span>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedOps.update ? 'bg-amber-500 border-amber-400 text-slate-950' : 'border-slate-700'}`}>
                    {selectedOps.update && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs opacity-75 mt-1 font-mono">PUT /api/users/:id</p>
              </div>
            </button>

            {/* DELETE TOGGLE */}
            <button
              onClick={() => toggleOp('delete')}
              className={`p-3.5 rounded-xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                selectedOps.delete
                  ? 'bg-rose-500/10 border-rose-500/50 text-rose-300 shadow-lg shadow-rose-950/40'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg mt-0.5 ${selectedOps.delete ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-500'}`}>
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">DELETE</span>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedOps.delete ? 'bg-rose-500 border-rose-400 text-slate-950' : 'border-slate-700'}`}>
                    {selectedOps.delete && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs opacity-75 mt-1 font-mono">DELETE /api/users/:id</p>
              </div>
            </button>
          </div>
        </section>

        {/* Step 2: Code Side-by-Side Panel */}
        {}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">2</span>
              <h2 className="text-base font-bold text-slate-100">Synchronized MERN Code View</h2>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Code updates automatically based on selected operations</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {/* FRONTEND CODE (LEFT) */}
            <div className="flex flex-col bg-slate-950">
              <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-cyan-300 font-mono">FRONTEND: React + Axios</span>
                </div>
                <button
                  onClick={() => copyCode(generatedFrontendCode, 'frontend')}
                  className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedSide === 'frontend' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSide === 'frontend' ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <div className="p-4 overflow-x-auto max-h-[480px] font-mono text-xs leading-relaxed text-slate-300">
                <pre><code>{generatedFrontendCode}</code></pre>
              </div>
            </div>

            {/* BACKEND CODE (RIGHT) */}
            <div className="flex flex-col bg-slate-950">
              <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300 font-mono">BACKEND: Express + Mongoose</span>
                </div>
                <button
                  onClick={() => copyCode(generatedBackendCode, 'backend')}
                  className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedSide === 'backend' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSide === 'backend' ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <div className="p-4 overflow-x-auto max-h-[480px] font-mono text-xs leading-relaxed text-slate-300">
                <pre><code>{generatedBackendCode}</code></pre>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Unified Live Working Output Preview */}
        {}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold border border-purple-500/30">3</span>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                Live Interactive Working Preview
              </h2>
            </div>

            {/* HTTP Toast Feedback */}
            {toast && (
              <div className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-2 animate-fade-in ${
                toast.type === 'error' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                toast.type === 'warning' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                <Terminal className="w-3.5 h-3.5" />
                <span>{toast.message}</span>
              </div>
            )}
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-6 space-y-6">
            
            {/* 1. CREATE FORM PREVIEW (If Selected) */}
            {selectedOps.create ? (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-bold text-emerald-400 font-mono uppercase flex items-center gap-1.5">
                    <PlusCircle className="w-4 h-4" />
                    CREATE Operation Active (Form Enabled)
                  </h3>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">POST Request</span>
                </div>
                <form onSubmit={handleCreate} className="flex flex-wrap gap-3">
                  <input
                    type="text"
                    placeholder="User Name (e.g. John Doe)"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="flex-1 min-w-[180px] bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="email"
                    placeholder="User Email (e.g. john@dev.io)"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 min-w-[180px] bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-xl p-3 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>CREATE feature disabled. Check "CREATE" above to show the input form.</span>
              </div>
            )}

            {/* 2. READ LIST PREVIEW (If Selected) */}
            {selectedOps.read ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-bold text-sky-400 font-mono uppercase flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    READ Operation Active (Users List Output)
                  </h3>
                  <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded">GET /api/users ({items.length} items)</span>
                </div>

                {items.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm bg-slate-900/50 rounded-lg border border-slate-800">
                    Database empty. Use Create form above to add users!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2.5">
                    {items.map((item) => (
                      <div
                        key={item._id}
                        className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-3 transition-all hover:border-slate-700"
                      >
                        {/* Inline Update Input Mode vs Normal View */}
                        {selectedOps.update && editingId === item._id ? (
                          <div className="flex-1 flex flex-wrap items-center gap-2">
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                            />
                            <input
                              type="email"
                              value={editEmail}
                              onChange={(e) => setEditEmail(e.target.value)}
                              className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                            />
                            <button
                              onClick={() => handleSaveUpdate(item._id)}
                              className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded cursor-pointer"
                            >
                              Save PUT
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs text-cyan-400 font-bold">
                              #{item._id}
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-slate-100">{item.name}</div>
                              <div className="text-xs text-slate-400">{item.email}</div>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons for Update and Delete */}
                        <div className="flex items-center gap-2">
                          {/* UPDATE BUTTON */}
                          {selectedOps.update && editingId !== item._id && (
                            <button
                              onClick={() => handleStartEdit(item)}
                              className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-xs transition-all flex items-center gap-1 cursor-pointer"
                              title="Update User"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                          )}

                          {/* DELETE BUTTON */}
                          {selectedOps.delete && (
                            <button
                              onClick={() => handleDelete(item._id, item.name)}
                              className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded text-xs transition-all flex items-center gap-1 cursor-pointer"
                              title="Delete User"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-xl p-3 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>READ feature disabled. Check "READ" above to show the data output list.</span>
              </div>
            )}
          </div>
        </section>

        {/* Step 4: Concept Explanation Card */}
        {}
        <footer className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 text-slate-400 text-xs leading-relaxed space-y-3">
          <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" />
            How MERN Frontend and Backend Communicate via REST API
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <span className="font-bold text-emerald-400 block mb-1">1. CREATE (POST)</span>
              React collects user input in state and sends <code className="text-slate-200">axios.post('/api/users', data)</code>. Express receives <code className="text-slate-200">req.body</code> and saves it to MongoDB via <code className="text-slate-200">new User().save()</code>.
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <span className="font-bold text-sky-400 block mb-1">2. READ (GET)</span>
              React calls <code className="text-slate-200">axios.get('/api/users')</code> inside <code className="text-slate-200">useEffect</code>. Express executes <code className="text-slate-200">User.find()</code> and returns JSON to display in the UI list.
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <span className="font-bold text-amber-400 block mb-1">3. UPDATE (PUT)</span>
              React captures item ID and updated fields, issuing <code className="text-slate-200">axios.put('/api/users/:id', editData)</code>. Express updates MongoDB with <code className="text-slate-200">User.findByIdAndUpdate()</code>.
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <span className="font-bold text-rose-400 block mb-1">4. DELETE (DELETE)</span>
              React calls <code className="text-slate-200">axios.delete('/api/users/:id')</code>. Express locates and removes the document from MongoDB using <code className="text-slate-200">User.findByIdAndDelete()</code>.
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}