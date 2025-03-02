import { Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Home from "./features/home/Home";
import Circuits from "./features/circuits/Circuits";
import CircuitDetail from "./features/circuits/CircuitDetail";
import Teams from "./features/teams/Teams";
import Pilots from "./features/pilots/Pilots";
import StandardLayout from "./layouts/StandardLayout";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <Routes>
          <Route element={<StandardLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="circuits" element={<Circuits />} />
            <Route path="circuits/:circuitId" element={<CircuitDetail />} />

            <Route path="teams" element={<Teams />} />
            <Route path="pilots" element={<Pilots />} />
          </Route>
        </Routes>
        {/* <button onClick={() => getCircuits()}>TESTAR</button> */}
      </QueryClientProvider>
    </>
  );
}
export default App;
