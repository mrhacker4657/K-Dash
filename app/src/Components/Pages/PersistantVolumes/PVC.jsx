import { useEffect, useState } from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'
import "../main.css"

const PVC = () => {
  const [pvc, setPvc] = useState([]);

  const namespace = "kubernetes-dashboard"

  useEffect(() => {
    const fnc = () => {
      const url = "/api/v1/persistentvolumeclaims/"
      axios.get(url).then((response) => {
        setPvc(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }
    const fnc1 = () => {
      const url = `/api/v1/namespaces/${namespace}/persistentvolumeclaims/`
      axios.get(url).then((response) => {
        setPvc(response.data.items);
        console.log(response.data.items);
      }).catch((err) => {
        console.log(err);
      })
    }

    (
      namespace ? fnc1() : fnc()
    )
  }, [])

  const columns = [
    {
      name: "Name",
      selector: (row) =>
        <div>
          {row.metadata.name}
        </div>
    },
    {
      name: "Namespace",
      selector: (row) => row.metadata.namespace,
    },
  ]
  return (
    <div className='component'>
      <div>
        <h1> All  PersistantVolumeClaims ( {pvc.length} PersistantVolumeClaims ) </h1>
        <DataTable columns={columns} data={pvc} title={"PersistantVolumeClaims"} fixedHeader selectableRows highlightOnHover />
      </div>
    </div>
  )
}

export default PVC