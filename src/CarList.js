
import ReactTable from "react-table";
import { ToastContainer, toast } from 'react-toastify';
import { CSVLink } from 'react-csv';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddCar from './AddCar';

import { SERVER_URL } from "./constants";

const CarList = () => {
    const [cars, setCars] = useState([]);
    useEffect(() => {
        fetchCars();
      }, []);
    const token = sessionStorage.getItem("jwt");
    const fetchCars = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        // const token = sessionStorage.getItem("jwt");
        axios
          .get(SERVER_URL + "api/cars", {
            headers: {'Authorization': token}
          })
          .then((res) => setCars(res.data._embedded.cars))
          .catch(err => console.error(err));
        };
        
      const onDelClick = (url) => {
        if (window.confirm('Are you sure to delete?')) {
            // const token = sessionStorage.getItem("jwt");
          axios.delete(url, {
            headers: {'Authorization': token}
          }).then(res => {
            console.log(res);
            toast.success("Car deleted", {
              position: toast.POSITION.BOTTOM_LEFT
            });
            fetchCars();
          }).catch(err => {
            toast.error("Error when deleting", {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err)
          });
        }
      };
      
      const editCar = (car, url) => {
        console.log(url);
        console.log(car);
        axios.put(url, car, {
            headers: {'Authorization': token}
          })
        .then(res => {
          console.log(res);
          toast.success("Car Edited Successfully", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          fetchCars();
        })
        .catch(err => {
          toast.error("Error when editing car", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err)
        });
      };
    
      const columns = [{
        Header: 'Brand',
        accessor: 'brand'
      }, {
        Header: 'Model',
        accessor: 'model',
      }, {
        Header: 'Color',
        accessor: 'color',
      }, {
        Header: 'Year',
        accessor: 'year',
      }, {
        Header: 'Price €',
        accessor: 'price',
      }, {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: '_links.self.href',
        Cell: ({value, row}) => (<AddCar car={row} url={value} lable="Edit" 
          handleSave={editCar} />),
        width: 100
      }, {
        id: 'delbutton',
        sortable: false,
        filterable: false,
        width: 100,
        accessor: '_links.self.href',
        Cell: ({value}) => (<Button color="secondary" onClick={()=>{onDelClick(value)}}>Delete</Button>)
      }];
    const addCar = (car) => {
        axios.post(SERVER_URL + 'api/cars', car, {
            headers: {'Authorization': token}
          })
        .then(res => {
          console.log(res);
          toast.success("Car Added", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          fetchCars();
        })
        .catch(err => {
          toast.error("Error when adding", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err)
        });
      };
    return (
        <>
        <Grid container>
          <Grid item>
            <AddCar handleSave={addCar} lable="New Car"/>
          </Grid>
          <Grid item style={{padding:15}}>
            <CSVLink data={cars} separator=";">Export CSV</CSVLink>
          </Grid>
        </Grid>

        <ReactTable data={cars} columns={columns} 
            filterable={true}/>
        <ToastContainer autoClose={1500} /> 
      </>
    );
};

export default CarList;