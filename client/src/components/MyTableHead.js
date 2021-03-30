import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function MyTableHead({ classes, order, orderBy, onRequestSort, headCells }) {
  const createSortHandler = (index) => (event) => {
    onRequestSort(event, index);
  };
  const headCellsLen = headCells.length;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((cellTitle, index) => (
          <TableCell
            key={cellTitle + index}
            align={index + 1 === headCellsLen ? "right" : "left"}
            sortDirection={orderBy === index ? order : false}
          >
            <TableSortLabel
              active={orderBy === index}
              direction={orderBy === index ? order : "asc"}
              onClick={createSortHandler(index)}
            >
              {cellTitle}
              {orderBy === index ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default MyTableHead;