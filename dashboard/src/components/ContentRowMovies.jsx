import React, { useEffect, useState } from "react";
import { Metric } from "./Metric";

export const ContentRowMovies = () => {

  const [state, setState] = useState({
    courses : {
      title: "Cursos",
      color: "primary",
      value: 0,
      icon: "fa-film",
    },
    chefs : {
      title: "Chefs",
      color: "success",
      value: 0,
      icon: "fa-award",
    },
    users : {
      title: "Usuarios",
      color: "warning",
      value: 0,
      icon: "fa-user",
    }
  });

  useEffect(() => {
    // el pedido por fetch
   
  }, []);
 
  return (
  <div className="row">
    
    <Metric {...state.courses}/>
    <Metric {...state.chefs}/>
    <Metric {...state.users}/>
    
    
    </div>
  );
};
