import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { BASE_URL, MESSAGE_DETAIL } from '../../services/URLs';
import Loading from '../../views/Loading';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const MessageDetail = ({id, type}) => {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(null);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getDetail() {
        fetch(BASE_URL + MESSAGE_DETAIL + "/" + id + "/" + type, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            }
        }).then(response => {
            if(!response.ok) {
            }
            else return response.json();
        }).then(result => {
          console.log(result);
            setData(result);
        });     
    }

  React.useEffect(() => {    
      if(open) {
          getDetail();
      }
    }, [open]);

    let content = null;

    if(!data) {
        content = <Loading />;
    }
    else {
        const dataTable = [];
        Object.entries(data).forEach(entry => {
            const [key, value] = entry;
            dataTable.push(
                <tr key={"data-entry-"+key}>
                    <td>{key}:</td>
                    <td>{value}</td>
                </tr>
            )
        });
        content = (
            <>
                <h2 id="transition-modal-title">{data.type} messages</h2>
                <p id="transition-modal-description"></p>
                <table>
                    {dataTable}
                </table>
            </>
        )
    }

  return (
    <div>
      <button type="button" className="btn" onClick={handleOpen}>
            DETAIL
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {content}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default MessageDetail;
