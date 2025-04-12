
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { commonTechTags } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function TagInput({
  value,
  onChange,
  placeholder = "Add tags...",
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const suggestions = commonTechTags.filter(
    (tag) =>
      tag.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(tag)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addTag = (tag: string) => {
    if (tag.trim() !== "" && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInputValue("");
    inputRef.current?.focus();
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex flex-wrap gap-2 p-2 bg-background rounded-md border border-input mb-2">
        {value.map((tag) => (
          <div
            key={tag}
            className="bg-secondary text-foreground text-sm rounded-md px-2 py-1 flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <div className="flex-grow">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder={value.length === 0 ? placeholder : ""}
            className="border-none px-0 shadow-none h-7 focus-visible:ring-0"
          />
        </div>
      </div>
      {showSuggestions && inputValue && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 mt-1 w-full bg-popover rounded-md shadow-md max-h-52 overflow-auto"
        >
          <div className="p-2 space-y-1">
            {suggestions.length > 0 ? (
              suggestions.slice(0, 5).map((suggestion) => (
                <Button
                  key={suggestion}
                  type="button"
                  variant="ghost"
                  className="w-full justify-start text-sm h-8"
                  onClick={() => {
                    addTag(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {suggestion}
                </Button>
              ))
            ) : (
              <Button
                type="button"
                variant="ghost"
                className="w-full justify-start text-sm h-8"
                onClick={() => {
                  addTag(inputValue);
                  setShowSuggestions(false);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add "{inputValue}"
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
