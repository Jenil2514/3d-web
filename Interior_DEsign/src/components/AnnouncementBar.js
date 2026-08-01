import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ArrowRight, X, Sparkles } from 'lucide-react';
export const AnnouncementBar = ({ onOpenConsultation }) => {
    const [visible, setVisible] = useState(true);
    if (!visible)
        return null;
    return (_jsx("div", { className: "bg-[#FAEB9F] text-[#171615] text-xs md:text-sm font-medium py-1.5 px-4 transition-all duration-300 relative z-50 shadow-sm", children: _jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between gap-4", children: [_jsxs("div", { className: "flex-1 text-center flex items-center justify-center gap-2", children: [_jsx(Sparkles, { className: "w-4 h-4 text-[#8C6D1F] animate-pulse hidden sm:block" }), _jsxs("span", { children: [_jsx("strong", { className: "font-bold tracking-wide uppercase", children: "Complimentary Interior Styling" }), " \u2014 Transform your living space with our Danish Interior Designers."] }), _jsxs("button", { onClick: onOpenConsultation, className: "underline underline-offset-4 hover:opacity-75 font-semibold ml-2 inline-flex items-center gap-1 group transition-opacity", children: ["Book Appointment", _jsx(ArrowRight, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-1" })] })] }), _jsx("button", { onClick: () => setVisible(false), className: "p-1 hover:bg-black/10 rounded-full transition-colors flex-shrink-0", "aria-label": "Close notification", children: _jsx(X, { className: "w-4 h-4 text-[#171615]" }) })] }) }));
};
