import type { VariantProps } from "class-variance-authority";
import { twCva } from "../../utils/twCva";

export const alertClass = twCva("alert justify-start", {
  defaultVariants: {
    variant: null,
  },
  variants: {
    variant: {
      error: "alert-error",
      info: "alert-info",
      success: "alert-success",
      warning: "alert-warning",
    },
  },
});

export type AlertClassProps = VariantProps<typeof alertClass>;
