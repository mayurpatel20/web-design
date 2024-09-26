function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return this.mytitle;
};

var socialMedia = {
  facebook: 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('nameDisplay').textContent = "MAYUR KIRTIBHAI PATEL - NUID 002470961";//name and nuid number

  // Disable submit button initially
  document.getElementById('button').disabled = true;
  document.getElementById('button').style.backgroundColor = 'gray';

  // Add event to "Add Student" button
  document.getElementById('add').addEventListener('click', addStudent);

  // Add event to existing checkboxes
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange);
  });

  // Hide expanded content initially
  var expandedContent = document.querySelectorAll('tr[class^="dropDownTextArea"]');
  expandedContent.forEach(function(row) {
    row.style.display = 'none';
  });

  // Add event to arrow buttons
  var arrowButtons = document.querySelectorAll('img[src="down.png"]');
  arrowButtons.forEach(function(button) {
    button.addEventListener('click', toggleRowExpansion);
  });
});

function addStudent() {
  var table = document.getElementById('myTable');
  var rowCount = table.rows.length;
  //var newRowNumber = rowCount / 2; // Accounting for expanded rows
  var newRowNumber = Math.ceil(rowCount / 2); 

  var newRow = table.insertRow(rowCount - 1);
  newRow.innerHTML = `
    <td><input type="checkbox" /><br /><br /><img src="down.png" /></td>
    <td>Student ${newRowNumber}</td>
    <td>Teacher ${newRowNumber}</td>
    <td>Approved</td>
    <td>Fall</td>
    <td>TA</td>
    <td>${10000 + newRowNumber}</td>
    <td>100%</td>
    <td></td>
    <td></td>
  `;

  var expandedRow = table.insertRow(rowCount);
  expandedRow.className = `dropDownTextArea dropDownTextArea${newRowNumber}`;
  expandedRow.style.display = 'none';
  expandedRow.innerHTML = `
  <td colspan="10">
    Advisor:<br /><br />
    Award Details<br />
    Summer 1-2014(TA)<br />
    Budget Number: <br />
    Tuition Number: <br />
    Comments:<br /><br />
    Award Status:<br /><br />
  </td>
  `;

  newRow.querySelector('input[type="checkbox"]').addEventListener('change', handleCheckboxChange);
  newRow.querySelector('img[src="down.png"]').addEventListener('click', toggleRowExpansion);

  alert(`Student ${newRowNumber} Record added successfully`);
}

function handleCheckboxChange(event) {
  var checkbox = event.target;
  var row = checkbox.closest('tr');
  var submitButton = document.getElementById('button');
  var deleteButton = row.querySelector('.deleteBtn');
  var editButton = row.querySelector('.editBtn');

  if (checkbox.checked) {
    row.style.backgroundColor = 'yellow';
    submitButton.disabled = false;
    submitButton.style.backgroundColor = 'orange';

    if (!deleteButton) {
      deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'deleteBtn';
      deleteButton.addEventListener('click', deleteRow);
      row.cells[row.cells.length - 1].appendChild(deleteButton);
    }

    if (!editButton) {
      editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.className = 'editBtn';
      editButton.addEventListener('click', editRow);
      row.cells[row.cells.length - 2].appendChild(editButton);
    }
  } else {
    row.style.backgroundColor = 'white';
    if (deleteButton) deleteButton.remove();
    if (editButton) editButton.remove();
  }

  //if any checkbox is still checked
  var anyChecked = Array.from(document.querySelectorAll('input[type="checkbox"]')).some(cb => cb.checked);
  if (!anyChecked) {
    submitButton.disabled = true;
    submitButton.style.backgroundColor = 'gray';
  }
}

function deleteRow(event) {
  var row = event.target.closest('tr');
  var studentName = row.cells[1].textContent;
  row.nextElementSibling.remove(); // Remove expanded row
  row.remove();
  alert(`${studentName} Record deleted successfully`);
}

function editRow(event) {
  var row = event.target.closest('tr');
  var studentName = row.cells[1].textContent;
  var popupContent = `
    <h2>Edit details of ${studentName}</h2>
    <p>Student: ${row.cells[1].textContent}</p>
    <p>Advisor: ${row.cells[2].textContent}</p>
    <p>Award Status: ${row.cells[3].textContent}</p>
    <p>Semester: ${row.cells[4].textContent}</p>
    <p>Type: ${row.cells[5].textContent}</p>
    <p>Budget #: ${row.cells[6].textContent}</p>
    <p>Percentage: ${row.cells[7].textContent}</p>
    <button onclick="updateStudent('${studentName}')">Update</button>
    <button onclick="closePopup()">Cancel</button>
  `;
  showPopup(popupContent);
}

function updateStudent(studentName) {
  alert(`${studentName} data updated successfully`);
  closePopup();
}

function showPopup(content) {
  var popup = document.createElement('div');
  popup.id = 'editPopup';
  popup.innerHTML = content;
  document.body.appendChild(popup);
}

function closePopup() {
  document.getElementById('editPopup').remove();
}

function toggleRowExpansion(event) {
  var row = event.target.closest('tr');
  var table = document.getElementById('myTable');
  var studentNumber = row.cells[1].textContent.split(' ')[1];
  var expandedRow = table.querySelector(`.dropDownTextArea${studentNumber}`);

  if (expandedRow) {
    expandedRow.style.display = expandedRow.style.display === 'none' ? 'table-row' : 'none';
  } else {
    console.error(`Expanded row for Student ${studentNumber} not found`);
  }
}



