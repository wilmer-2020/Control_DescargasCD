"use client"
import { PlacasStore } from '@/app/hook/store'
import React from 'react'
import TablaPlacas from '../../../../components/TablePlacas'

const page = () => {
    const { placas } = PlacasStore()
    console.log(placas);
  return (
    <>
        <TablaPlacas/>
    </>
  )
}

export default page