import type { Property } from "../types/property";
import PropertyCard from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
  onShortlist: (id: string) => void;
  onCompare: (id: string, checked: boolean) => void;
  shortlistedIds: Set<string>;
  comparingIds: Set<string>;
}

export default function PropertyGrid({
  properties,
  onShortlist,
  onCompare,
  shortlistedIds,
  comparingIds
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">No properties found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onShortlist={onShortlist}
          onCompare={onCompare}
          isShortlisted={shortlistedIds.has(property.id)}
          isComparing={comparingIds.has(property.id)}
        />
      ))}
    </div>
  );
}
