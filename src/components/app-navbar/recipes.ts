import type { VariantProps } from "class-variance-authority";
import { twCva } from "../../utils/twCva";

export const navbarClass = twCva("navbar bg-base-100");
export type NavbarClassProps = VariantProps<typeof navbarClass>;

export const navbarStartClass = twCva("navbar-start");
export type NavbarStartClassProps = VariantProps<typeof navbarStartClass>;

export const navbarCenterClass = twCva("navbar-center");
export type NavbarCenterClassProps = VariantProps<typeof navbarCenterClass>;

export const navbarEndClass = twCva("navbar-end");
export type NavbarEndClassProps = VariantProps<typeof navbarEndClass>;
