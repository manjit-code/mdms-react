/** @type {import('tailwindcss').Config} */
import { lightTheme, darkTheme } from './src/assets/theme/theme';


function extractClasses(themObj, set = new Set()){
  Object.values(themObj).forEach((val) =>{
    if(typeof val === "string"){
      val.split(" ").forEach((clss) => set.add(clss.trim()));
    }
    else if(typeof val === "object"){
      extractClasses(val, set);
    }
  })
  return Array.from(set);
}

const safelist = [
  ...extractClasses(lightTheme),
  ...extractClasses(darkTheme),
];

export default {
  content: ["./index.html", "./src/**/*.{jsx, js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist,
};