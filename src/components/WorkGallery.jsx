import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "Luminary AI",
    category: "Thương mại điện tử",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop", 
  },
  {
    title: "Arcline",
    category: "Công nghệ Tài chính",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop", 
  },
  {
    title: "Helix",
    category: "Nền tảng SaaS",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Nexus",
    category: "Thế giới Web3",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
  }
];

export default function WorkGallery() {

  return (
    <section id="work" className="relative bg-black py-24 md:py-32 px-6 md:px-12 lg:px-24">
      {/* Title Area */}
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="liquid-glass rounded-full px-3.5 py-1 mb-6 inline-block">
            <span className="text-xs font-medium text-white font-body tracking-wide uppercase">
              Dự Án Nổi Bật
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-heading italic text-white tracking-tight leading-[0.9]">
            Sự hoàn hảo,<br /> được nâng tầm.
          </h2>
        </div>
        <div className="max-w-md">
          <p className="text-white/70 font-body text-lg leading-relaxed">
            Chúng tôi không chỉ dựng nên website. Chúng tôi kiến tạo những trải nghiệm kỹ thuật số thu hút khán giả và thúc đẩy phát triển không giới hạn.
          </p>
        </div>
      </div>

      {/* Vertical Staggered Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        {projects.map((project, index) => (
          <div 
            key={index} 
            // The odd index maps to the right column, which we push down by md:mt-24 for a staggered masonry look
            className={`group relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] liquid-glass rounded-3xl overflow-hidden p-2 ${index % 2 === 1 ? 'md:mt-24' : ''}`}
          >
            {/* Dark internal gradient for text legibility */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 rounded-3xl pointer-events-none m-2" />
            
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover rounded-[1.25rem] transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Project Text */}
            <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 z-20">
              <p className="text-white/60 font-body text-xs md:text-sm uppercase tracking-widest mb-2">
                {project.category}
              </p>
              <h3 className="text-3xl md:text-5xl font-heading italic text-white drop-shadow-xl">
                {project.title}
              </h3>
            </div>

            {/* Hover Button */}
            <div className="absolute bottom-8 md:bottom-12 right-8 md:right-12 z-20 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <button className="liquid-glass-strong w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
