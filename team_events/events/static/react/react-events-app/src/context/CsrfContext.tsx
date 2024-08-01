import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface CSRFContextType {
  csrfToken: string | null;
  setCSRFToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const CSRFContext = createContext<CSRFContextType | null>(null);

interface CSRFProviderProps {
  children: ReactNode;
}

export function CSRFProvider({ children }: CSRFProviderProps) {
  const [csrfToken, setCSRFToken] = useState<string | null>(null);

  useEffect(() => {
    fetchCSRFToken().then((token) => setCSRFToken(token));
  }, []);

  return (
    <CSRFContext.Provider value={{ csrfToken, setCSRFToken }}>
      {children}
    </CSRFContext.Provider>
  );
}

export function useCSRF(): CSRFContextType {
  const context = useContext(CSRFContext);
  if (!context) {
    throw new Error("useCSRF must be used within a CSRFProvider");
  }
  return context;
}

async function fetchCSRFToken(): Promise<string | null> {
  try {
    const response = await fetch("http://localhost:8000/api/get-csrf-token/", {
      credentials: "include",
    });
    if (response.ok) {
      const csrfToken = getCookie("csrftoken");
      if (csrfToken) {
        return csrfToken;
      }
    }
    throw new Error("Failed to fetch CSRF token");
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}
