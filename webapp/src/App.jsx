import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ResultList from "./components/ResultList";
import Searcher from "./components/Searcher";
import { useExternalApi as useClientResponse } from "./hooks/clientResponse";
function App() {
  // hooks functions
  const { getClientes, upsertClient } = useClientResponse();

  // useState
  const [clientes, setClientes] = useState([]);

  // useEffect
  useEffect(() => {
    const fetchClients = async () => {
      await getClientes(setClientes);
    };
    fetchClients();
  }, [getClientes]);

  const handlerCreateClient = async (client) => {
    await upsertClient(client);
    await getClientes(setClientes);
  };

  return (
    <div className="App">
      <Header />
      <Searcher handlerCreateClient={handlerCreateClient} />
      <ResultList clients={clientes} />
    </div>
  );
}

export default App;
