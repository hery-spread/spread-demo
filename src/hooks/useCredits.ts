import { useState, useEffect } from "react";

interface CreditTransaction {
  id: string;
  type: "unlock" | "purchase" | "refund";
  amount: number;
  description: string;
  date: string;
  influencerId?: string;
}

export function useCredits() {
  const [credits, setCredits] = useState(0);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🏁 useCredits - useEffect démarré');
    // Simuler le chargement des crédits depuis l'API
    setTimeout(() => {
      console.log('💰 Chargement des crédits - 25 crédits attribués');
      // Données mockées - normalement depuis l'API utilisateur
      setCredits(25); // L'utilisateur a 25 crédits disponibles
      setTransactions([
        {
          id: "1",
          type: "purchase",
          amount: 50,
          description: "Achat de crédits - Pack Pro",
          date: "2024-06-15T10:00:00Z",
        },
        {
          id: "2",
          type: "unlock",
          amount: -1,
          description: "Rapport débloqué - Nabilla Vergara",
          date: "2024-06-20T14:30:00Z",
          influencerId: "2",
        },
        {
          id: "3",
          type: "unlock",
          amount: -1,
          description: "Rapport débloqué - Squeezie",
          date: "2024-06-22T09:15:00Z",
          influencerId: "3",
        },
      ]);
      setLoading(false);
      console.log('✅ useCredits - Hook complètement chargé');
    }, 500);
  }, []);

  const spendCredits = async (
    amount: number,
    description: string,
    influencerId?: string
  ): Promise<boolean> => {
    if (credits < amount) {
      throw new Error("Crédits insuffisants");
    }

    // Simuler l'API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTransaction: CreditTransaction = {
          id: Date.now().toString(),
          type: "unlock",
          amount: -amount,
          description,
          date: new Date().toISOString(),
          influencerId,
        };

        setCredits((prev) => prev - amount);
        setTransactions((prev) => [newTransaction, ...prev]);
        resolve(true);
      }, 1000);
    });
  };

  const addCredits = async (
    amount: number,
    description: string
  ): Promise<boolean> => {
    // Simuler l'achat de crédits
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTransaction: CreditTransaction = {
          id: Date.now().toString(),
          type: "purchase",
          amount,
          description,
          date: new Date().toISOString(),
        };

        setCredits((prev) => prev + amount);
        setTransactions((prev) => [newTransaction, ...prev]);
        resolve(true);
      }, 1000);
    });
  };

  return {
    credits,
    transactions,
    loading,
    spendCredits,
    addCredits,
  };
} 