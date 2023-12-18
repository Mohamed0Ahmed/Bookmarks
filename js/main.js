// *  ### declare and assign elements ###
var siteName = document.getElementById("siteName"),
      siteUrl = document.getElementById("siteUrl"),
      table = document.getElementById("tableBody"),
      updateBtn = document.getElementById("updateBtn"),
      addBtn = document.getElementById("addBtn"),
      alertName = document.getElementById("alertName"),
      alertUrl = document.getElementById("alertUrl"),
      closeBtn = document.getElementById("closeBtn"),
      deleteBtn = document.getElementById("deleteBtn"),

      siteNameRegex = /^[A-z-\s0-9]{3,50}$/,
      siteUrlRegex = /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/

var webSiteList = []; //* ### declar array ###
var indexUpdate;     //* ### declare variable to get index ###


// * ############ add sites in local storage and display it ##########
if (JSON.parse(localStorage.getItem("sites")) != null) {  //* check if it null


      webSiteList = JSON.parse(localStorage.getItem("sites"));  // * ####### add from lacal storage to array and display it   #####
      displayData();
}
// * ############ add wibsites on click ############
function addWebSite() {

      if (validationName() === true && validationUrl() === true) { //* if data valid 
            var siteAndName = {                    //* ### declear and assign object ###
                  name: siteName.value,
                  url: siteUrl.value
            }
            webSiteList.push(siteAndName);         //*  ###  add objects to array   ###
            localStorage.setItem("sites", JSON.stringify(webSiteList)); // *  add to loacal storage 

            displayData();                         //*  ###   display after add object to array ###
            clear();                               //*  ###  call funcation clear   ###
      }
      else {
            document.getElementById("layer").classList.remove("d-none"); //* to show box alert
            document.getElementById("boxAlert").classList.remove("d-none"); //* to show layer 
      }
}
// * #########   clear inputs fields  ###############
function clear() {
      siteName.value = "";
      siteUrl.value = "";
      siteName.classList.remove("is-valid");
      siteUrl.classList.remove("is-valid");
}
// * ############ display and show in table  ############
function displayData() {

      var data = ""  // *  box of html element #######
      for (var i = 0; i < webSiteList.length; i++) {
            data += `    <tr>
            <td class="fw-bold">${(i + 1)}</td>
            <td class="fw-bold">${webSiteList[i].name}</td>
            <td>
            <button class="btn btn-success px-4" onclick="sitUpdates(${i})" >update</button>
            </td>
            <td>
            <button class="btn btn-warning px-4">
            <a href="${webSiteList[i].url}" target="_blank">Visit</a>
            </button>
            </td>
            <td>
            <button class="btn btn-danger textbl" id="delete${i}" onclick="deleteSite(${i})" >
            Delete
            </button>
            </td>
            </tr>                   `
      }
      table.innerHTML = data; //* ### add element to html page ###
}
var deletedItem;
// * #### delete site from display on web page #####  
function deleteSite(index) {
      deletedItem = webSiteList.splice(index, 1); //* ### remove obect from array ###
      localStorage.setItem("sites", JSON.stringify(webSiteList)); //* ### remove from local ###
      displayData();
      deleteBtn.classList.remove("d-none");
      return deletedItem;
}
// * undo delete and push if to array and display it  ###
function undoDelete() {
      var z = deletedItem[0]; //* declare deleted item ###
      webSiteList.push(z);    //* push it to original array ###
      displayData();          //* display with removed item again ###
      deleteBtn.classList.add("d-none"); //* add clas to hide undo button ###
}
// * ### search and display resault of search ####
function searchWebsite() {

      var term = searchInput.value;   // * ###  what user write in search  ####
      var box = ""                    // * ###  box of html element #####

      for (var i = 0; i < webSiteList.length; i++) {

            var x = webSiteList[i].name;                                          //* declare name in var x ###
            var resault = x.replaceAll((term), "<span>" + (term) + "</span>")     //* replace chars into search with effect ###

            if (webSiteList[i].name.toLowerCase().includes(term.toLowerCase())) { // * ###  search and display it if its includes ###
                  box += `     <tr>
                  <td class="fw-bold">${(i + 1)}</td>
                  <td class="fw-bold">${resault}</td>
                  <td>
                  <button class="btn btn-success px-4" onclick="sitUpdates(${i})" >update</button>
                  </td>
                  <td>
                  <button class="btn btn-warning px-4">
                  <a href="${webSiteList[i].url}" target="_blank">Visit</a>
                  </button>
                  </td>
                  <td>
                  <button class="btn btn-danger textbl" id="delete${i}" onclick="deleteSite(${i})" >
                  Delete
                  </button>
                  </td>
                  </tr>           `
            }
      }
      table.innerHTML = box //* ### add element to html page ###
}

