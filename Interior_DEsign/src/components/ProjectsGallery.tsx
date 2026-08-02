import React, { useState, useMemo } from 'react';
import { PROJECTS_LIST } from '../data/projectsData';
import { ProjectItem, FurnitureModel } from '../types';
import { PRODUCTS_CATALOG } from '../data/boconceptData';
import { ChevronRight, ChevronDown, X, ExternalLink, SlidersHorizontal, Sparkles } from 'lucide-react';

interface ProjectsGalleryProps {
  onQuickViewProduct?: (product: FurnitureModel) => void;
  onOpenConsultation?: () => void;
}

type MainCategory = 'all' | 'architecture' | 'interiors';

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  onQuickViewProduct,
  onOpenConsultation
}) => {
  // Category state
  const [selectedMainCat, setSelectedMainCat] = useState<MainCategory>('all');
  const [selectedSubCat, setSelectedSubCat] = useState<string>('all');
  const [residentialExpanded, setResidentialExpanded] = useState<boolean>(true);
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [activeModalImageIdx, setActiveModalImageIdx] = useState<number>(0);
  const [animatingKey, setAnimatingKey] = useState<number>(0);

  // Mobile sidebar filter toggle state
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const handleSelectCategory = (main: MainCategory, sub: string) => {
    setSelectedMainCat(main);
    setSelectedSubCat(sub);
    setAnimatingKey(prev => prev + 1); // trigger re-animation
  };

  // Filter projects list
  const filteredProjects = useMemo(() => {
    return PROJECTS_LIST.filter(proj => {
      if (selectedMainCat !== 'all' && proj.mainCategory !== selectedMainCat) {
        return false;
      }
      if (selectedSubCat !== 'all' && proj.subCategory !== selectedSubCat) {
        return false;
      }
      return true;
    });
  }, [selectedMainCat, selectedSubCat]);

  return (
    <section id="projects" className="bg-[#FAF8F5] py-16 px-4 sm:px-6 lg:px-12 border-t border-[#E6DDD4]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-[#E6DDD4]">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-[#171615] uppercase">
            Projects Gallery
          </h2>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-[#171615] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#B0977B] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{mobileFilterOpen ? 'Hide Filters' : 'Filter Projects'}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* LEFT SIDEBAR NAVIGATION MENU */}
          <aside
            className={`w-full lg:w-64 flex-shrink-0 font-serif text-sm tracking-wide ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="sticky top-20 bg-white lg:bg-transparent p-6 lg:p-0 rounded-lg lg:rounded-none border lg:border-none border-[#E6DDD4] shadow-sm lg:shadow-none space-y-8">
              
              {/* Reset / All Projects */}
              <div>
                <button
                  onClick={() => handleSelectCategory('all', 'all')}
                  className={`text-left uppercase font-bold text-base transition-colors ${
                    selectedMainCat === 'all' && selectedSubCat === 'all'
                      ? 'text-[#0D9488] font-black tracking-wider'
                      : 'text-[#171615] hover:text-[#0D9488]'
                  }`}
                >
                  ALL PROJECTS
                </button>
              </div>

              {/* ARCHITECTURE SECTION */}
              <div className="space-y-3">
                <button
                  onClick={() => handleSelectCategory('architecture', 'all')}
                  className={`text-left uppercase font-bold text-sm tracking-widest block transition-colors ${
                    selectedMainCat === 'architecture' && selectedSubCat === 'all'
                      ? 'text-[#0D9488]'
                      : 'text-[#8C827A] hover:text-[#171615]'
                  }`}
                >
                  ARCHITECTURE
                </button>

                <div className="pl-3 space-y-2 text-xs font-semibold uppercase tracking-wider">
                  
                  {/* RESIDENTIAL Category with expand/collapse */}
                  <div>
                    <button
                      onClick={() => {
                        setResidentialExpanded(!residentialExpanded);
                        handleSelectCategory('architecture', 'residential');
                      }}
                      className={`w-full flex items-center justify-between text-left py-1 group transition-colors ${
                        selectedMainCat === 'architecture' && selectedSubCat === 'residential'
                          ? 'text-[#0D9488] font-bold'
                          : 'text-[#171615] hover:text-[#0D9488]'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        RESIDENTIAL
                        {selectedMainCat === 'architecture' && selectedSubCat === 'residential' && (
                          <span className="text-[#0D9488] ml-1 font-bold">›</span>
                        )}
                      </span>
                      {residentialExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-[#0D9488]" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-[#171615]/50 group-hover:text-[#0D9488]" />
                      )}
                    </button>

                    {/* Subcategories under RESIDENTIAL */}
                    {residentialExpanded && (
                      <div className="pl-4 pt-1 space-y-1.5 border-l border-[#0D9488]/30 ml-1">
                        {[
                          { label: 'LOFTS', cat: 'lofts' },
                          { label: 'TOWNHOUSES', cat: 'townhouses' },
                          { label: 'APARTMENTS', cat: 'apartments' },
                          { label: 'HOUSES', cat: 'houses' }
                        ].map(sub => (
                          <button
                            key={sub.cat}
                            onClick={() => handleSelectCategory('architecture', sub.cat)}
                            className={`block w-full text-left py-0.5 transition-colors ${
                              selectedMainCat === 'architecture' && selectedSubCat === sub.cat
                                ? 'text-[#0D9488] font-bold'
                                : 'text-[#171615]/70 hover:text-[#0D9488]'
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* NEW BUILDINGS */}
                  <button
                    onClick={() => handleSelectCategory('architecture', 'new-buildings')}
                    className={`block w-full text-left py-1 transition-colors ${
                      selectedMainCat === 'architecture' && selectedSubCat === 'new-buildings'
                        ? 'text-[#0D9488] font-bold'
                        : 'text-[#171615] hover:text-[#0D9488]'
                    }`}
                  >
                    NEW BUILDINGS
                  </button>

                  {/* COMMERCIAL */}
                  <button
                    onClick={() => handleSelectCategory('architecture', 'commercial')}
                    className={`block w-full text-left py-1 transition-colors ${
                      selectedMainCat === 'architecture' && selectedSubCat === 'commercial'
                        ? 'text-[#0D9488] font-bold'
                        : 'text-[#171615] hover:text-[#0D9488]'
                    }`}
                  >
                    COMMERCIAL
                  </button>

                  {/* RETAIL & HOSPITALITY */}
                  <button
                    onClick={() => handleSelectCategory('architecture', 'retail-hospitality')}
                    className={`block w-full text-left py-1 transition-colors ${
                      selectedMainCat === 'architecture' && selectedSubCat === 'retail-hospitality'
                        ? 'text-[#0D9488] font-bold'
                        : 'text-[#171615] hover:text-[#0D9488]'
                    }`}
                  >
                    RETAIL & HOSPITALITY
                  </button>
                </div>
              </div>

              {/* INTERIORS SECTION */}
              <div className="space-y-3">
                <button
                  onClick={() => handleSelectCategory('interiors', 'all')}
                  className={`text-left uppercase font-bold text-sm tracking-widest block transition-colors ${
                    selectedMainCat === 'interiors' && selectedSubCat === 'all'
                      ? 'text-[#0D9488] underline underline-offset-4'
                      : 'text-[#8C827A] hover:text-[#171615]'
                  }`}
                >
                  INTERIORS
                </button>

                <div className="pl-3 space-y-1.5 text-xs font-semibold uppercase tracking-wider">
                  {[
                    { label: 'LOFTS', cat: 'lofts' },
                    { label: 'TOWNHOUSES', cat: 'townhouses' },
                    { label: 'APARTMENTS', cat: 'apartments' },
                    { label: 'HOUSES', cat: 'houses' }
                  ].map(sub => (
                    <button
                      key={sub.cat}
                      onClick={() => handleSelectCategory('interiors', sub.cat)}
                      className={`block w-full text-left py-1 transition-colors ${
                        selectedMainCat === 'interiors' && selectedSubCat === sub.cat
                          ? 'text-[#0D9488] font-bold'
                          : 'text-[#171615] hover:text-[#0D9488]'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consultation Callout */}
              <div className="pt-6 border-t border-[#E6DDD4]">
                <button
                  onClick={onOpenConsultation}
                  className="w-full text-left text-xs font-sans text-[#B0977B] hover:text-[#171615] transition-colors flex items-center gap-1.5 font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Request Architectural Portfolio</span>
                </button>
              </div>

            </div>
          </aside>

          {/* MAIN RIGHT GRID - PROJECTS DISPLAY */}
          <div className="flex-1 w-full">
            
            {/* Header info bar */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E6DDD4]">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
                  Showing {filteredProjects.length} Architectural & Interior Projects
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#8C827A]">
                <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
                <span>Interactive Gallery</span>
              </div>
            </div>

            {/* PROJECTS GRID with Staggered Entrance Animation */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#E6DDD4]">
                <p className="font-serif text-lg text-[#8C827A] italic mb-4">
                  No architectural projects match the selected filter.
                </p>
                <button
                  onClick={() => handleSelectCategory('all', 'all')}
                  className="px-6 py-2.5 bg-[#171615] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold hover:bg-[#0D9488] transition-colors"
                >
                  Show All Projects
                </button>
              </div>
            ) : (
              <div
                key={animatingKey}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
              >
                {filteredProjects.map((project, idx) => (
                  <div
                    key={`${project.id}-${animatingKey}`}
                    onClick={() => {
                      setActiveProjectModal(project);
                      setActiveModalImageIdx(0);
                    }}
                    style={{
                      animationDelay: `${idx * 70}ms`,
                      animationFillMode: 'both'
                    }}
                    className="group cursor-pointer flex flex-col animate-project-reveal"
                  >
                    {/* Image Box with Glassmorphism & Translucent Ghost Reveal (Image 2 style) */}
                    <div className="relative aspect-[4/3] bg-[#EAE3D9] overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-500">
                      
                      {/* Category transition ghost overlay flash matching Image 2 */}
                      <div
                        style={{ animationDelay: `${idx * 70}ms` }}
                        className="absolute inset-0 z-20 pointer-events-none animate-ghost-reveal"
                      />

                      {/* Translucent hover overlay */}
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                        <span className="bg-[#171615]/90 text-white text-[10px] uppercase font-mono tracking-widest px-3 py-1 shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5">
                          <span>View Project</span>
                          <ExternalLink className="w-3 h-3 text-[#0D9488]" />
                        </span>
                      </div>

                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>

                    {/* Project Title (Serif Uppercase Style) */}
                    <div className="mt-3.5 space-y-1">
                      <h3 className="font-serif text-xs font-bold tracking-wider text-[#171615] group-hover:text-[#0D9488] transition-colors uppercase leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-[11px] font-sans text-[#8C827A] tracking-wider uppercase font-medium">
                        {project.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Copyright Notice matching Image 2 */}
            <div className="mt-20 pt-8 border-t border-[#E6DDD4] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C827A] font-serif gap-4">
              <p className="tracking-widest uppercase text-[11px]">
                © DHD / ALL RIGHTS RESERVED.
              </p>
              <p className="tracking-wider italic text-[12px]">
                Architecture and Interior Design
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* PROJECT LIGHTBOX MODAL */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-none shadow-2xl overflow-hidden border border-[#E6DDD4] my-auto animate-in zoom-in-95 duration-300 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-[#171615] text-[#FAF8F5] hover:bg-[#0D9488] transition-colors rounded-full"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Image Gallery Column */}
              <div className="bg-[#171615] p-4 flex flex-col justify-between min-h-[340px]">
                <div className="relative aspect-[4/3] w-full overflow-hidden mb-4">
                  <img
                    src={activeProjectModal.galleryImages[activeModalImageIdx] || activeProjectModal.image}
                    alt={activeProjectModal.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnails if multiple images */}
                {activeProjectModal.galleryImages.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {activeProjectModal.galleryImages.map((imgUrl, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveModalImageIdx(i)}
                        className={`w-16 h-12 flex-shrink-0 border-2 transition-all ${
                          activeModalImageIdx === i ? 'border-[#0D9488] opacity-100 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details Column */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0D9488] uppercase tracking-widest font-semibold mb-2">
                    <span>{activeProjectModal.mainCategory}</span>
                    <span>•</span>
                    <span>{activeProjectModal.subCategory}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold tracking-wide uppercase text-[#171615] mb-2">
                    {activeProjectModal.title}
                  </h3>
                  
                  <p className="text-xs font-semibold text-[#8C827A] uppercase tracking-widest mb-4">
                    {activeProjectModal.location}
                  </p>

                  <div className="h-px bg-[#E6DDD4] my-4" />

                  <p className="text-sm font-sans text-[#171615]/80 leading-relaxed font-normal mb-6">
                    {activeProjectModal.description}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-sans border-t border-b border-[#E6DDD4] py-4 mb-6">
                    {activeProjectModal.year && (
                      <div>
                        <span className="text-[#8C827A] uppercase tracking-widest block font-medium">Year</span>
                        <span className="font-bold text-[#171615]">{activeProjectModal.year}</span>
                      </div>
                    )}
                    {activeProjectModal.area && (
                      <div>
                        <span className="text-[#8C827A] uppercase tracking-widest block font-medium">Area</span>
                        <span className="font-bold text-[#171615]">{activeProjectModal.area}</span>
                      </div>
                    )}
                    {activeProjectModal.architect && (
                      <div className="col-span-2">
                        <span className="text-[#8C827A] uppercase tracking-widest block font-medium">Lead Designer / Architect</span>
                        <span className="font-bold text-[#171615]">{activeProjectModal.architect}</span>
                      </div>
                    )}
                  </div>

                  {/* Featured Furniture Items */}
                  {activeProjectModal.featuredFurnitureIds && activeProjectModal.featuredFurnitureIds.length > 0 && (
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-widest text-[#171615] mb-3">
                        Featured Furniture in Project:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProjectModal.featuredFurnitureIds.map(prodId => {
                          const prod = PRODUCTS_CATALOG.find(p => p.id === prodId);
                          if (!prod) return null;
                          return (
                            <button
                              key={prodId}
                              onClick={() => {
                                if (onQuickViewProduct) {
                                  onQuickViewProduct(prod);
                                  setActiveProjectModal(null);
                                }
                              }}
                              className="px-3 py-1.5 bg-[#F4EFEA] hover:bg-[#171615] hover:text-white text-xs font-semibold tracking-wider transition-colors flex items-center gap-1.5"
                            >
                              <span>{prod.name}</span>
                              <ExternalLink className="w-3 h-3 text-[#0D9488]" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-[#E6DDD4] flex items-center justify-between">
                  <button
                    onClick={() => {
                      setActiveProjectModal(null);
                      if (onOpenConsultation) onOpenConsultation();
                    }}
                    className="w-full py-3 bg-[#171615] text-[#FAF8F5] hover:bg-[#0D9488] transition-colors text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>Inquire About Similar Architecture</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
