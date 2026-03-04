import { useState, useEffect } from "react";
import type { Property } from "../../types/property";
import { Hero, Header, PropertyGrid, ComparisonDrawer } from "components";
import { INDIAN_STATES } from "constants/locations";
import type { SearchFilters } from "components/Hero";

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set());
  const [comparingIds, setComparingIds] = useState<Set<string>>(new Set());
  const [showComparison, setShowComparison] = useState(false);
  const [loading, setLoading] = useState(true);

  const [availableStates, setAvailableStates] = useState<string[]>([]);

  useEffect(() => {
    setAvailableStates(INDIAN_STATES);
    fetchProperties();
  }, []);

  // useEffect(() => {
  //   if (comparingIds.size >= 2) {
  //     setShowComparison(true);
  //   } else {
  //     setShowComparison(false);
  //   }
  // }, [comparingIds]);

  async function fetchProperties(filters?: SearchFilters) {
    try {
      setLoading(true);

      let url = `${import.meta.env.VITE_BACKEND_URL}/listing/list`;

      if (filters) {
        const params = new URLSearchParams();

        if (filters.state) params.append("state", filters.state.toLowerCase());
        if (filters.city) params.append("city", filters.city.toLowerCase());
        if (filters.priceRange) params.append("price", filters.priceRange[1].toString());
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      const result = await res.json();

      if (result.data && Array.isArray(result.data)) {
        const cleanData = result.data.map((item: any) => ({
          ...item,
          id: item._id,
        }));

        setProperties(cleanData);
        setFilteredProperties(cleanData);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(filters: SearchFilters) {
    // let filtered = [...properties];

    // if (filters.state) {
    //   filtered = filtered.filter((p) => p.address.state === filters.state);
    // }

    // if (filters.city) {
    //   filtered = filtered.filter((p) => p.address.city === filters.city);
    // }

    // filtered = filtered.filter(
    //   (p) =>
    //     p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    // );

    fetchProperties(filters);
  }

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

  // const comparisonProperties = properties.filter((p) => comparingIds.has(p.id));

  return (
    <div className="min-h-screen bg-[#121212] font-['Inter',sans-serif]">
      <Header
        shortlistCount={shortlistedIds.size}
        onShortlistClick={handleShortlistClick}
      />

      <Hero
        onSearch={handleSearch}
        availableStates={availableStates}
        availableCities={[]}
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
            onShortlist={() => console.log("onCompare")}
            onCompare={() => console.log("onCompare")}
            shortlistedIds={shortlistedIds}
            comparingIds={comparingIds}
          />
        )}
      </main>

      {/* {showComparison && (
        <ComparisonDrawer
          properties={[]}
          onClose={() => setComparingIds(new Set())}
          onRemove={handleRemoveFromComparison}
        />
      )} */}
    </div>
  );
}

export default App;
