import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  role: 'admin' | 'manager' | 'staff' | 'viewer';
  permissions: string[];
  branding?: {
      primaryColor: string;
      secondaryColor?: string;
  }
}

interface OrganizationStore {
  organizations: Organization[];
  currentOrganization: Organization | null;
  isLoading: boolean;

  setOrganizations: (orgs: Organization[]) => void;
  setCurrentOrganization: (org: Organization) => void;
  switchOrganization: (orgId: string) => Promise<void>;
}

// Mock initial data for development
const MOCK_ORGS: Organization[] = [
    {
        id: 'org-fo',
        name: 'Future Optics',
        slug: 'future-optics',
        role: 'admin',
        permissions: ['all'],
        branding: { primaryColor: '#03a9f4' }
    },
    {
        id: 'org-demo',
        name: 'Demo Corp',
        slug: 'demo-corp',
        role: 'manager',
        permissions: ['read'],
        branding: { primaryColor: '#ff9800' }
    }
];

export const useOrganizationStore = create<OrganizationStore>()(
  persist(
    (set, get) => ({
      organizations: MOCK_ORGS,
      currentOrganization: MOCK_ORGS[0],
      isLoading: false,

      setOrganizations: (orgs) => set({ organizations: orgs }),

      setCurrentOrganization: (org) => set({ currentOrganization: org }),

      switchOrganization: async (orgId) => {
        set({ isLoading: true });
        // Simulate API call
        setTimeout(() => {
             const org = get().organizations.find(o => o.id === orgId);
             if (org) {
                 set({ currentOrganization: org });
                 // In a real app, this would trigger a theme update via a provider
             }
             set({ isLoading: false });
        }, 500);
      },
    }),
    {
      name: 'organization-storage',
    }
  )
);
