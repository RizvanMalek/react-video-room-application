export default function FullScreenLoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 bg-opacity-70">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mb-4"></div>

      {/* Message */}
      <p className="text-white text-lg">{message}</p>
    </div>
  );
}
