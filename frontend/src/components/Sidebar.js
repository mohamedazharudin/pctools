export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="sidebar">
      
    <div class="container">
    <a href="/" class="logo-link">
      <img src="PcToolLogo.png" alt="PcTools Logo" class="site-logo"></img>
    </a>
  </div>
  
      <h2>🛠️Tools</h2>
      <button 
        className={activeTab === 'formatter' ? 'active' : ''} 
        onClick={() => setActiveTab('formatter')}
      >
        Image Formatter
      </button>
      <button 
        className={activeTab === 'compressor' ? 'active' : ''} 
        onClick={() => setActiveTab('compressor')}
      >
        Image Compressor
      </button>
      <button 
        className={activeTab === 'palette' ? 'active' : ''} 
        onClick={() => setActiveTab('palette')}
      >
        Color Palettes
      </button>

      <button 
  className={activeTab === 'entities' ? 'active' : ''} 
  onClick={() => setActiveTab('entities')}
>
  HTML Entities
</button>
    </aside>
  );
}