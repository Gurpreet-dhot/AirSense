

export const Loader = ({ className = '' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="relative w-16 h-16">
        {}
        <div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin"
             style={{ animationDuration: '1.5s' }}
        ></div>
        {}
        <div className="absolute inset-3 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin"
             style={{ animationDuration: '2.5s', animationDirection: 'reverse' }}
        ></div>
        {}
        <div className="absolute inset-6 border-4 border-transparent border-t-emerald-300 rounded-full animate-spin"
             style={{ animationDuration: '3.5s' }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
