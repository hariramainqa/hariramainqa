import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TableSwitch } from "./switch";
import {
  TableRow,
  TableCell,
  TextField,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import EditIcon from "./components/assets/edit";
import LinkIcon from "./components/assets/link";
import OverRideIcon from '@material-ui/icons/Gavel';
import { TextFieldWithSelect,  } from "./components/textFieldWithSelect";
import { SelectWithLabel } from "./components/selectWithLabel";

import DeleteIcon from './components/assets/trash';
import DraftIcon from '@material-ui/icons/FileCopyOutlined';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";


const useStyles = makeStyles({
  tableBody: {
    //padding: "12px",
    fontFamily: "poppinsemibold",
    fontSize: "12px",
    padding: 10,
  },
});

export const CustomTableRow = ({
  incrementCount = 0,
  index = null,
  parent_id = "",
  tableData = [],
  condition = () => true,
  Header = [],
  row = {},
  handleCheckBox = () => null,
  handleTextfield = () => null,
  handleEdit = () => null,
  handleView = () => null,
  handleOverRide = () => null,
  handleDelete = () => null,
  handleDraft = () => null,
  handleHyperLink = () => null,
  handleSelect = () => null,
  setOpen = () => null,
  state = {},
  tdStyle = {},
}) => {
  const classes = useStyles();
  return (
    <TableRow
      id={`${parent_id}-${index}-table-dataList-TableRow`}
      key={index + 1}
    >
      {tableData.map((val, i) => {
        return (
          <TableCell
            id={`${parent_id}-${i}-table-dataList-TableCell`}
            style={{
              paddingLeft: i === 0 ? "25px" : "",
              paddingRight: i === Header.length - 1 ? "25px" : "",
              ...tdStyle,
            }}
            align={val.align ? val.align : "left"}
            className={classes.tableBody}
          >
            {val.type.map((type) => {
              if (condition(row, type, val.name)) {
                return getComponentType({
                  index: index + incrementCount,
                  type: type,
                  condition: val.cond,
                  value: val.optionLabel
                    ? row[val.name]?.[val.optionLabel]
                    : row[val.name],
                  error:!!row?.error?.[val.name],
                  placeholder: [val.name],
                  options: val?.options ?? [],
                  icon: val?.icon ?? "",
                  toolTip: val?.toolTip ?? {},
                  state: state,
                  row: row,
                  handleCheckBox: (e) => {
                    handleCheckBox(e, row, index);
                  },
                  handleEdit: (e) => {
                    handleEdit(e, row, index);
                  },
                  handleView: (e) => {
                    handleView(e, row, index);
                  },
                  handleOverRide: (e) => {
                    handleOverRide(e, row, index);
                  },
                  handleDelete: (e) => {
                    handleDelete(e, row, index);
                  },
                  handleDraft: (e) => {
                    handleDraft(e, row, index);
                  },
                  handleTextfield: (e) => {
                    handleTextfield(e, row, val.name, index);
                  },
                  handleHyperLink: (e) => {
                    handleHyperLink(e, row, index);
                  },
                  handleSelect: (data) => {
                    handleSelect(data, row, val.name, index);
                  },
                  setOpen: (data, index) => {
                    setOpen(data, index);
                  },
                });
              } else {
                return false;
              }
            })}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const getComponentType = (data) => {
  switch (data.type) {
    case "TEXT": {
      if (data?.condition && data.row[data.condition.key] === data.condition.value) {
        return <React.Fragment>
          {/* <img
            id={`table-OverRideIcon-img`}
            src={OverRideIcon}
            width="12px"
            style={{ marginRight: "10px", cursor: "pointer" }}
            alt="table-Edit"
          /> */}
          <OverRideIcon height={12} width={12} fill={"red"} />
          <span style={{ paddingLeft: "5px" }}>{data.value}</span>
        </React.Fragment>
      } else {
        return data.value;
      }
    }
    case "INCRIMENT": {
      return data.index + 1;
    }
    case "CHECKBOX": {
      return (
        <TableSwitch
          id={`table-value-TableSwitch`}
          checked={data.value}
          onChange={data.handleCheckBox}
          name="checkbox"
        />
      );
    }
    case "EDIT": {
      return (
        <IconButton onClick={data.handleEdit} alt="table-Edit">
          <EditIcon />
        </IconButton>
      );
    }
    case "OVERRIDE": {
      return (<span onClick={data.handleOverRide}>
        <OverRideIcon height={14} width={14} />
      </span>
      );
    }
    case "DELETE": {
      return (
        <IconButton onClick={data.handleDelete} alt="table-Edit">
          <DeleteIcon />
        </IconButton>
      );
    }
    case "TEXTFIELD": {
      return (
        <TextField
          id={`table-${data?.value}-TextField`}
          value={data?.value}
          placeholder={`Enter ${data?.placeholder}`}
          onChange={data.handleTextfield}
          error={data?.error}
        />
      );
    }
    case "HYPERLINK": {
      return (
        <IconButton onClick={data.handleHyperLink} alt="table-Edit">
          <LinkIcon />
        </IconButton>
      );
    }
    case "TEXTFIELD_SELECT": {
      return (
        <TextFieldWithSelect
          id={`table-${data?.value}-TextFieldWithSelect`}
          options={data?.options}
          label=""
          variant="standard"
          // required={true}
          value={data?.value}
          onChange={(value) => data.handleSelect(value)}
        />
      );
    }
    case "SELECT": {
      return (
        <SelectWithLabel
          id={`table-${data?.value}-SelectWithLabel`}
          options={data?.options}
          label=""
          variant="standard"
          // required={true}
          value={data?.value}
          onChange={(value) => data.handleSelect(value)}
        />
      );
    }
    case "ICON": {
      return (
        <div>
          <Tooltip
            id={`table-${data?.icon ?? ""}-Tooltip`}
            arrow={data?.toolTip?.arrow ?? false}
            title={data?.toolTip?.title ?? ""}
            placement={data?.toolTip?.placement}
          >
            {data?.icon ?? ""}
          </Tooltip>
        </div>
      );
    }
    case "VIEWICON": {
      return (
        <div onClick={data.handleView} style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}>
          <span style={{ color: "#0071F2" }}> View </span>
        </div>
      );
    }
    case "DRAFT": {
      return (
        <Tooltip
          id={`table-DraftIcon-Tooltip`}
          title="Draft"
          placement="top-start"
        >
          <IconButton onClick={data.handleDraft} alt="table-Edit">
            <DraftIcon />
          </IconButton>
        </Tooltip>
      );
    }
    case "COLLAPSE": {
      return (
        <>
          {data?.row?.children ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => data.setOpen(data.row, data.index)}
            >
              {data?.index === data?.state?.open ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          ) : (
            <div style={{ width: 30, display: "inline-block" }} />
          )}
        </>
      );
    }

    case "PROFILE": {
      return (
        <>
          {/* <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {data.row.pht ? <Avatar
              alt={data?.value?.[0]}
              src={data.row.pht ? getImgUrl(data.row.pht) : null}
              // src={`https://picsum.photos/200/300?random=${Math.floor(
              //   Math.random() * 100
              // ).toFixed(2)}`}
              style={{ width: "24px", height: "24px" }}
            /> : <Avatar
              style={{ width: "24px", height: "24px", fontSize: 10 }}
            >{data?.value?.[0]}</Avatar>}
            <span>{data?.value}</span>
          </div> */}
        </>
      );
    }

    default: {
      return data.value;
    }
  }
};
