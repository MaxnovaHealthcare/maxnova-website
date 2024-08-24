"use client";

import React, {
  useRef,
  createContext,
  useState,
  ReactNode,
  useContext,
} from "react";

interface CompanyData {
  company_name?: string;
  category_name?: string;
  name?: string;
}

interface ContactContextState {
  open: boolean;
  toggleContact: () => void;
  data?: CompanyData;
  setCompanyData: (dataCompany: CompanyData) => void;
}

const ContactContext = createContext<ContactContextState | undefined>(
  undefined,
);

const ContactContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<CompanyData>({});
  const formRef = useRef<HTMLFormElement>(null);

  const toggleContact = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setOpen((prev) => !prev);
  };

  const setCompanyData = (dataCompany: CompanyData) => {
    setData((prev) => ({
      ...prev,
      ...dataCompany,
    }));
    setOpen(true);
  };

  return (
    <ContactContext.Provider
      value={{ open, data, toggleContact, setCompanyData }}
    >
      {children}
    </ContactContext.Provider>
  );
};

const useContactContext = (): ContactContextState => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error(
      "useContactContext must be used within a ContactContextProvider",
    );
  }
  return context;
};

export { ContactContextProvider, useContactContext };
