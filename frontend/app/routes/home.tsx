import { useState, useEffect } from "react";
import type { Property } from "../../types/property";
import { Hero, Header, PropertyGrid, ComparisonDrawer } from "components";

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set());
  const [comparingIds, setComparingIds] = useState<Set<string>>(new Set());
  const [showComparison, setShowComparison] = useState(false);
  const [loading, setLoading] = useState(true);

  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (comparingIds.size >= 2) {
      setShowComparison(true);
    } else {
      setShowComparison(false);
    }
  }, [comparingIds]);

  async function fetchProperties() {
    setLoading(true);
    const res = await fetch("http://localhost:8080/listing/list");

    const data = await res.json();

    console.log(data)

    if (data) {
      setProperties(data);
    }

    setLoading(false);
  }

  // function handleSearch(filters: SearchFilters) {
  //   let filtered = [...properties];

  //   if (filters.state) {
  //     filtered = filtered.filter((p) => p.state === filters.state);
  //   }

  //   if (filters.city) {
  //     filtered = filtered.filter((p) => p.city === filters.city);
  //   }

  //   filtered = filtered.filter(
  //     (p) =>
  //       p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
  //   );

  //   setFilteredProperties(filtered);
  // }

  function handleShortlist(id: string) {
    setShortlistedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  function handleCompare(id: string, checked: boolean) {
    setComparingIds((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  }

  function handleRemoveFromComparison(id: string) {
    setComparingIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }

  function handleShortlistClick() {
    const shortlisted = properties.filter((p) => shortlistedIds.has(p.id));
    setFilteredProperties(shortlisted.length > 0 ? shortlisted : properties);
  }

  const comparisonProperties = properties.filter((p) => comparingIds.has(p.id));

  return (
    <div className="min-h-screen bg-[#121212] font-['Inter',sans-serif]">
      <Header
        shortlistCount={shortlistedIds.size}
        onShortlistClick={handleShortlistClick}
      />

      <Hero
        onSearch={() => console.log("Hello")}
        availableStates={availableStates}
        availableCities={availableCities}
      />

      <main className="max-w-7xl mx-auto px-6 pb-32">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
            <p className="text-gray-400 mt-4">Loading properties...</p>
          </div>
        ) : (
          <PropertyGrid
            properties={filteredProperties}
            onShortlist={handleShortlist}
            onCompare={handleCompare}
            shortlistedIds={shortlistedIds}
            comparingIds={comparingIds}
          />
        )}
      </main>

      {showComparison && (
        <ComparisonDrawer
          properties={comparisonProperties}
          onClose={() => setComparingIds(new Set())}
          onRemove={handleRemoveFromComparison}
        />
      )}
    </div>
  );
}

export default App;
