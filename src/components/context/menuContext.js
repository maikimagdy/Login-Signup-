import { createContext, useState } from "react";

export const MenuContext = createContext(""); // Rename the context to MenuContext

export default function MenuFun({ children }) {
  const [menu, setmenu] = useState(true);

  return (
    <MenuContext.Provider value={{ menu, setmenu }}>
      {children}
    </MenuContext.Provider>
  );
}
