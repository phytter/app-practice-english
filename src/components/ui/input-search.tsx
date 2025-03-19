import { useDebounce } from "@/hooks";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./input";

export function InputSearch ({ placeholder, onSearch }: { placeholder: string, onSearch: (text: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery);

  useEffect(() => {
    onSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearch]);

  return (
    <div className="flex items-center gap-4">
      <Search className="text-muted-foreground" />
      <Input
        placeholder={placeholder || 'Search...'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md"
      />
    </div>
  )
}