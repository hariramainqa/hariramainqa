import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TableRow, TableHead, TableContainer, TableCell, Table, TableBody, } from "@material-ui/core";
import { CustomTableRow } from './tableRow';
import { CustomTablePagination } from "./tablePagination";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    fontFamily: "poppin",
    fontSize: "14px",
    color: "#646464",
    padding: 10,
  },
  tableBody: {
    fontFamily: "poppinsemibold",
    fontSize: "12px",
    padding: 10,
  },
});

export default function CommonTable(props) {
  const classes = useStyles();
  const {
    incrementCount = 0,
    showPagination = false,
    rowsPerPageOptions = [
      { label: "10 Rows", value: 10 },
      { label: "20 Rows", value: 20 },
      { label: "30 Rows", value: 30 },
    ],
    Header = [],
    dataList = [],
    tableData = [],
    handleCheckBox = () => null,
    handleTextfield = () => null,
    handleEdit = () => null,
    handleOverRide = () => null,
    rightAlign = [],
    handleDelete = () => null,
    handleDraft = () => null,
    handleView = () => null,
    condition = () => true,
    collapseCondition = () => true,
    style = {},
    handleHyperLink = () => null,
    handleSelect = () => null,
    parent_id,
    enableStart = [],
    handlepageChange = () => null,
    TableCount = 10,
  } = props;

  const [state, setState] = React.useState({
    open: null
  });
  

  const setOpen = (data, index) => {
    if (state?.open === index) {
      onChangeState('open', null)
    }
    else {
      onChangeState('open', index)
      if (props.collapseToggle) {
        props.collapseToggle(data, index)
      }
    }
  }

  const onChangeState = (key, value) => {
    setState({
      ...state, [key]: value
    })
  }

  
 
  return (
    <>
      <TableContainer
        id={`${parent_id}_table_parent_container`}
        component={Paper}
        style={{
          border: "1px solid #e4e4e4",
          boxShadow: "none",
          minHeight: 400,
          ...style,
        }}
      >
        <Table
          id={`${parent_id}_table_parent_Table`}
          stickyHeader
          //className={classes.table}
          aria-label="simple table"
        >
          <TableHead
            id={`${parent_id}_table_head`}
            style={{ background: "#F9F9F9" }}
          >
            <TableRow>
              {Header.map((val, i) => {
                return (
                  <TableCell
                    id={`${parent_id}_${i}_table_TableCell`}
                    style={{
                      paddingLeft: i === 0 ? "25px" : "",
                      paddingRight: i === Header.length - 1 ? "25px" : "",
                    }}
                    className={classes.tableHeader}
                    align={rightAlign.indexOf(val) > -1 ? "right" : "left"}
                  >
                    {val}
                    {enableStart.indexOf(val) > -1 ? (
                      <span
                        id={`${parent_id}_${i}_table_star-TableCell`}
                        style={{ marginLeft: "5px", color: "red" }}
                      >
                        *
                      </span>
                    ) : (
                      ""
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody id={`${parent_id}_table_dataList_tablebody`}>
            {Array.isArray(dataList) &&
              dataList.map((row, index) => {
                return (
                  <>
                    <CustomTableRow
                      //parent_id={"CustomTableRow" + index}
                      tableData={tableData}
                      condition={condition}
                      Header={Header}
                      index={index}
                      state={state}
                      row={row}
                      parent_id={parent_id}
                      handleCheckBox={handleCheckBox}
                      handleEdit={handleEdit}
                      handleOverRide={handleOverRide}
                      handleDelete={handleDelete}
                      handleDraft={handleDraft}
                      handleView={handleView}	
                      handleTextfield={handleTextfield}
                      handleHyperLink={handleHyperLink}
                      handleSelect={handleSelect}
                      setOpen={setOpen}
                      incrementCount={incrementCount}
                    />
                    {index === state.open && row?.children?.length > 0 && (
                      <>
                        {Array.isArray(row?.children) &&
                          row?.children?.map((row, i) => {
                            return (
                              <CustomTableRow
                                tableData={tableData}
                                condition={(row, type) =>
                                  collapseCondition(row, type, i, index)
                                }
                                Header={Header}
                                index={i}
                                state={state}
                                row={row}
                                parent_id={parent_id}
                                handleCheckBox={(e, row, i) =>
                                  handleCheckBox(e, row, i, index)
                                }
                                handleEdit={(e, row, i) =>
                                  handleEdit(e, row, i, index)
                                }
                                handleView={(e, row, i) =>
                                  handleView(e, row, i, index)
                                }
                                handleOverRide={(e, row, i) =>
                                  handleOverRide(e, row, i, index)
                                }
                                handleDelete={(e, row, i) =>
                                  handleDelete(e, row, i, index)
                                }
                                handleDraft={(e, row, i) =>
                                  handleDraft(e, row, i, index)
                                }
                                handleTextfield={(e, row, name, i) =>
                                  handleTextfield(
                                    e,
                                    row,
                                    name,
                                    i,
                                    index
                                  )
                                }
                                handleHyperLink={(e, row, i) =>
                                  handleHyperLink(e, row, i, index)
                                }
                                handleSelect={(data, row, name, i) =>
                                  handleSelect(
                                    data,
                                    row,
                                    name,
                                    i,
                                    index
                                  )
                                }
                                setOpen={setOpen}
                              />
                            );
                          })}
                      </>
                    )}
                  </>
                );
              })}
          </TableBody>
        </Table>
        {dataList.length === 0 && (
          <div
            id={`${parent_id}_table_nodataFound_div`}
            style={{ textAlign: "center", padding: "20px", color: "#646464" }}
          >
            {" "}
            No Data Found!
          </div>
        )}
      </TableContainer>
      {showPagination &&
        dataList?.length > 0 &&(
          <CustomTablePagination
            count={TableCount}
            handlepageChange={handlepageChange}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        )}
    </>
  );
}
