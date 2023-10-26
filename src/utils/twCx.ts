import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const twCx: typeof clsx = (...args) => {
  return twMerge(clsx(...args));
};
