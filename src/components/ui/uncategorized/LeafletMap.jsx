import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon creator for different alert levels
const createCustomIcon = (alertLevel = 'normal') => {
  const colors = {
    critical: '#ef4444',    // red-500
    warning: '#f59e0b',     // amber-500
    normal: '#10b981',      // emerald-500
    info: '#3b82f6'         // blue-500
  };

  const color = colors[alertLevel] || colors.normal;
  
  return new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
        <circle cx="16" cy="16" r="14" fill="${color}" stroke="#ffffff" stroke-width="2"/>
        <circle cx="16" cy="16" r="6" fill="#ffffff"/>
        ${alertLevel === 'critical' ? '<path d="M16 8 L16 18 M16 20 L16 22" stroke="#ffffff" stroke-width="2"/>' : ''}
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
}

// Zone Card Component
const ZoneCard = ({ zone, theme, t }) => (
  <div className={`p-4 rounded-lg border-2 min-w-[200px] ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-600 text-white' 
      : 'bg-white border-gray-200 text-gray-800'
  }`}>
    <h3 className="text-lg font-bold mb-3">{zone.name}</h3>
    
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm">{t('enterprise.leafletmap.total_meters')}:</span>
        <span className="font-semibold text-blue-500">{zone.totalMeters}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm">{t('enterprise.leafletmap.active_meters')}:</span>
        <span className="font-semibold text-green-500">{zone.activeMeters}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm">{t('enterprise.leafletmap.critical_alerts')}:</span>
        <span className="font-semibold text-red-500">{zone.criticalAlerts}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm">{t('enterprise.leafletmap.total_alerts')}:</span>
        <span className="font-semibold text-orange-500">{zone.totalAlerts}</span>
      </div>
    </div>
    
    <div className={`mt-3 p-2 rounded text-center text-xs font-medium ${
      zone.criticalAlerts > 0 
        ? 'bg-red-100 text-red-800 border border-red-200' 
        : 'bg-green-100 text-green-800 border border-green-200'
    }`}>
      {zone.criticalAlerts > 0 ? `⚠️ ${t('enterprise.leafletmap.require_attention')}` : `✅ ${t('enterprise.leafletmap.all_systems_normal')}`}
    </div>
  </div>
);

export default function LeafletMap({ theme = 'light' }) {
  const {t} = useTranslation();
  // Generate random zone data
  const generateZoneData = (name, position) => {
    const totalMeters = Math.floor(Math.random() * 50) + 10;
    const activeMeters = Math.floor(totalMeters * (0.7 + Math.random() * 0.3));
    const criticalAlerts = Math.floor(Math.random() * 5);
    const totalAlerts = criticalAlerts + Math.floor(Math.random() * 8);
    
    const alertLevel = criticalAlerts > 2 ? 'critical' : 
                      criticalAlerts > 0 ? 'warning' : 
                      totalAlerts > 5 ? 'info' : 'normal';

    return {
      id: Math.random(),
      position,
      name,
      totalMeters,
      activeMeters,
      criticalAlerts,
      totalAlerts,
      alertLevel
    };
  };

  const [zones, setZones] = useState([
    generateZoneData('Mangalore Zone', [12.8716, 74.8446]),
    generateZoneData('Bangalore Central', [12.9716, 77.5946]),
    generateZoneData('Electronic City', [12.9592, 77.6974]),
    generateZoneData('Whitefield', [12.9698, 77.7499]),
    generateZoneData('Yelahanka', [13.0358, 77.5970]),
    generateZoneData('Jayanagar', [12.9279, 77.6271]),
    generateZoneData('Koramangala', [12.9352, 77.6245]),
    generateZoneData('Indiranagar', [12.9784, 77.6408])
  ]);

  // Fix: Extract theme mode from theme object or use string directly
  const isDarkTheme = typeof theme === 'object' 
    ? theme.mode === 'dark' || theme.background?.page?.includes('dark') 
    : theme === 'dark';

  const mapRef = useRef(null);

  const handleMapClick = (latlng) => {
    const newZone = generateZoneData(`Zone ${zones.length + 1}`, [latlng.lat, latlng.lng]);
    setZones([...zones, newZone]);
  };

  const removeZone = (id) => {
    setZones(zones.filter(zone => zone.id !== id));
  };

  // Bangalore bounds
  const bangaloreBounds = [
    [12.745, 77.346],
    [13.245, 77.846]
  ];

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, []);

  // Tile layers
  const lightThemeTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const darkThemeTiles = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

  return (
    <div className={`w-full h-full rounded-xl overflow-hidden border-2 ${
      isDarkTheme ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
    }`}>

      {/* Map Container - Fixed height issue */}
      <div className="h-full min-h-[400px]">
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
          className="z-0 rounded-lg"
          ref={mapRef}
          maxBounds={bangaloreBounds}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={isDarkTheme ? darkThemeTiles : lightThemeTiles}
          />

          <MapClickHandler onMapClick={handleMapClick} />

          {zones.map((zone) => (
            <Marker 
              key={zone.id} 
              position={zone.position}
              icon={createCustomIcon(zone.alertLevel)}
            >
              <Popup>
                <ZoneCard zone={zone} t={t} theme={isDarkTheme ? 'dark' : 'light'} />
                <div className="mt-3 text-center">
                  <button
                    onClick={() => removeZone(zone.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                   {t('enterprise.leafletmap.remove_zone')}
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}