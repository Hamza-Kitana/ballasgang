import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { buildDefaultSiteData } from "@/data/defaults";
import type { SiteData } from "@/data/site-types";
import { getPublicSiteData } from "@/server/admin.fns";

type SiteDataContextValue = {
  data: SiteData;
  loading: boolean;
  refresh: () => Promise<void>;
};

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(() => buildDefaultSiteData());
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const next = await getPublicSiteData();
      setData(next);
    } catch (error) {
      console.error("[SiteDataProvider] failed to load remote data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <SiteDataContext.Provider value={{ data, loading, refresh }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
}
