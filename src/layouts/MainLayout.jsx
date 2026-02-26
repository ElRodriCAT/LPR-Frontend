export default function MainLayout({ children }) {
  return (
    <div className="h-screen w-full bg-gray-900 text-white">
      <header className="w-full h-16 bg-gray-800 flex items-center px-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">LPR System</h1>
      </header>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
