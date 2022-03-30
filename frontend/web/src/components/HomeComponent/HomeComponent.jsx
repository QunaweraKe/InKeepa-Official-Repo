import AllItemsComponent from "./AllItemsComponent";
import OffersComponent from "./OffersComponent";
import React  from 'react';
import FloatingAction from "../../layouts/FloatingAction";



export default function HomeComponent() {
  return (
    <> 
        <OffersComponent />
      <AllItemsComponent />
      <FloatingAction />
     
    </>
  );
}