// * #### show data to update it  ###
function sitUpdates(index) {
      var deletbtn = document.getElementById("delete" + index); //* declare button who need te disabled
      indexUpdate = index;                      //* assign index to use it in doneUpdate ###
      var chosenSite = webSiteList[index];      // * ###  declare site who need to update  ###

      siteName.value = chosenSite.name;      //* display site name to input and update it ###
      siteUrl.value = chosenSite.url;        //* display site url to input and update it ###
      updateBtn.classList.remove("d-none");  //* remove class from btn to show it ###
      addBtn.classList.add("d-none");        //* add class to btn to remove it ###
      deletbtn.classList.add("disabled");    //* add class to button to disabled it ###
}

// * ###  update data and replace it ###
function doneUpdate() {
      if (validationName() === true && validationUrl() === true) { //*  if validate true ###
            var siteAndName = {                    //* ### same object with update  ###
                  name: siteName.value,
                  url: siteUrl.value
            }

            webSiteList.splice(indexUpdate, 1, siteAndName);            //* remove old and add new data  ###
            localStorage.setItem("sites", JSON.stringify(webSiteList)); // *  add update to loacal storage 

            displayData();                       //* display data after update ###
            updateBtn.classList.add("d-none");   //* add class from btn to show it ###
            addBtn.classList.remove("d-none");   //* remove class to btn to remove it ###
            clear();                             //* clear fields after update ###
      }
      else {
            document.getElementById("layer").classList.remove("d-none"); //* to show box alert
            document.getElementById("boxAlert").classList.remove("d-none"); //* to show layer 
      }
}
//* ### validation for site name ### 
function validationName() {
      var text = siteName.value;                         //* declare validation to text ###
      if (siteNameRegex.test(text) == true) {            //* check if it valid or not ###
            siteName.classList.add("is-valid");          //* add class valid  ###
            siteName.classList.remove("is-invalid");     //* remove class invalid ###
            alertName.classList.add("d-none");           //* add class none to remove alert ###
            return true;
      }

      else {                                                   //* if it is invalid   ###
            siteName.classList.add("is-invalid");              //* add class invalid  ###
            siteName.classList.remove("is-valid");             //* remove class valid ###
            alertName.classList.remove("d-none");              //* remove class none to show alert ###
            return false;
      }
}
//* ### validation for site url ### 
function validationUrl() {
      var text = siteUrl.value;                          //* declare validation to text ###
      if (siteUrlRegex.test(text) === true) {            //* check if it valid or not ###
            siteUrl.classList.add("is-valid");           //* add class valid  ###
            siteUrl.classList.remove("is-invalid");      //* remove class invalid ###
            alertUrl.classList.add("d-none");            //* add class none to remove alert ###
            return true;
      }

      else {                                                 //* if it is invalid   ###
            siteUrl.classList.add("is-invalid");             //* add class invalid  ###
            siteUrl.classList.remove("is-valid");            //* remove class valid ###
            alertUrl.classList.remove("d-none");             //* remove class none to show alert ###
            return false;
      }
}
// * close box alert 
function exit() {
      document.getElementById("layer").classList.add("d-none");     // * add class to close 
      document.getElementById("boxAlert").classList.add("d-none");  // * add class to close
}
