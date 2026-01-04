// usermodules/Station.jsx
import { IdeasProvider } from "../hackideas/IdeasContext";
import AddIdea from "../hackideas/AddIdea";
import IdeasList from "../hackideas/IdeasList";

export default function Station() {
  return (
    <IdeasProvider>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Hack Ideas Station</h1>
        <AddIdea />
        <IdeasList />
      </div>
    </IdeasProvider>
  );
}
