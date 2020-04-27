// import React, { useState } from 'react';

// export const SettingsContext = React.createContext()

// export const SettingsProvider = ({children}) => {
//   let initialSettings = {
//   tableSize : 'full',
//   }

//   const [gameOn, setGameOn] = useState(false);
//   const [settings, setSettings] = useState(initialSettings);

//   return (
//     <SettingsContext.Provider value={{
//       gameOn,
//       setGameOn,
//       settings,
//       setSettings,
//     }}>
//       {children}
//     </SettingsContext.Provider>
//   );
// };