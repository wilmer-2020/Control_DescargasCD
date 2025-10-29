"use client"
import {useState,useEffect} from 'react'
import TablaPlacasDB from '../../../../components/TablaPlacasDB'

const Page = () => {

    const [data, setdata] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/placas");
          if (!response.ok) throw new Error("Error al obtener placas");
          const data = await response.json();
          setdata(data || []);
        } catch (error) {
          console.error("Error al cargar placas desde la base de datos:", error);
        }
        }
        fetchData();
    }, [])
    

  return (
    <>
        <TablaPlacasDB placas={data}/>
    </>
  )
}

export default Page