import React, { useState, useEffect } from "react";
import CategoryCard from './CtegoryCard'
export default function HomePage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Dummy categories (You will replace with your API data)
    setCategories([
      { id: 1,
        name: "Sofa",
        img: "https://images.unsplash.com/photo-1555041469-8f5e4028a66b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,
        description:"rafted for ultimate relaxation and timeless appeal, our sofas are available in a variety of fabrics, colors, and configurations — from plush sectionals to sleek two-seaters. Each design brings both comfort and character to your living space."
      },
      { id: 2,
        name: "Chair",
        img: "https://plus.unsplash.com/premium_photo-1705169612261-2cf0407141c3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,
        description:"From accent chairs that add a pop of personality to recliners made for unwinding, our chair collection offers the ideal balance of form and function. Whether for reading, lounging, or entertaining, find the perfect seat for every room."
      },
      { id: 3,
        name: "Table",
        img: "https://i.pinimg.com/736x/e8/3b/39/e83b39a09562ab8d6d9b4dfd43bc16e3.jpg" ,
        description:"Complete your setup with our elegant range of coffee tables, side tables, and dining tables. Designed with durability and style in mind, each piece blends beautifully with modern, rustic, or classic interiors."
      },

    ]);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-fit mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-1 gap-1 sm:gap-6">

        {categories.map((cat, index) => {
      const layoutStyle = "col-span-1";
          return (
            <div className={layoutStyle} key={cat.id}>
              <CategoryCard name={cat.name} img={cat.img} description={cat.description}/>
            </div>
          );
        })}
      </div>
    </div>

  );
}
