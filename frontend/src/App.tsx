import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <Map />
      </div>
    </QueryClientProvider>
  );
}

export default App;
