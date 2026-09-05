import React, { useState, useMemo } from 'react';
import { productsList } from '../../data/productsData';
import { useNavigation } from '../../context/NavigationContext';
import { IconRenderer } from '../common/IconRenderer';
import {
  Search,
  ExternalLink,
  BookOpen,
  Code2,
  PhoneCall,
  X
} from 'lucide-react';

export const AppLauncher: React.FC = () => {
  const {
    navigateToProduct,
    setCurrentView,
    setIsAppLauncherOpen
  } = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return productsList;
    return productsList.filter(
      p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDesc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="fixed inset-0 z-50 select-none animate-fade-in">
      {/* Backdrop to handle click-outside */}
      <div 
        className="fixed inset-0 bg-slate-950/20 backdrop-blur-xs" 
        onClick={() => setIsAppLauncherOpen(false)} 
      />

      {/* Launcher Popup Card - Right aligned under 9-dots button, compact width (360px), taller height with existing colors */}
      <div className="fixed top-15 right-2 sm:right-6 md:right-12 w-[340px] sm:w-[360px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-50 flex flex-col animate-slide-down">
        
        {/* Top Header Section */}
        <div className="p-4 pb-3 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
                All Products
              </h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB]">
                {productsList.length}
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] font-normal mt-0.5">
              Explore our complete suite of products
            </p>
          </div>

          <button
            onClick={() => setIsAppLauncherOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Compact Search Bar */}
        <div className="px-4 pt-3 pb-1 bg-white">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[#0F172A] placeholder-slate-400 font-normal transition-all"
            />
          </div>
        </div>

        {/* Scrollable 3-Column App Grid matching Image 2 Layout with existing colors */}
        <div className="flex-1 overflow-y-auto p-3.5 bg-white">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {filteredProducts.map(product => (
                <button
                  key={product.id}
                  onClick={() => {
                    navigateToProduct(product.id);
                    setIsAppLauncherOpen(false);
                  }}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 hover:shadow-xs transition-all group text-center cursor-pointer"
                >
                  {/* Existing Brand Blue Icon Box */}
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-1.5 group-hover:scale-105 group-hover:bg-blue-100/70 transition-all">
                    <IconRenderer name={product.icon} className="w-5 h-5 text-[#2563EB]" />
                  </div>

                  {/* Centered Product Label */}
                  <span className="text-[12px] font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors truncate w-full text-center leading-tight">
                    {product.name}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-[#64748B]">
              No products found matching "{searchQuery}"
            </div>
          )}
        </div>

        {/* Bottom Quick Links / Footer Toolbar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200/80 flex flex-col gap-1.5">
          <button
            onClick={() => {
              setCurrentView('products');
              setIsAppLauncherOpen(false);
            }}
            className="w-full py-2 px-3 rounded-xl bg-white hover:bg-blue-50/50 border border-slate-200 text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <span>View all solutions</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563EB]" />
          </button>

          <div className="grid grid-cols-3 gap-1 text-[11px] pt-0.5">
            <button
              onClick={() => {
                setCurrentView('projects');
                setIsAppLauncherOpen(false);
              }}
              className="py-1 px-1.5 rounded-lg hover:bg-slate-200/60 text-[#64748B] hover:text-[#0F172A] text-center truncate transition-colors flex items-center justify-center gap-1 cursor-pointer font-medium"
              title="Documentation"
            >
              <BookOpen className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">Docs</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('settings');
                setIsAppLauncherOpen(false);
              }}
              className="py-1 px-1.5 rounded-lg hover:bg-slate-200/60 text-[#64748B] hover:text-[#0F172A] text-center truncate transition-colors flex items-center justify-center gap-1 cursor-pointer font-medium"
              title="Developer API"
            >
              <Code2 className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">API</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('activity');
                setIsAppLauncherOpen(false);
              }}
              className="py-1 px-1.5 rounded-lg hover:bg-slate-200/60 text-[#64748B] hover:text-[#0F172A] text-center truncate transition-colors flex items-center justify-center gap-1 cursor-pointer font-medium"
              title="Support & Sales"
            >
              <PhoneCall className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">Sales</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


