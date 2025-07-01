import { useState, useEffect } from "react";
import { UserAccount } from "@/types";
import { mockUserAccount } from "@/lib/mockData";

export function useUserAccount() {
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAccount(mockUserAccount);
      setLoading(false);
    }, 200);
  }, []);

  return { account, loading };
} 