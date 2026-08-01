import React, { useState } from 'react';
import { ChevronDown, Sparkles, MapPin, Headset, Briefcase, HelpCircle } from 'lucide-react';

interface FaqItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: string;
  actionText?: string;
  onAction?: () => void;
}

interface FaqSectionProps {
  onOpenConsultation: () => void;
  onOpenStoreLocator: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onOpenConsultation,
  onOpenStoreLocator
}) => {
  const [openId, setOpenId] = useState<string>('designers');

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? '' : id));
  };

  const FAQ_ITEMS: FaqItem[] = [
    {
      id: 'designers',
      title: 'Chat with our interior designers',
      icon: <Sparkles className="w-4 h-4 text-[#C5A059]" />,
      content: 'Speak directly with one of our Danish interior designers to bring your vision to life. Our experts are ready to offer personalized advice, creative 3D spatial solutions, and material guidance tailored to your unique style and floor plan.',
      actionText: 'Learn more about our Interior Design Service. →',
      onAction: onOpenConsultation
    },
    {
      id: 'stores',
      title: 'Find a store near you.',
      icon: <MapPin className="w-4 h-4 text-[#C5A059]" />,
      content: 'Experience KØBENHAVN Danish craftsmanship in person. Visit our flagships and showrooms across major design capitals to test swatches, compare configurations, and consult with our on-site interior stylists.',
      actionText: 'Locate Nearest Flagship Store →',
      onAction: onOpenStoreLocator
    },
    {
      id: 'customer-service',
      title: 'Customer Service & Order Support',
      icon: <Headset className="w-4 h-4 text-[#C5A059]" />,
      content: 'Our dedicated customer service team is here to assist with order tracking, custom upholstery care, white-glove delivery scheduling, and our 10-year structural furniture warranty.'
    },
    {
      id: 'careers',
      title: 'Looking for a career with us?',
      icon: <Briefcase className="w-4 h-4 text-[#C5A059]" />,
      content: "Join KØBENHAVN's global community of passionate interior designers, retail leaders, and design consultants. Discover open opportunities across interior styling, showroom operations, and architectural sales."
    },
    {
      id: 'faqs',
      title: 'Frequently Asked Questions (FAQ)',
      icon: <HelpCircle className="w-4 h-4 text-[#C5A059]" />,
      content: 'Have questions about fabric swatch shipping, lead times, or modular dimensions? All KØBENHAVN pieces are built to order in Europe with premium eco-certified materials. Free swatch kits are dispatched within 24 hours.'
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-[#E6DDD4] text-[#171615]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Title & Subtitle */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171615] leading-tight">
              Danish Design Furniture and Interior Design
            </h2>
            <p className="text-sm sm:text-base text-[#171615]/75 font-light leading-relaxed">
              Looking for Danish Design Furniture? Our dedicated customer services team is ready to answer any enquiries you may have. Whether it's about our services, products, or something else – we are here to help.
            </p>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 divide-y divide-[#E6DDD4] border-t border-b border-[#E6DDD4]">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="py-5 transition-colors">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="font-serif text-lg sm:text-xl font-bold text-[#171615] group-hover:text-[#B0977B] transition-colors flex items-center gap-3">
                      {item.title}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#171615] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-[#B0977B]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-4 space-y-4 text-xs sm:text-sm text-[#171615]/80 font-light leading-relaxed animate-in fade-in duration-200">
                      <p>{item.content}</p>
                      {item.actionText && (
                        <div>
                          <button
                            onClick={item.onAction}
                            className="mt-2 inline-flex items-center gap-2 bg-[#171615] text-white px-5 py-3 text-xs uppercase font-semibold tracking-wider hover:bg-[#B0977B] transition-colors shadow-md"
                          >
                            <span>{item.actionText}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
