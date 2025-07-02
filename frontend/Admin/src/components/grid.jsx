import React from 'react';

function Grid({ direction = "ltr", img, category = "Category Name" }) {
  return (
    <div
      dir={direction}
      className="grid grid-cols-2 grid-rows-3 gap-4 lg:grid-cols-4 lg:grid-rows-2 lg:gap-6"
    >
      {/* Hero Card */}
      <div className="relative col-span-2 row-span-2 lg:col-span-2 lg:row-span-2 rounded overflow-hidden bg-gray-300">
        <img
          src={img || "https://via.placeholder.com/600x400"}
          alt={category}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <p className="text-white text-3xl md:text-4xl font-bold tracking-wide">
            {category}
          </p>
        </div>
      </div>

      {/* Filler Boxes */}
      {[1, 2, 3, 4].map((_, i) => (
        <div
          key={i}
          className="min-h-32 rounded bg-gradient-to-br from-gray-200 to-gray-300 hover:scale-[1.01] transition-transform"
        ></div>
      ))}
    </div>
  );
}

export default Grid;
