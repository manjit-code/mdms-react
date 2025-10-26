export const lightTheme = {
  mode: "light",
  background: {
    primary: "bg-gray-300",
    secondary: "bg-stone-50",
    highlight: "bg-blue-50",
    sidebar: "bg-stone-100",
    card: "bg-white",
    header: "bg-gray-100",
  },
  text: {
    primary: "text-gray-800",
    secondary: "text-gray-600",
    sidebar: "text-white",
    accent: "text-blue-600",
    active: "text-blue-600",
  },
  border: {
    primary: "border-gray-200",
    secondary: "border-blue-200",
    accent: "border-blue-500",
    input: "border-gray-300",
  },
  input: {
    base: "bg-white border border-gray-300 text-gray-800 placeholder-gray-400",
    focus: "focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
  },
  button: {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-blue-500 hover:bg-gray-200",
    action: "bg-black text-white hover:bg-blue-600",
    disabled: "bg-gray-100 text-gray-400 cursor-not-allowed",
  },
  ring: "ring-blue-500",
  toggle: {
    bg: "bg-blue-600",
    active: "bg-green-500",
  },
  status: {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    warning: "bg-yellow-100 text-yellow-800",
  },
};

export const darkTheme = {
  mode: "dark",
  background: {
    primary: "bg-slate-900",
    secondary: "bg-gray-800",
    highlight: "bg-indigo-900/30",
    sidebar: "bg-slate-900",
    card: "bg-slate-700",
    header: "bg-slate-900",
  },
  text: {
    primary: "text-slate-100",
    secondary: "text-slate-300",
    sidebar: "text-slate-100",
    accent: "text-indigo-400",
    active: "text-indigo-400",
  },
  border: {
    primary: "border-slate-600",
    secondary: "border-indigo-700",
    accent: "border-indigo-500",
    input: "border-slate-600",
  },
  input: {
    base: "bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-400",
    focus: "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500",
  },
  button: {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-slate-700 text-slate-200 hover:bg-slate-600",
    action: "bg-indigo-800 text-white hover:bg-indigo-600",
    disabled: "bg-slate-800 text-slate-500 cursor-not-allowed",
  },
  ring: "ring-indigo-500",
  toggle: {
    bg: "bg-indigo-600",
    active: "bg-emerald-500",
  },
  status: {
    active: "bg-emerald-900/50 text-emerald-300",
    inactive: "bg-slate-700 text-slate-300",
    warning: "bg-amber-900/50 text-amber-300",
  },
};
