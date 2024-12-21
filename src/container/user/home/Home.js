import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UserLayout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Index from "../../Index";
import { updateTaskStatus } from "../../../redux/user/userSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Home() {
  const { taskList } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  console.log(taskList)
  return (
    <UserLayout>
      <h1>My Tasks</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr. No</StyledTableCell>
              <StyledTableCell >Task</StyledTableCell>
              <StyledTableCell >Duration</StyledTableCell>
              <StyledTableCell >Priority</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList?.length ? (
              taskList.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell >{row.task}</StyledTableCell>
                  <StyledTableCell >
                    {row.duration}
                  </StyledTableCell>
                  <StyledTableCell >
                    {row.priority}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <ButtonGroup
                      variant="outlined"
                      aria-label="Basic button group"
                    >
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={row.status}
                          onChange={(e) => {dispatch(updateTaskStatus({id: row.id, status: e.target.value}))}}
                        >
                          <MenuItem value={"Open"}>Open</MenuItem>
                          <MenuItem value={"On hold"}>On hold</MenuItem>
                          <MenuItem value={"In progress"}>In progress</MenuItem>
                          <MenuItem value={"Complete"}>Complete</MenuItem>
                        </Select>
                      </FormControl>
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={6} sx={{textAlign: "center"}}>No tasks available.</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </UserLayout>
  );
}
