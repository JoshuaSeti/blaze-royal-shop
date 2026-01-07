import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DeliveryZone {
  id: string;
  name: string;
  description: string | null;
  base_fee: number;
  polygon: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useDeliveryZones = () => {
  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchZones = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('delivery_zones')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error('Error fetching zones:', error);
        return;
      }

      setZones((data as DeliveryZone[]) || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Calculate delivery fee based on coordinates
  const calculateDeliveryFee = (latitude: number, longitude: number): { zoneId: string | null; fee: number } => {
    // For now, return a default fee based on zones
    // In production, implement proper polygon containment check
    if (zones.length === 0) return { zoneId: null, fee: 500 }; // Default fee
    
    // Simple distance-based zone assignment (placeholder logic)
    // You would implement actual polygon containment check here
    const defaultZone = zones[0];
    return { 
      zoneId: defaultZone?.id || null, 
      fee: Number(defaultZone?.base_fee) || 500 
    };
  };

  // Get zone by coordinates
  const getZoneByCoordinates = (latitude: number, longitude: number): DeliveryZone | null => {
    // Placeholder - implement polygon containment check
    return zones[0] || null;
  };

  useEffect(() => {
    fetchZones();
  }, [fetchZones]);

  return {
    zones,
    loading,
    calculateDeliveryFee,
    getZoneByCoordinates,
    refetch: fetchZones
  };
};