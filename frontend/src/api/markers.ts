import { CreateMarkerDto, Marker, UpdateMarkerDto } from "../types/marker";

// Initial mock data
const initialMarkers: Marker[] = [
  { id: 1, latitude: 51.505, longitude: -0.09, comment: "London City Center" },
  { id: 2, latitude: 51.51, longitude: -0.1, comment: "Tourist Attraction" },
];

// Initialize local storage with mock data if empty
const initializeStorage = () => {
  const stored = localStorage.getItem("markers");
  if (!stored) {
    localStorage.setItem("markers", JSON.stringify(initialMarkers));
  }
};

// Initialize on load
initializeStorage();

// Helper to get current markers
const getStoredMarkers = (): Marker[] => {
  return JSON.parse(localStorage.getItem("markers") || "[]");
};

// Helper to save markers
const saveMarkers = (markers: Marker[]) => {
  localStorage.setItem("markers", JSON.stringify(markers));
};

export const markersApi = {
  getAll: async (): Promise<Marker[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    return getStoredMarkers();
  },

  create: async (data: CreateMarkerDto): Promise<Marker> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const markers = getStoredMarkers();
    const newMarker: Marker = {
      ...data,
      id: Math.max(0, ...markers.map((m) => m.id)) + 1,
    };
    markers.push(newMarker);
    saveMarkers(markers);
    return newMarker;
  },

  update: async ({ id, ...data }: UpdateMarkerDto): Promise<Marker> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const markers = getStoredMarkers();
    const index = markers.findIndex((m) => m.id === id);
    if (index === -1) throw new Error("Marker not found");

    const updatedMarker = { ...markers[index], ...data };
    markers[index] = updatedMarker;
    saveMarkers(markers);
    return updatedMarker;
  },

  delete: async (id: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const markers = getStoredMarkers();
    const filteredMarkers = markers.filter((m) => m.id !== id);
    saveMarkers(filteredMarkers);
  },
};
