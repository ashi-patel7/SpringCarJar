`use strict`

import * as DOM from './dom.js';

const writeItem = item => {
  const child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `${JSON.stringify(item)}`;
  DOM.carOutput.appendChild(child);
}

//creating an event
DOM.readCarButton.onclick = () => carRead();
DOM.createCarButton.onclick = () => carCreate();
DOM.DeleteCar.onclick = () => DeleteCar();
DOM.UpdateCar.onclick = () => UpdateCar();
DOM.specificCarButton.onclick = () => carReadID();
DOM.getCarByNameButton.onclick = () => carFindByName();

//read all cars
const carRead = () => {
  DOM.carOutput.innerHTML = ``;

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

//create car and populate into a garage
const carCreate = () => {
  axios.post(`http://localhost:8080/car/create`, {
    "name" : `${DOM.name.value}`,
    "colour" : `${DOM.colour.value}`,
    "make" : `${DOM.make.value}`,
    "model" : `${DOM.model.value}`,
    "doors" : `${DOM.doors.value}`,
    "garage": {"id" : nameToGarage(`${DOM.createGarageButton.value}`).toString()}
  })
    .then((response) => {
      console.log(response);
      getGarage();
    }).catch((err) => {
      console.log(err.response.data);
    })};
    DOM.buttonCarCreate.onclick = () => {carCreate();}
    const nameToGarage = (str) => {
                console.log(str)
                axios.get(`http://localhost:8080/garage/read`)
                .then((response) => {
                    for (const i of response.data) {      
                        console.log(i);
                        if(i.name == str) {
                            passById = i.id; //pass by ID equals the value in garages by id
                        }
                    }
                    console.log(passById);
                }).catch((err) => {
    console.log(err);
  });
return passById;}

let passById;
const createcar = () => {
  axios.post(`http://localhost:8080/car/create`,
      {
        "name": `${DOM.carNameCreate.value}`,
        "colour":`${DOM.carColourCreate.value}`,
        "make": `${DOM.carMakeCreate.value}`,
        "model": `${DOM.carModelCreate.value}`,
        "doors": `${DOM.carDoorCreate.value}`,
        "garage": {"id" : nameToGarage(`${DOM.carGarageCreate.value}`).toString()}
      })
      .then((response) => {
          console.log(response);
          // getGarage();
      }).catch((err) => {
          console.log(err);
  })};
  DOM.buttonCarCreate.onclick = () => {createcar();}
    const nameToGarage = (str) => {
      console.log(str)
      axios.get(`http://localhost:8080/garage/read`)
      .then((response) => {
        for (const i of response.data) {      
          console.log(i);
           if(i.name == str) {
              passById = i.id; //pass by ID equals the value in garages by id
           }
        }
        console.log(passById);
    }).catch((err) => {
        console.log(err);
      });
    return passById;}

//Delete (DELETE) car
const DeleteCar = () => {
  axios.delete(`http://localhost:8080/car/delete/${DOM.Delete_CarId.value}`)
    .then((response) => {
      console.log(response);
      DOM.Delete_CarId.value = "";
      carRead();
    }).catch((err) => {
      console.log(err);
    });
}

//Update (PUT) car
const UpdateCar = () => {
  
  axios.put(`http://localhost:8080/car/update/${DOM.Update_CarID.value}`, {
    "name" : `${DOM.Update_CarName.value}`,
    "make" : `${DOM.Update_Make.value}`,
    "model" : `${DOM.Update_Model.value}`,
    "colour" : `${DOM.Update_Colour.value}`,
    "doors" : `${DOM.Update_Doors.value}`
  })
    .then((response) => {
      console.log(response);
      carRead();
      DOM.Update_CarName.value = "";
      DOM.Update_Make.value = "";
      DOM.Update_Model.value = "";
      DOM.Update_Colour.value = "";
      DOM.Update_Doors.value = "";
      DOM.Update_CarID.value = "";
    }).catch((err) => {
      console.log(err);
    });
}

//Read by car id
const carReadID = () => {

  DOM.carOutput.innerHTML = ``;

  axios.get(`http://localhost:8080/car/read/${DOM.getCarID.value}`)
    .then((response) => {
      console.log(response);
      DOM.carOutput.innerHTML = `${JSON.stringify(response.data)}`;
    }).catch((err) => {
      console.log(err);
    });
}

//find car by name
const carFindByName = () => {

  DOM.carOutput.innerHTML = ``;

  axios.get(`http://localhost:8080/car/findByName/${DOM.getCarByName.value}`)
    .then((response) => {
      console.log(response);
      DOM.carOutput.innerHTML = `${JSON.stringify(response.data)}`;
    }).catch((err) => {
      console.log(err);
    });
}