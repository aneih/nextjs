'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [precios, setPrecios] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('precios').select()
      setPrecios(data)
    }
    getData()
  }, [])

  return (
    <div>
      {precios &&
        precios.map((precio) => (
          <div key={precio.id}> {/* Asegúrate de que tu tabla 'precios' tenga una columna 'id' */}
            <div>Servicio: {precio.Servicio}</div>
            <div>Precio: {precio.precios}</div>
            <hr /> {/* Opcional: para separar cada servicio */}
          </div>
        ))}
      {!precios && <div>Cargando precios...</div>} {/* Mensaje mientras se cargan los datos */}
      {precios && precios.length === 0 && <div>No hay precios disponibles.</div>} {/* Mensaje si no hay datos */}
    </div>
  );
}