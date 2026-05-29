"use client";

import { useCallback, useMemo, useState } from "react";
import type { AnyFieldApi } from "@tanstack/react-form";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { LucideIconDisplay } from "@/lib/lucide-icon-display";
import { getIconPickerItems } from "@/lib/lucide-icon-utils";

type IconComboboxFieldProps = {
  field: AnyFieldApi;
  options: readonly string[];
  label: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  allowEmpty?: boolean;
  emptyLabel?: string;
};

export function IconComboboxField({
  field,
  options,
  label,
  description,
  placeholder = "Search icons...",
  disabled = false,
  allowEmpty = false,
  emptyLabel = "No icon",
}: IconComboboxFieldProps) {
  const fieldId = field.name;
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );
  const setFieldRef = useCallback((node: HTMLDivElement | null) => {
    setPortalContainer(
      node?.closest<HTMLElement>('[data-slot="dialog-content"]') ?? null,
    );
  }, []);
  const [query, setQuery] = useState("");
  const selectedValue =
    typeof field.state.value === "string" ? field.state.value : null;

  const hasError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0;

  const items = useMemo(
    () => getIconPickerItems(options, query, selectedValue),
    [options, query, selectedValue],
  );

  const handleValueChange = (nextValue: string | null) => {
    if (allowEmpty && !nextValue) {
      field.handleChange(null);
      field.handleBlur();
      return;
    }

    field.handleChange(nextValue);
    field.handleBlur();
  };

  return (
    <Field data-invalid={hasError || undefined}>
      <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      <FieldContent>
        <Combobox
          items={items}
          filteredItems={items}
          value={selectedValue}
          disabled={disabled}
          onValueChange={handleValueChange}
          onInputValueChange={setQuery}
          itemToStringLabel={(item) => item}
        >
          <div ref={setFieldRef} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {selectedValue ? (
                <LucideIconDisplay
                  name={selectedValue}
                  className="size-4"
                  showLabel
                  labelClassName="max-w-40 truncate"
                />
              ) : (
                <span className="text-xs text-muted-foreground">{emptyLabel}</span>
              )}
            </div>

            <ComboboxInput
              id={fieldId}
              placeholder={placeholder}
              aria-invalid={hasError || undefined}
              showClear={allowEmpty && Boolean(selectedValue)}
              disabled={disabled}
              className="w-full"
            />

            <ComboboxContent
              container={portalContainer ?? undefined}
              className={portalContainer ? "z-60" : undefined}
            >
              <ComboboxList>
                <ComboboxEmpty>
                  {query.trim() ? "No icons found" : "Browse available icons"}
                </ComboboxEmpty>
                <ComboboxCollection>
                  {(iconName: string) => (
                    <ComboboxItem key={iconName} value={iconName}>
                      <span className="truncate">{iconName}</span>
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxList>
            </ComboboxContent>
          </div>
        </Combobox>

        {allowEmpty && selectedValue ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 w-fit px-2"
            disabled={disabled}
            onClick={() => handleValueChange(null)}
          >
            Clear icon
          </Button>
        ) : null}

        {description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}
        {hasError ? (
          <FieldError errors={field.state.meta.errors} />
        ) : null}
      </FieldContent>
    </Field>
  );
}
