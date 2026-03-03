import { X, Bed, Bath, Maximize, MapPin, DollarSign } from "lucide-react";
import type { Property } from "../types/property";

interface ComparisonDrawerProps {
  properties: Property[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

export default function ComparisonDrawer({
  properties,
  onClose,
  onRemove,
}: ComparisonDrawerProps) {
  if (properties.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#121212] border-t border-white/10 shadow-2xl animate-slide-up">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">
            Compare Properties ({properties.length})
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="text-gray-400" size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-96 overflow-y-auto">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 relative"
            >
              <button
                onClick={() => onRemove(property.id)}
                className="absolute top-2 right-2 p-1 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors"
              >
                <X size={16} className="text-red-400" />
              </button>

              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />

              <h4 className="text-lg font-bold text-white mb-2">
                {property.title}
              </h4>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-emerald-400">
                  <DollarSign size={16} />
                  <span className="font-bold">
                    ${(property.price / 1000000).toFixed(2)}M
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={16} />
                  <span>
                    {property.city}, {property.state}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-1">
                    <Bed size={14} />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath size={14} />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize size={14} />
                    <span>{property.sqft.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
