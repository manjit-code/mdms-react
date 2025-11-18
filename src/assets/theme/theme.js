export const lightTheme = {
  mode: "light",
  background: {
    primary: "bg-gray-300",
    secondary: "bg-stone-50",
    highlight: "bg-blue-50",
    sidebar: "bg-stone-100",
    card: "bg-white",
    header: "bg-gray-300",
    mini_card: "bg-gray-200",
    table_head: "bg-stone-100"
  },
  text: {
    primary: "text-gray-800",
    secondary: "text-gray-600",
    sidebar: "text-white",
    accent: "text-blue-600",
    active: "text-blue-600",
    hover: "hover:bg-gray-50 transition",
    action_hover: "hover:bg-gray-200 transition",
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
    // Main body background - deepest layer
    primary: "bg-[#0a0e14]",

    // Content areas and main sections
    secondary: "bg-[#121820]",

    // Subtle highlights (for hover states, etc.)
    highlight: "bg-[#1a2332]",

    // Sidebar - matches primary for seamless integration
    sidebar: "bg-[#0f1419]",

    // Table headers - slightly elevated
    table_head: "bg-[#161c26]",

    // Cards - clearly elevated from background
    card: "bg-[#1a2332]",

    // Header - matches sidebar depth
    header: "bg-[#0f1419]",

    // Page wrapper
    page: "bg-[#121820]",

    // Mini cards - more elevated than regular cards
    mini_card: "bg-[#1f2937]"
  },

  text: {
    // Primary text - high contrast for readability
    primary: "text-[#e4e7eb]",

    // Secondary text - muted but still readable
    secondary: "text-[#9ca3af]",

    // Sidebar text
    sidebar: "text-[#d1d5db]",

    // Accent color - refined blue
    accent: "text-[#60a5fa]",

    // Active states - vibrant blue
    active: "text-[#3b82f6]",

    // Hover effects
    hover: "hover:bg-[#1f2937] transition-colors duration-200",
    action_hover: "hover:bg-[#252f3f] transition-colors duration-200",
  },

  border: {
    // Subtle borders that don't overpower
    primary: "border-[#252f3f]",
    secondary: "border-[#374151]",
    accent: "border-[#3b82f6]",
    input: "border-[#374151]",
  },

  input: {
    base: "bg-[#1a2332] border border-[#374151] text-[#e4e7eb] placeholder-[#6b7280]",
    focus: "focus:border-[#60a5fa] focus:ring-1 focus:ring-[#60a5fa]/50",
  },

  button: {
    // Primary action - vibrant but not overwhelming
    primary: "bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-colors duration-200",

    // Secondary button
    secondary: "bg-[#1f2937] text-[#d1d5db] hover:bg-[#374151] transition-colors duration-200",

    // Action button
    action: "bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-colors duration-200",

    // Disabled state
    disabled: "bg-[#1a2332] text-[#6b7280] cursor-not-allowed",
  },

  ring: "ring-[#3b82f6]",

  toggle: {
    bg: "bg-[#3b82f6]",
    active: "bg-[#10b981]",
  },

  status: {
    active: "bg-[#064e3b] text-[#6ee7b7]",
    inactive: "bg-[#1f2937] text-[#9ca3af]",
    warning: "bg-[#78350f] text-[#fcd34d]",
  },
};