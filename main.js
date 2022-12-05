var form = `<div class="container">
        

<div class="">
  <label for="inputEmail4" class="form-label">Choose Expense</label>
  <div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="number" class="form-control" id='expense' aria-label="Dollar amount (with dot and two decimal places)" placeholder='Enter Amount'>
  
</div>
  </div> 

  
  <div class='chooseExpense'>
  <label for="inputEmail4" class="form-label">Choose Catagory</label>
<select class="form-select col" id='catagory' aria-label=".form-select-sm example">
<option >Movie</option>
<option >Shopping</option>
<option >Rent</option>
<option >Grocery</option>
</select>
  </div>

  </div>


  <div class="secondDiv">
  <div class="col">
  <label for="inputPassword4" class="form-label">Add Short Description</label>
    <input type="text" class="form-control" id='description' placeholder="Description" aria-label="Last name">
  </div>
  <button class="btn btn-primary mt-4 btn1" type="submit" onclick='save()'>Save</button>


  </div>
  
`;
//  add form to htnl
document.getElementById("form").innerHTML = form;

//initialize to trap data
let details = [];
getData();
table();

// to get data from local storage
function getData() {
  let data = localStorage.getItem("details");
  if (data) {
    details = JSON.parse(data);
  } else {
    setData();
  }
}

// to send data to local storage
function setData() {
  localStorage.setItem("details", JSON.stringify(details));
}

// to save data function
function save() {
  let expense = document.getElementById("expense");
  let e = document.getElementById("catagory");
  let catagory = e.options[e.selectedIndex].text;
  let description = document.getElementById("description");
  if(expense.value==0) return alert('Expense is Empty')
  let data = {
    expense: expense.value,
    catagory: catagory,
    description: description.value,
  };
  details.push(data);
  setData();
  // console.log(details);
  table();
}

// Add detals table
function table() {
  let table = `<table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Expense</th>
        <th scope="col">Catagory</th>
        <th scope="col">Description</th>
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>

      </tr>
    </thead>
    <tbody>`;
  for (let i = 0; i < details.length; i++) {
    table =
      table +
      `<tr>
        <th scope="row">${i + 1}</th>
        <td>${details[i].expense}</td>
        <td>${details[i].catagory}</td>
        <td>${details[i].description}</td>
        <td><button type='button' class='btn btn-warning' onclick='edit(${i})'>Edit</button></td>
        <td><button type='button' class='btn btn-danger' onclick='deleteData(${i})'>Delete</button></td>
      </tr>`;
  }
  table =
    table +
    `</tbody>
    </table>`;
  let expense = document.getElementById("expense");
  let description = document.getElementById("description");
  // expense.value='';
  // description.value='';
  document.getElementById("form").innerHTML = form;
  document.getElementById("table").innerHTML = table;
}

// edit function
function edit(index) {
  var editForm = `<div class="container">
        

  <div class="">
    <label for="inputEmail4" class="form-label">Choose Expense</label>
    <div class="input-group mb-3">
    <span class="input-group-text">$</span>
    <input type="number" class="form-control" id='newexpense' value=${details[index].expense} aria-label="Dollar amount (with dot and two decimal places)" placeholder='Enter Amount'>
    
  </div>
    </div> 
  
    
    <div class='chooseExpense'>
    <label for="inputEmail4" class="form-label">Choose Catagory</label>
  <select class="form-select col" id='newcatagory' value=${details[index].catagory} aria-label=".form-select-sm example">
  <option >Movie</option>
  <option >Shopping</option>
  <option >Rent</option>
  <option >Grocery</option>
  </select>
    </div>
  
    </div>
  
  
    <div class="secondDiv">
    <div class="col">
    <label for="inputPassword4" class="form-label">Add Short Description</label>
      <input type="text" class="form-control" id='newdescription' value=${details[index].description} placeholder="Description" aria-label="Last name">
    </div>
    <button class="btn btn-primary mt-4 btn1" type="submit" onclick='update(${index})'>Update</button>
  
  
    </div>
    `;
  document.getElementById("form").innerHTML = editForm;
}

// update function
function update(index) {
  let newexpense = document.getElementById("newexpense");
  let e = document.getElementById("newcatagory");
  let newcatagory = e.options[e.selectedIndex].text;
  let newdescription = document.getElementById("newdescription");
  details[index] = {
    expense: newexpense.value,
    catagory: newcatagory,
    description: newdescription.value,
  };
  setData();
  table();
  document.getElementById("form").innerHTML = form;
}

// delete function
function deleteData(index) {
  details.splice(index, 1);
  setData();
  table();
}
