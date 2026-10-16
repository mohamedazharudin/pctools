export default function Home({ setActiveTab }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center text-white">
      <h1 className="text-3xl font-bold mb-2">Welcome to PcTools</h1>
      <p className="text-gray-400">Select a tool from the Start menu below to begin.</p>
    </div>
  );
}