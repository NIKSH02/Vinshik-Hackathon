import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ChevronDown, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { branchesData } from '../data/branches';

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedBranch, setSelectedBranch] = useState(branchesData[0]);
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  useEffect(() => {
    if (!mapboxToken) {
      console.log('Mapbox token not found');
      return;
    }

    if (map.current) return; // Initialize map only once

    // Set access token
    mapboxgl.accessToken = mapboxToken;

    try {
      // Initialize map with simple configuration
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [selectedBranch.lng, selectedBranch.lat],
        zoom: 11.5
      });

      // Add markers for all branches
      branchesData.forEach((branch) => {
        const marker = new mapboxgl.Marker({ color: "#14b8a6" })
          .setLngLat([branch.lng, branch.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25, closeOnMove: true })
              .setHTML(`
                <div style="padding: 8px;">
                  <h5 style="margin: 0 0 8px 0; font-weight: 600; color: #111827;">${branch.name}</h5>
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280;">${branch.address}</p>
                  <p style="margin: 0; font-size: 12px; color: #9ca3af;">${branch.hours}</p>
                </div>
              `)
          )
          .addTo(map.current);
      });

      map.current.on('load', () => {
        console.log('Map loaded successfully');
        setMapLoaded(true);
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
      });

    } catch (error) {
      console.error('Failed to initialize map:', error);
    }

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, selectedBranch.lng, selectedBranch.lat]);

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setShowBranchDropdown(false);
    
    if (map.current) {
      map.current.flyTo({
        center: [branch.lng, branch.lat],
        zoom: 14,
        duration: 1000
      });
    }
  };

  if (!mapboxToken) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Map</h1>
          <p className="text-gray-600 mt-1">Explore VinShik office locations</p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            <div>
              <h3 className="font-semibold text-yellow-800">Map Disabled</h3>
              <p className="text-yellow-700 mt-1">
                Missing Mapbox token. Please add VITE_MAPBOX_TOKEN to your .env file.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Map</h1>
          <p className="text-gray-600 mt-1">Explore VinShik office locations</p>
        </div>
        
        {/* Branch Selector */}
        <div className="relative">
          <button
            onClick={() => setShowBranchDropdown(!showBranchDropdown)}
            className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <MapPin className="h-4 w-4 text-teal-600" />
            <span className="font-medium text-gray-900">{selectedBranch.name}</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {showBranchDropdown && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide px-3 py-2">
                  VinShik Office / Branch
                </div>
                {branchesData.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => handleBranchSelect(branch)}
                    className={`w-full text-left px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors ${
                      selectedBranch.id === branch.id ? 'bg-teal-50 border border-teal-200' : ''
                    }`}
                  >
                    <div className="font-medium text-gray-900">{branch.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{branch.address}</div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {branch.hours}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1">
        {!mapLoaded && mapboxToken && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
        <div ref={mapContainer} className="w-full h-[600px] relative" />
      </div>

      {/* Branch Info */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
            <MapPin className="h-6 w-6 text-teal-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{selectedBranch.name}</h3>
            <p className="text-gray-600 mb-2">{selectedBranch.address}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {selectedBranch.hours}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
