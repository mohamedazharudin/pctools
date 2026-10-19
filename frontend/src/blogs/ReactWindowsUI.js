export default function ReactWindowsUI() {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-cyan-300">Building Windows 11 UI in React</h2>
        <p className="text-slate-300">
          Creating desktop-style web interfaces provides a familiar and engaging user experience.
        </p>
        <h3 className="font-semibold text-white">Key Features:</h3>
        <ul className="list-disc pl-5 space-y-1 text-slate-300">
          <li>Draggable and maximizable workspace windows</li>
          <li>Windows 11 Start menu & Taskbar</li>
          <li>Custom File Explorer (`C:\blogs`)</li>
        </ul>
      </div>
    );
  }