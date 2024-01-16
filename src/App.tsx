import { ChipComponent } from "./components/ChipComponent";

function App() {
  const items = [
    "Sayantan Bose",
    "Nick Giannopoulos",
    "Debjani Dey",
    "Ritesh Bose",
    "Debasree Bose",
  ];

  return (
    <div className="App p-4">
      <ChipComponent items={items} />
    </div>
  );
}

export default App;
