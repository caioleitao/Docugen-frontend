
import { useState, useEffect } from 'react';

export interface Identity {
  id: string;
  name: string;
  institution: string;
  role: string;
  contact: string;
  logoUrl?: string;
  signature?: string;
  createdAt: Date;
}

export const useIdentity = () => {
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [selectedIdentity, setSelectedIdentity] = useState<Identity | null>(null);

  // Carregar identidades do localStorage na inicialização
  useEffect(() => {
    const savedIdentities = localStorage.getItem('docugen-identities');
    if (savedIdentities) {
      const parsed = JSON.parse(savedIdentities);
      setIdentities(parsed.map((id: any) => ({
        ...id,
        createdAt: new Date(id.createdAt)
      })));
    }

    const savedSelectedIdentity = localStorage.getItem('docugen-selected-identity');
    if (savedSelectedIdentity) {
      const parsed = JSON.parse(savedSelectedIdentity);
      setSelectedIdentity({
        ...parsed,
        createdAt: new Date(parsed.createdAt)
      });
    }
  }, []);

  // Salvar identidades no localStorage sempre que houver mudanças
  useEffect(() => {
    if (identities.length > 0) {
      localStorage.setItem('docugen-identities', JSON.stringify(identities));
    }
  }, [identities]);

  // Salvar identidade selecionada no localStorage
  useEffect(() => {
    if (selectedIdentity) {
      localStorage.setItem('docugen-selected-identity', JSON.stringify(selectedIdentity));
    }
  }, [selectedIdentity]);

  const saveIdentity = (identity: Omit<Identity, 'id' | 'createdAt'>) => {
    const newIdentity: Identity = {
      ...identity,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setIdentities(prev => [...prev, newIdentity]);
    return newIdentity;
  };

  const deleteIdentity = (id: string) => {
    setIdentities(prev => prev.filter(identity => identity.id !== id));
    if (selectedIdentity?.id === id) {
      setSelectedIdentity(null);
      localStorage.removeItem('docugen-selected-identity');
    }
  };

  const selectIdentity = (identity: Identity) => {
    setSelectedIdentity(identity);
  };

  return {
    identities,
    selectedIdentity,
    saveIdentity,
    deleteIdentity,
    selectIdentity
  };
};
