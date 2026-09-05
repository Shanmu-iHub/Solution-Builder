import React from 'react';
import { productsList } from '../../data/productsData';
import { useNavigation } from '../../context/NavigationContext';
import { IconRenderer } from '../common/IconRenderer';
import { ArrowRight, MoreHorizontal } from 'lucide-react';

export const ProductsGrid: React.FC = () => {
  const { navigateToProduct, setCurrentView } = useNavigation();

  const productIconGradients: Record<string, string> = {
    'solution-architect': 'from-blue-600 to-cyan-500 text-white shadow-blue-500/20',
    'solution-factor': 'from-indigo-600 to-blue-500 text-white shadow-indigo-500/20',
    'testing': 'from-sky-500 to-blue-600 text-white shadow-sky-500/20',
    'monitoring': 'from-blue-500 to-indigo-600 text-white shadow-blue-500/20',
    'finops': 'from-emerald-500 to-teal-600 text-white shadow-emerald-500/20',
    'audit': 'from-slate-700 to-blue-800 text-white shadow-slate-500/20',
    'compliance': 'from-violet-600 to-indigo-600 text-white shadow-violet-500/20',
    'analytics': 'from-amber-500 to-orange-600 text-white shadow-amber-500/20',
    'devops': 'from-blue-600 to-teal-500 text-white shadow-teal-500/20',
    'ai-models': 'from-purple-600 to-pink-600 text-white shadow-purple-500/20'
  };

  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] tracking-tight">Our Products</h2>
          <p className="text-xs text-[#64748B]">Enterprise architecture, validation, governance, and cloud intelligence</p>
        </div>
        <button
          onClick={() => setCurrentView('products')}
          className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 transition-colors group"
        >
          <span>View all products</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Grid of Clean Product Icon Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
        {productsList.map((product) => {
          const gradient = productIconGradients[product.id] || 'from-blue-600 to-indigo-600 text-white';
          return (
            <button
              key={product.id}
              onClick={() => navigateToProduct(product.id)}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-subtle hover:shadow-card hover:border-[#2563EB]/40 transition-all duration-150 text-center group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md group-hover:scale-108 transition-all mb-2.5 shrink-0`}>
                <IconRenderer name={product.icon} className="w-6 h-6 text-white" />
              </div>
              
              <span className="text-xs font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors truncate w-full">
                {product.name}
              </span>
              <span className="text-[10px] text-[#94A3B8] truncate w-full mt-0.5">
                {product.category}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
