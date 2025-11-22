import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Card } from "@/components/ui/card";
import { Map } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface TripMapProps {
  items: Array<{
    id: string;
    title: string;
    location: string;
    time?: string;
    cost?: number;
  }>;
  destination: string;
}

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export const TripMap = ({ items, destination }: TripMapProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([48.8566, 2.3522]);
  const [markers, setMarkers] = useState<Array<{
    position: [number, number];
    title: string;
    location: string;
    time?: string;
    cost?: number;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const geocodeDestination = async () => {
      try {
        setLoading(true);
        // Geocode destination for map center
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            destination
          )}&count=1`
        );
        const geoData = await geoResponse.json();

        if (geoData.results && geoData.results[0]) {
          const { latitude, longitude } = geoData.results[0];
          setMapCenter([latitude, longitude]);

          // Geocode each location
          const geocodedMarkers = await Promise.all(
            items
              .filter((item) => item.location)
              .map(async (item, idx) => {
                try {
                  const itemGeoResponse = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                      item.location + " " + destination
                    )}&count=1`
                  );
                  const itemGeoData = await itemGeoResponse.json();

                  if (itemGeoData.results && itemGeoData.results[0]) {
                    return {
                      position: [
                        itemGeoData.results[0].latitude,
                        itemGeoData.results[0].longitude,
                      ] as [number, number],
                      title: item.title,
                      location: item.location,
                      time: item.time,
                      cost: item.cost,
                    };
                  }
                } catch (e) {
                  console.error("Geocoding error for item:", item.location, e);
                }

                // Fallback to destination coordinates with slight offset
                return {
                  position: [
                    latitude + (Math.random() - 0.5) * 0.02,
                    longitude + (Math.random() - 0.5) * 0.02,
                  ] as [number, number],
                  title: item.title,
                  location: item.location,
                  time: item.time,
                  cost: item.cost,
                };
              })
          );

          setMarkers(geocodedMarkers);
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (items.length > 0) {
      geocodeDestination();
    } else {
      setLoading(false);
    }
  }, [items, destination]);

  if (loading) {
    return (
      <Card className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Map className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Interactive Map</h3>
        </div>
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading map...</div>
        </div>
      </Card>
    );
  }

  if (markers.length === 0) {
    return (
      <Card className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Map className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Interactive Map</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Add locations to your itinerary items to see them on the map
        </p>
      </Card>
    );
  }

  return (
    <Card className="glass-card p-6 hover-lift">
      <div className="flex items-center gap-2 mb-4">
        <Map className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Interactive Map</h3>
      </div>
      <div className="h-[500px] rounded-lg overflow-hidden shadow-soft">
        <MapContainer
          center={mapCenter}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <MapUpdater center={mapCenter} zoom={12} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker, idx) => (
            <Marker key={idx} position={marker.position}>
              <Popup>
                <div className="p-1">
                  <strong className="text-sm">{marker.title}</strong>
                  <br />
                  <span className="text-xs text-muted-foreground">{marker.location}</span>
                  {marker.time && (
                    <>
                      <br />
                      <span className="text-xs">🕐 {marker.time}</span>
                    </>
                  )}
                  {marker.cost !== undefined && marker.cost > 0 && (
                    <>
                      <br />
                      <span className="text-xs">💰 ${marker.cost}</span>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  );
};
