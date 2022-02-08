`use strict`

import * as DOM from './dom.js';

/*
const writeItem = item => {
    const child = document.createElement(`li`);
    child.id = item._id;
    child.innerHTML = `${JSON.stringify(item)}`;
    DOM.CarOutput.appendChild(child);
}


//Read (GET)
const ReadCar = () => {
    DOM.CarOutput.innerHTML = ``;
  
    axios.get(`http://localhost:8080/car/read`)
      .then((response) => {
        if (!Array.isArray(response.data)) {
          writeItem(response.data);
        } else {
          for (let item of response.data) {
            writeItem(item);
          }
        }
      }).catch((err) => {
        console.log(err);
      });
} 

//Read (GET) - by ID//
const ReadCarId = () => {
    DOM.CarOutput.innerHTML = ``;
  
    axios.get(`http://localhost:8080/car/read/${DOM.ReadCarIdInput.value}`)
      .then((response) => {
        console.log(response);
        DOM.CarOutput.innerHTML = `${JSON.stringify(response.data)}`;
      }).catch((err) => {
        console.log(err);
      });
  } 


DOM.ReadCarId.onclick = () => ReadCarId();
*/

//Update (PUT)
const PutCar = () => {
    DOM.CarOutput.innerHTML = ``;

    axios.put(`http://localhost:8080/car/update/${DOM.CarId.value}`, 
        {
        "name" : `${DOM.CarNameUpdate.value}`, 
        "model" : `${DOM.CarModelUpdate.value}`, 
        "make" : `${DOM.CarMakeUpdate.value}`, 
        "colour" : `${DOM.CarColourUpdate.value}`, 
        "doors" : `${DOM.CarDoorUpdate.value}`, 
        "garage" : `${DOM.CarGarageUpdate.value}`
        })

        .then((response) => {
            console.log(response);
            ReadCar();
            DOM.CarNameUpdate.value = ``;
            DOM.CarMakeUpdate.value = ``;
            DOM.CarModelUpdate.value = ``;
            DOM.CarColourUpdate.value = ``;
            DOM.CarDoorUpdate.value = ``;
            DOM.CarGarageUpdate.value =``;
        }).catch((err) => {
            console.log(err);
        });
}
DOM.UpdateCar.onclick = () => PutCar();

//Delete (DELETE)
const DeleteCar = () => {
    DOM.CarOutput.innerHTML = ``;

    axios.delete(`http://localhost:8080/car/delete/${DOM.DeleteCarId.value}`)
        .then((response) => {
            console.log(response);
            DOM.DeleteCarId.value = ``;
            ReadCar();
        }) .catch((err) => {
            console.log(err);
          });
}
DOM.DeleteCar.onclick = () => DeleteCar();

DOM.ReadCar.onclick = () => ReadCar()
//DOM.CreateCar.onclick = () => CreateCar();
DOM.CreateCar.onclick = () => { console.log(DOM.colour.value.toString(),DOM.doors.value,DOM.make.value, DOM.model.value, DOM.name.value);
    CreateCar();}
