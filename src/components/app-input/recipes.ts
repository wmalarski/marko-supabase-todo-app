import type { VariantProps } from "class-variance-authority";
import { twCva } from "../../utils/twCva";

export const inputFormControlClass = twCva("form-control");
export type InputFormControlClassProps = VariantProps<
  typeof inputFormControlClass
>;

export const inputLabelClass = twCva("label label-text gap-2");
export type InputLabelClassProps = VariantProps<typeof inputLabelClass>;

export const inputDescriptionClass = twCva("label-text-alt pt-2");
export type InputDescriptionClassProps = VariantProps<
  typeof inputDescriptionClass
>;

export const inputErrorMessageClass = twCva("text-sm text-error-content");
export type InputErrorMessageClassProps = VariantProps<
  typeof inputErrorMessageClass
>;

export const inputTextClass = twCva("input", {
  defaultVariants: {
    color: null,
    size: "md",
    variant: null,
  },
  variants: {
    color: {
      accent: "input-accent",
      error: "input-error",
      info: "input-info",
      primary: "input-primary",
      secondary: "input-secondary",
      success: "input-success",
      warning: "input-warning",
    },
    size: {
      lg: "input-lg",
      md: "input-md",
      sm: "input-sm",
      xs: "input-xs",
    },
    variant: {
      bordered: "input-bordered",
      ghost: "input-ghost",
    },
  },
});
export type InputTextClassProps = VariantProps<typeof inputTextClass>;

export const inputCheckboxClass = twCva("checkbox", {
  defaultVariants: {
    color: null,
    size: "md",
  },
  variants: {
    color: {
      accent: "checkbox-accent",
      error: "checkbox-error",
      info: "checkbox-info",
      primary: "checkbox-primary",
      secondary: "checkbox-secondary",
      success: "checkbox-success",
      warning: "checkbox-warning",
    },
    size: {
      lg: "checkbox-lg",
      md: "checkbox-md",
      sm: "checkbox-sm",
      xs: "checkbox-xs",
    },
  },
});
export type InputCheckboxClassProps = VariantProps<typeof inputCheckboxClass>;
