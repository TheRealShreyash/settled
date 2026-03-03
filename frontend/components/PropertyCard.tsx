import { Heart, Bed, Bath, Maximize } from "lucide-react";
import type { Property } from "../types/property";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
  onShortlist: (id: string) => void;
  onCompare: (id: string, checked: boolean) => void;
  isShortlisted: boolean;
  isComparing: boolean;
}

export default function PropertyCard({
  property,
  onShortlist,
  onCompare,
  isShortlisted,
  isComparing,
}: PropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10">
      <div className="relative overflow-hidden aspect-4/3">
        <img
          src={property.image_url}
          alt={property.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
          } group-hover:scale-110`}
          onLoad={() => setImageLoaded(true)}
        />
        <button
          onClick={() => onShortlist(property.id)}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all ${
            isShortlisted
              ? "bg-emerald-500 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <Heart size={20} fill={isShortlisted ? "currentColor" : "none"} />
        </button>
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
              property.status === "Available Now"
                ? "bg-emerald-500/90 text-white"
                : property.status === "Coming Soon"
                  ? "bg-blue-500/90 text-white"
                  : "bg-gray-500/90 text-white"
            }`}
          >
            {property.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
          {property.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3">{property.address}</p>
        <p className="text-gray-400 text-sm mb-4">
          {property.city}, {property.state}
        </p>

        <div className="flex items-center gap-4 mb-4 text-gray-400 text-sm">
          <div className="flex items-center gap-1">
            <Bed size={16} />
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} />
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize size={16} />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-emerald-400">
              ${(property.price / 1000000).toFixed(2)}M
            </p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isComparing}
              onChange={(e) => onCompare(property.id, e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-sm text-gray-400">Compare</span>
          </label>
        </div>
      </div>
    </div>
  );
}
