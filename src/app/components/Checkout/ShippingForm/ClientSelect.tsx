'use client';
import dynamic from "next/dynamic";
import type { Props as SelectProps, GroupBase } from "react-select";

export type ClientSelectOption = {
  value: string;
  label: string;
};

// dynamic() doesn’t like generics, so we assert the type after import
const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false,
}) as unknown as React.ComponentType<SelectProps<ClientSelectOption, false, GroupBase<ClientSelectOption>>>;

export default function ClientSelect(
  props: Omit<SelectProps<ClientSelectOption, false>, "isMulti">
) {
  return <ReactSelect {...props} isMulti={false} />;
}
