import Select from "react-select";

import customStyles from '../../utils/SelectCustomStyle'

export default function Table(props) {
  const data = props.data;
  const options = [
    {label:"ms",value:"ms"},
    {label:"s",value:"s"},
    {label:"m",value:"m"},
    {label:"h",value:"h"},

  ]
  const rows = FilterData();

  function FilterData(){
    const rowsFiltred = [];
    data.forEach((element)=>{
      if(element.label.toLowerCase().includes(props.filter.toLowerCase())||element.viewMeasure.toLowerCase().includes(props.filter.toLowerCase()))
        rowsFiltred.push(element)
    })
    return rowsFiltred
  }
  return (
    <div className={"d-flex align-items-start  bd-highlight  flex-wrap" + props.classTable ?? ""} style={{"maxWidth":"720px"}}>
        {rows.map((row, index) => {
          return (
            <div key={row.index} className="align-middle  d-flex flex-row mt-1 mx-1">
              <div className={props.classLabel ?? ""} style={{minWidth:"180px"}}>{row.label}</div>
              {row.measureType===1?
                <div style={{minWidth:"90px"}}>
                  <Select
                    styles={customStyles}
                    className="basic-single me-2 text-Dark"
                    classNamePrefix="select"
                    options={options}
                    defaultValue={{ 
                      value: row.viewMeasure,
                      label: row.viewMeasure,
                    }}
                    onChange={props.handleChangeMeasure(row.index)}
                />
                </div>
                
              :
                <div className={props.classLabel ?? ""} style={{minWidth:"90px"}}>{row.viewMeasure}</div>
              }

              <div >
                <input
                  type="number"
                  id={row.index}
                  className={props.classInput ?? ""}
                  value={row.value}
                  onChange={props.handleOptionOnChange}
                ></input>
              </div>
            </div>
          )
        }
          
        )}
    </div>
  );
  // return (
  //   <table className={"table " + props.classTable ?? ""}>
  //     <tbody>
  //       {rows.map((row, index) => {
  //         return (
  //           <tr key={row.index} className="align-middle">
  //             <td className={props.classLabel ?? ""}>{row.label}</td>
  //             {row.measureType===1?
  //               <td style={{minWidth:"90px"}}>
  //                 <Select
  //                   styles={customStyles}
  //                   className="basic-single me-2 text-Dark"
  //                   classNamePrefix="select"
  //                   options={options}
  //                   defaultValue={{ 
  //                     value: row.viewMeasure,
  //                     label: row.viewMeasure,
  //                   }}
  //                   onChange={props.handleChangeMeasure(row.index)}
  //               />
  //               </td>
                
  //             :
  //               <td className={props.classLabel ?? ""}>{row.viewMeasure}</td>
  //             }

  //             <td >
  //               <input
  //                 type="number"
  //                 id={row.index}
  //                 className={props.classInput ?? ""}
  //                 value={row.value}
  //                 onChange={props.handleOptionOnChange}
  //               ></input>
  //             </td>
  //           </tr>
  //         )
  //       }
          
  //       )}
  //     </tbody>
  //   </table>
  // );
}
