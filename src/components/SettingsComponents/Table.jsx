
export default function Table(props){
    const rows = props.data;


    return(
        <table className={"table " +props.classTable??""}>
            <tbody>
                {rows.map((row,index) =>(
                <tr key={index}>
                    <td className={props.classLabel??""}>{row.label}</td>
                    <td className={props.classInput??""}>
                        <input type="number"  id={index} className={props.classInput??""} defaultValue={row.value} onChange={props.handleOptionOnChange}></input>
                    </td>
                </tr>
                    ))}
            </tbody>
        </table>
    )
}