import { useState, useEffect } from "react";
import { Influencer, InfluencerDetails } from "@/types";
import { mockInfluencers, mockInfluencerDetails } from "@/lib/mockData";

export function useInfluencers() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInfluencers(mockInfluencers);
      setLoading(false);
    }, 500);
  }, []);

  return { influencers, loading };
}

export function useInfluencerDetails(id: string) {
  const [details, setDetails] = useState<InfluencerDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDetails(mockInfluencerDetails[id] || null);
      setLoading(false);
    }, 300);
  }, [id]);

  return { details, loading };
} 