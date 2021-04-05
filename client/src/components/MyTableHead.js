import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function MyTableHead({
  classes,
  order,
  orderBy,
  onRequestSort,
  headCells,
  sortAllowed = true,
}) {
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
            {sortAllowed ? (
              <TableSortLabel
                active={orderBy === index}
                direction={orderBy === index ? order : "asc"}
                onClick={createSortHandler(index)}
              >
                {orderBy === index ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
                {cellTitle}
              </TableSortLabel>
            ) : (
              cellTitle
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default MyTableHead;
