import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Polygon } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MOCK_LAND_DATA } from '../data/mockData';

// UI
import BottomSheetCard from '../components/Cards/BottomSheetCard';
import { Search, Filter } from 'lucide-react';

// Drawing Utils
import PolygonDrawer from '../components/Map/PolygonDrawer';
import DrawControlsUI from '../components/Map/DrawControlsUI';

const createCustomIcon = (price, isActive = false) => {
  return L.divIcon({
    className: 'custom-map-icon',
    html: `
      <div style="
        background: ${isActive ? 'var(--accent-primary)' : 'var(--bg-elevated)'};
        color: ${isActive ? '#000' : 'var(--text-primary)'};
        padding: 6px 12px;
        border-radius: 9999px;
        font-weight: 700;
        font-family: var(--font-display);
        font-size: 14px;
        border: 2px solid ${isActive ? '#000' : 'var(--border-subtle)'};
        box-shadow: var(--shadow-float);
        white-space: nowrap;
        transform: translate(-50%, -100%);
        transition: all 0.3s ease;
      ">
        ${price.split(' /')[0]}
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

const MapController = ({ activeProperty }) => {
  const map = useMap();
  useEffect(() => {
    if (activeProperty) {
      const lt = activeProperty.coordinates[0] - 0.005;
      const lg = activeProperty.coordinates[1];
      map.flyTo([lt, lg], 15, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  }, [activeProperty, map]);
  return null;
};

const Explore = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDrawingMode = searchParams.get('mode') === 'draw';

  const [activeProperty, setActiveProperty] = useState(null);
  
  // Drawing State
  const [polygonPoints, setPolygonPoints] = useState([]);

  const defaultCenter = [17.4065, 78.4772];

  const surveyId = searchParams.get('survey');

  // Discard drawing state if mode changes, or hydrate if survey match!
  useEffect(() => {
    if (!isDrawingMode) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPolygonPoints([]);
    } else if (surveyId === '123') {
      // Simulated official boundary coordinates exactly over dense Gachibowli terrain
      setPolygonPoints([
        [17.4399, 78.3489],
        [17.4411, 78.3487],
        [17.4409, 78.3503],
        [17.4396, 78.3496]
      ]);
      
      // We pass a dummy 'activeProperty' temporarily just to leverage the smooth MapController flyTo mechanics
      setActiveProperty({ coordinates: [17.4399, 78.3489] });
      
      // Clean up the dummy property so bottom sheet doesn't popup over the drawing controls
      setTimeout(() => setActiveProperty(null), 1000); 
    }
  }, [isDrawingMode, surveyId]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      
      {/* Heavy vignette shadow overhead */}
      <div style={{
         position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
         boxShadow: 'inset 0 0 160px rgba(0,0,0,0.8)',
         pointerEvents: 'none',
         zIndex: 5
      }} />

      {/* Primary UI Overlay (Hidden during draw) */}
      {!isDrawingMode && (
         <div style={{
           position: 'absolute', top: 0, left: 0, width: '100%',
           padding: '48px 20px 24px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, transparent 100%)',
           zIndex: 10, pointerEvents: 'none'
         }}>
           <div className="glass-panel" style={{ borderRadius: '9999px', padding: '12px 20px', display: 'flex', alignItems: 'center', pointerEvents: 'auto' }}>
              <Search size={20} color="var(--text-secondary)" style={{ marginRight: '12px' }} />
              <input 
                type="text" 
                placeholder="Search precise bounds..." 
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', width: '100%', outline: 'none', fontSize: '16px', fontFamily: 'var(--font-sans)', fontWeight: 500 }} 
              />
              <div style={{ width: '1px', height: '24px', background: 'var(--border-strong)', marginX: '12px' }} />
              <Filter size={20} color="var(--text-primary)" style={{ marginLeft: '12px' }} cursor="pointer" />
           </div>
           
           <div style={{ display: 'flex', gap: '8px', marginTop: '16px', overflowX: 'auto', pointerEvents: 'auto', paddingBottom: '8px' }} className="hide-scroll">
             <div className="glass-pill">Farm Land</div>
             <div className="glass-pill" style={{ borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}>RERA/HMDA</div>
           </div>
         </div>
      )}

      {/* Drawing UI Controls */}
      <AnimatePresence>
        {isDrawingMode && (
          <DrawControlsUI 
             points={polygonPoints} 
             onUndo={() => setPolygonPoints(prev => prev.slice(0, -1))}
             onCancel={() => navigate('/seller')}
             onSave={(metrics) => {
                navigate('/list', { state: { gajam: metrics.gajam, points: polygonPoints } });
             }}
          />
        )}
      </AnimatePresence>

      <MapContainer 
        center={defaultCenter} 
        zoom={11} 
        zoomControl={false}
        style={{ height: '100%', width: '100%', background: '#000' }}
      >
         <TileLayer
           url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
           attribution='Tiles &copy; Esri'
           maxZoom={18}
         />
         <MapController activeProperty={activeProperty} />

         {/* If active drawing, lock markers. Else view normal markers. */}
         {isDrawingMode ? (
            <PolygonDrawer points={polygonPoints} setPoints={setPolygonPoints} />
         ) : (
             <MarkerClusterGroup
               chunkedLoading
               maxClusterRadius={40}
               showCoverageOnHover={false}
               iconCreateFunction={(cluster) => {
                 return L.divIcon({
                   html: `<div style="background: var(--bg-elevated); color: var(--text-primary); border: 2px solid var(--border-subtle); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: var(--font-display); box-shadow: var(--shadow-float);">${cluster.getChildCount()}</div>`,
                   className: 'custom-cluster-icon',
                   iconSize: [40, 40]
                 })
               }}
            >
              {MOCK_LAND_DATA.filter(l => l.status === 'ACTIVE').map((land) => (
                <Marker 
                  key={land.id}
                  position={land.coordinates}
                  icon={createCustomIcon(land.price, activeProperty?.id === land.id)}
                  eventHandlers={{ click: () => setActiveProperty(land) }}
                />
              ))}
            </MarkerClusterGroup>
         )}
      </MapContainer>

      {/* Interactive Bottom Sheet */}
      <AnimatePresence>
         {activeProperty && !isDrawingMode && (
           <BottomSheetCard property={activeProperty} onDismiss={() => setActiveProperty(null)} />
         )}
      </AnimatePresence>
    </div>
  );
};

export default Explore;
