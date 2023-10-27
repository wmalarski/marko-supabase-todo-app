import type { VariantProps } from "class-variance-authority";
import { twCva } from "../../utils/twCva";

export const formControlClass = twCva("form-control");
export type FormControlClassProps = VariantProps<typeof formControlClass>;

export const textFieldLabelClass = twCva("label label-text gap-2");
export type TextFieldLabelClassProps = VariantProps<typeof textFieldLabelClass>;

export const textFieldDescriptionClass = twCva("label-text-alt pt-2");
export type TextFieldDescriptionClassProps = VariantProps<
  typeof textFieldDescriptionClass
>;

export const textFieldErrorMessageClass = twCva("text-sm text-error-content");
export type TextFieldErrorMessageClassProps = VariantProps<
  typeof textFieldErrorMessageClass
>;

export const textFieldInputClass = twCva("input", {
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
export type TextFieldInputClassProps = VariantProps<typeof textFieldInputClass>;
