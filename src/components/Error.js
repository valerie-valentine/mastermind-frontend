import React from "react";

// const Error = () => {
//   return (
//     <div className="flex flex-col justify-center max-w-fit m-auto">
//       <h1 className="text-center mb-10">
//         An unknown error occured. Please try again later.
//       </h1>
//     </div>
//   );
// };

// export default Error;

import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const errorMessage =
    location.state?.message || "An unexpected error occurred.";

  return (
    <div>
      <h1>Error</h1>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;
