import React from 'react';
import { Polygon, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Create a small white glowing node for draggable points
const createNodeIcon = () => {
  return L.divIcon({
    className: 'custom-node-icon',
    html: `<div style="
      width: 14px; 
      height: 14px; 
      background: #fff; 
      border: 3px solid var(--accent-primary);
      border-radius: 50%; 
      box-shadow: 0 0 12px rgba(250, 204, 21, 0.8);
      transform: translate(-50%, -50%);
    "></div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

const PolygonDrawer = ({ points, setPoints }) => {
  // Listen for clicks on the map to add points
  useMapEvents({
    click(e) {
      if (!e.latlng) return;
      setPoints(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
    }
  });

  const handlePointDrag = (index, newLatLng) => {
    setPoints(prev => {
      const updated = [...prev];
      updated[index] = [newLatLng.lat, newLatLng.lng];
      return updated;
    });
  };

  return (
    <>
      {points.length > 0 && (
        <Polygon 
          positions={points}
          pathOptions={{ 
            color: '#fff', 
            weight: 3, 
            fillColor: 'var(--success-base)', 
            fillOpacity: 0.35, 
            dashArray: points.length < 3 ? '5, 5' : '0' // dash line if not closed shape
          }}
        />
      )}

      {points.map((pt, i) => (
        <Marker 
          key={`node-${i}`} 
          position={pt} 
          draggable={true}
          icon={createNodeIcon()}
          zIndexOffset={1000} // Ensure nodes are always on top
          eventHandlers={{
            drag(e) {
              handlePointDrag(i, e.target.getLatLng());
            }
          }}
        />
      ))}
    </>
  );
};

export default PolygonDrawer;
