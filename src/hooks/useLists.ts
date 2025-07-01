import { useState, useEffect } from "react";
import { InfluencerList } from "@/types";
import { mockLists } from "@/lib/mockData";

export function useLists() {
  const [lists, setLists] = useState<InfluencerList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLists(mockLists);
      setLoading(false);
    }, 300);
  }, []);

  return { lists, loading };
}

export function useListDetails(id: string) {
  const [list, setList] = useState<InfluencerList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundList = mockLists.find((l) => l.id === id);
      setList(foundList || null);
      setLoading(false);
    }, 200);
  }, [id]);

  return { list, loading };
} 