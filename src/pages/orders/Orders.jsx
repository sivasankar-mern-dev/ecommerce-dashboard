import { TableCell, TableRow, Typography, TableHead, TableBody, TableContainer, Paper, Table, Grid, Box, Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import "./orders.css";
import { getAllOrders } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Orders() {

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    getAllOrders(dispatch)
  }, [dispatch])

  console.log(orders)

  return (
    <div className="orders">
      <Typography variant="h4">All Orders</Typography>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Id</TableCell>
                <TableCell>Products</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell component="th" scope="row">
                  {order.userId}
                </TableCell>
                <TableCell>
                  {order.products.map((product) => (
                    <Box>
                      Product Id: <span>{product.productId}</span><br/>
                      Quantity: <span>{product.quantity}</span>
                    </Box>
                  ))}
                </TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" component={Link} to={'/orders/' + order._id}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}

export default Orders
