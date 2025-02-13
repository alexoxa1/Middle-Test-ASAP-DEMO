import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { markersApi } from "../api/markers";
import { CreateMarkerDto, Marker as MarkerType } from "../types/marker";
import MarkerModal from "./MarkerModal";
import L, { LeafletMouseEvent } from "leaflet";
import { LatLngTuple } from "leaflet";

// Fix for default marker icons in react-leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const DEFAULT_CENTER: LatLngTuple = [51.505, -0.09];
const DEFAULT_ZOOM = 13;

const MapEvents = ({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const Map = () => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);
  const [newMarkerPosition, setNewMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const queryClient = useQueryClient();

  const { data: markers = [] } = useQuery({
    queryKey: ["markers"],
    queryFn: markersApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: markersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["markers"] });
      setNewMarkerPosition(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: markersApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["markers"] });
      setSelectedMarker(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: markersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["markers"] });
      setSelectedMarker(null);
    },
  });

  const handleMapClick = (lat: number, lng: number) => {
    setNewMarkerPosition({ lat, lng });
  };

  const handleCreateMarker = (comment: string) => {
    if (newMarkerPosition) {
      const newMarker: CreateMarkerDto = {
        latitude: newMarkerPosition.lat,
        longitude: newMarkerPosition.lng,
        comment,
      };
      createMutation.mutate(newMarker);
    }
  };

  const handleUpdateMarker = (comment: string) => {
    if (selectedMarker) {
      updateMutation.mutate({ id: selectedMarker.id, comment });
    }
  };

  const handleDeleteMarker = () => {
    if (selectedMarker) {
      deleteMutation.mutate(selectedMarker.id);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents onMapClick={handleMapClick} />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.latitude, marker.longitude] as LatLngTuple}
            eventHandlers={{
              click: () => setSelectedMarker(marker),
            }}
          >
            <Popup>
              <div>
                <p>{marker.comment}</p>
                <button onClick={() => setSelectedMarker(marker)}>Edit</button>
                <button onClick={handleDeleteMarker}>Delete</button>
              </div>
            </Popup>
          </Marker>
        ))}

        {newMarkerPosition && (
          <Marker
            position={
              [newMarkerPosition.lat, newMarkerPosition.lng] as LatLngTuple
            }
          />
        )}
      </MapContainer>

      <div style={{ position: "relative", zIndex: 1000 }}>
        <MarkerModal
          isOpen={!!newMarkerPosition}
          onClose={() => setNewMarkerPosition(null)}
          onSubmit={handleCreateMarker}
          type="create"
        />

        <MarkerModal
          isOpen={!!selectedMarker}
          onClose={() => setSelectedMarker(null)}
          onSubmit={handleUpdateMarker}
          onDelete={handleDeleteMarker}
          type="edit"
          initialComment={selectedMarker?.comment}
        />
      </div>
    </div>
  );
};

export default Map;
