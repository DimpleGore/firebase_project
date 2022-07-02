import axios from "axios";
import { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


function Dashboard() {

    const [user, setUser] = useState([]);
    var sno = 0;

    useEffect(() => {

        let token = localStorage.getItem('token')
        axios.get('http://localhost:5000/getallusers', {
            headers: { Authorization: token },
        }).then(resp => {
            setUser(resp.data.result)
            console.log(user)
        });
    }, []

    );

    const handlesignout = () => {
        localStorage.removeItem('firstLogin')
        localStorage.removeItem('token')
        window.location.href = "/"
    }


    return (
        <div>
            <button type="button" align="right" onClick={handlesignout}>Signout</button>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Contact Number</TableCell>
                            <TableCell align="right">User Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.length > 0 && user.map((row) => (
                            <TableRow key={sno = sno + 1}>
                                <TableCell component="th" scope="row">
                                    {sno + 1}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.contactno}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Dashboard