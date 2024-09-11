// import React, { createContext, useEffect, useState } from "react";

// const GlobalContext = createContext();

// // const SampleContextProvider  = () => {
// //     const [Url, setUrl] = useState("");

// //     const changeUrl = (name) => {
// //         console.log(name,"change nameeeeeeeeeeeeeeeeeeeeeeeeeee");
        
// //         setUrl(name);
// //       };
// //       console.log(Url,"change nameeeeeeeeeeeeeeeeeeeeeeeeeee");
// //       return (
// //         <SampleContext.Provider
// //           value={{         
// //             Url,
// //                 changeUrl,  
// //                 setUrl  
// //                 }}
// //         >
// //           {children}
// //         </SampleContext.Provider>
// //       );

// // };

// const GlobalProvider = ({ children }) => {
//   const [globalVariable, setGlobalVariable] = useState('initial value');

//   return (
//     <GlobalContext.Provider value={{ globalVariable, setGlobalVariable }}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };


// export { GlobalContext, GlobalProvider };

import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState('initial value');
console.log(globalVariable);

  return (
    <GlobalContext.Provider value={{ globalVariable, setGlobalVariable }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;