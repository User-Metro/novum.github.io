import * as React                 from "react";
import Styles                     from "../../../pages/registroIngreso/ingresos.module.scss";
import Style                      from '../../../pages/registroEgreso/egreso.module.scss';
import fn                         from "../../../utility";
import TableCell                  from "@mui/material/TableCell";
import TableRow                   from "@mui/material/TableRow";
import Chip                       from "@mui/material/Chip";
import MoneyOffIcon               from "@mui/icons-material/MoneyOff";
import PriceCheckIcon             from "@mui/icons-material/PriceCheck";
import PaymentOutlinedIcon        from "@mui/icons-material/PaymentOutlined";
import RequestQuoteOutlinedIcon   from "@mui/icons-material/RequestQuoteOutlined";
import DeleteIcon                 from "@mui/icons-material/Delete";
import { message, Popconfirm }    from "antd";
import { ModalBank }              from '../../organims/modalRegister';

const cancel = () => {
  message.error("Click on No");
};

const formatNumber = (number: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

export const RowsCustom = ({
  pullData,
  page,
  rowsPerPage,
  setInitialValues,
  status,
}: {
  pullData:         any;
  page:             any;
  rowsPerPage:      any;
  setInitialValues: Function;
  status:           boolean;
}) => {

  const cambiarStatus = (id: number) => {
    alert(id);
  };

  const eliminarIngreso = (id: string) => {
    const scriptURL           = localStorage.getItem("site") + "/eliminarIngresoFuturo"; // deberia es
    const ingresos_futuros_id = id;
    const dataU               = { ingresos_futuros_id };

    fetch(scriptURL, {
      method: "POST",
      body:   JSON.stringify(dataU),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(function (info) {
        fn.agregarClase("tr[idTr='" + id + "']", "u-ocultar");
        //fn.ejecutarClick("#btnBuscar");
      })
      .catch((error) => {
        alert(error.message);
        console.error("Error!", error.message);
      });
  };

  const eliminarEgreso = (id: string) => {
    const scriptURL = localStorage.getItem('site')+"/eliminarEgresoFuturo"; // deberia es
    const egresos_futuros_id = id;
    const dataU = {egresos_futuros_id};

    fetch(scriptURL, {
       method: 'POST',
       body: JSON.stringify(dataU),
       headers:{
         'Content-Type': 'application/json'
       }
     })
    .then((resp) => resp.json())
    .then(function(info) {
      fn.agregarClase("tr[idTr='"+id+"']", "u-ocultar");
      //fn.ejecutarClick("#btnBuscar");
     })
     .catch(error => {
       alert(error.message);
       console.error('Error!', error.message);
     });
  }

  return (
    <>
      {pullData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(
          (data: {
            name:
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.Key
              | null
              | undefined;
            id: any;
            date_created:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            payment_method: string;
            category:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            concept:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            amount: number;
            date_to_pay:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            state: string;
            date_cashed:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            statusCobro: boolean;
          }) => (
            <TableRow
              key={data.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              //idTr={data.id}
            >
              <TableCell scope="row"> {data.date_created}  </TableCell>
              <TableCell align="left">
                {data.payment_method === "Efectivo" ? (
                  <div className={Styles.typeAmount1}>
                    <RequestQuoteOutlinedIcon />
                    <span>Efectivo</span>
                  </div>
                ) : (
                  <div className={Styles.typeAmount2}>
                    <PaymentOutlinedIcon />
                    <span>Banco</span>
                  </div>
                )}
              </TableCell>
              <TableCell align="left">  {data.category}             </TableCell>
              <TableCell align="left">  {data.name}                 </TableCell>
              <TableCell align="left">  {data.concept}              </TableCell>
              <TableCell align="left">  ${formatNumber(data.amount)}</TableCell>
              <TableCell align="left">  {data.date_to_pay}          </TableCell>
              {
                status
                ? (
                  <TableCell align="left">
                    {data.state == "Cobrado" ? (
                      <Chip
                        icon        = {<span className="icon-icoCobrar"></span>}
                        size        = "small"
                        label       = "Cobrado"
                        className   = {Styles.chipTable}
                      />
                    ) : (
                      <Chip
                        icon      = {<span className="icon-icoCobrarDismiss"></span>}
                        label     = "No cobrado"
                        size      = "small"
                        className = {Styles.chipTableNo}
                        onClick   = {() => {
                          //showModalC(true);
                        }}
                      />
                    )}
                  </TableCell>
                )
                : (
                  <TableCell align="left" className="IcoEstados">
                    {data.state == "Pagado" ? (
                      <Chip
                        icon={<span className="icon-icoCobrar"></span>}
                        size="small"
                        label="Pagado"
                        className={Style.chipTable}
                        //onClick={()=>{showModalC(data.id,2)}}
                      />
                    ) : (
                      <Chip
                        icon={<span className="icon-icoCobrarDismiss"></span>}
                        label="No pagado"
                        size="small"
                        className={Style.chipTableNo}
                        //onClick={()=>{showModalC(data.id,1)}}
                      />
                    )}
                  </TableCell>
                )
              }
              <TableCell align="left">
                {
                  data.date_cashed !== "Pendiente"
                  ? data.statusCobro == true
                    ? <p className={Styles.txtCobrado}  >{data.date_cashed}</p>
                    : <p className={Styles.txtNoCobrado}>{data.date_cashed}</p>
                  : <p>{data.date_cashed}</p>
                }
              </TableCell>
              <TableCell className="Iconos-Tabla" align="right">
                {
                  status
                  ? (
                    <div className={Styles.btnSection}>
                      <ModalBank
                        namePerson          = {true}
                        txtCantidad         = {false}
                        inputsIngresoEgreso = {true}
                        txtConcept          = {true}
                        fechaPago           = {true}
                        text                = {''}
                        cargarDatos         = {() => {}}
                        edit                = {true}
                        arrayData           = {pullData}
                        rowId               = {data.id}
                        saveDataEgreso      = {false}
                      />
                      <Popconfirm
                        title       = "¿Desea eliminar este registro?"
                        description = ""
                        onConfirm   = {() => {
                          eliminarIngreso(data.id);
                        }}
                        onCancel    = {cancel}
                        okText      = "Si"
                        cancelText  = "No"
                      >
                        <DeleteIcon
                          className = "icoBorrar u-efecto slideRight"
                          onClick   = {() => {}}
                        />
                      </Popconfirm>
                    </div>
                  )
                  : (
                    <div className={Styles.btnSection}>
                      <ModalBank
                        namePerson          = {true}
                        txtCantidad         = {false}
                        inputsIngresoEgreso = {true}
                        txtConcept          = {true}
                        fechaPago           = {true}
                        text                = {''}
                        cargarDatos         = {() => {}}
                        edit                = {true}
                        arrayData           = {pullData}
                        rowId               = {data.id}
                        saveDataEgreso      = {true}
                      />
                      <Popconfirm
                        title       = "¿Desea eliminar este registro?"
                        description = ""
                        onConfirm   = {() => {
                          eliminarEgreso(data.id);
                        }}
                        onCancel    = {cancel}
                        okText      = "Si"
                        cancelText  = "No"
                      >
                        <DeleteIcon
                          className = "icoBorrar u-efecto slideRight"
                          onClick   = {() => {}}
                        />
                      </Popconfirm>
                    </div>
                  )
                }
              </TableCell>
            </TableRow>
          )
        )}
    </>
  );
};