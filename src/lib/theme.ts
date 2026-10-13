export const THEME_STORAGE_KEY = "ff_theme"

export const THEME_COLORS = {
  light: "#17382c",
  dark: "#0a1e17",
} as const

export type Theme = keyof typeof THEME_COLORS

export const THEME_INIT_SCRIPT = `(function(){var s=null;try{s=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}var t=s==="light"||s==="dark"?s:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"${THEME_COLORS.dark}":"${THEME_COLORS.light}")})()`
