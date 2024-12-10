var payroll=[];

function addEmployees() {
  let emp1 = {
    name: "Employee 1",
    daysworked: 120.00,
    dailyrate: 1000.00,
    grosspay: (120.00 * 1000.00).toFixed(2),
    deduction: 1000.00,
    netpay: ((120.00 * 1000.00) - 500.00).toFixed(2),
  };
  payroll.push(emp1);
  let emp2 = {
    name: "Employee 2",
    daysworked: 1200.00,
    dailyrate: 500.00,
    grosspay: (1200.00 * 500.00).toFixed(2),
    deduction: 500.00,
    netpay: ((1200.00 * 500.00) - 500.00).toFixed(2),
  };
  payroll.push(emp2);
  let emp3 = {
    name: "Employee 3",
    daysworked: 8008.00,
    dailyrate: 6969.00,
    grosspay: (8008.00 * 6969.00).toFixed(2),
    deduction: 1000.00,
    netpay: ((8008.00 * 6969.00) - 5000.00).toFixed(2),
  };
  payroll.push(emp3);
}

document.getElementById("employeeForm").addEventListener("submit", function (event) {
  event.preventDefault(); 

  const confirmationDialog = document.getElementById("dlgConfirmSubmit");
  confirmationDialog.showModal(); 

  confirmationDialog.addEventListener("close", () => { 
    if (confirmationDialog.returnValue === "confirm") {
      const name = document.getElementById("name").value.trim(); 
      const daysworkedInput = document.getElementById("daysworked").value.trim(); 
      const dailyrateInput = document.getElementById("dailyrate").value.trim();
      const deductionInput = document.getElementById("deduction").value.trim();

      if (!name || !daysworkedInput || !dailyrateInput || !deductionInput) {
        alert("All fields are required.");
        return;
      }

      const daysworked = parseFloat(daysworkedInput); 
      const dailyrate = parseFloat(dailyrateInput);
      const deduction = parseFloat(deductionInput);

      if (isNaN(daysworked) || isNaN(dailyrate) || isNaN(deduction)) { 
        alert("Please enter valid numeric values for Days Worked, Daily Rate, and Deduction.");
        return;
      }

      const grosspay = (daysworked * dailyrate).toFixed(2); 
      const netpay = (grosspay - deduction).toFixed(2);

      const emp = { 
        name,
        daysworked,
        dailyrate,
        grosspay,
        deduction,
        netpay,
      };

      payroll.push(emp); 
      showEmployees(); 
      this.reset(); 
    }
  });
});

document.getElementById("btnedit").addEventListener("click", () => { 
  const empNumberInput = document.getElementById("delemployee").value.trim(); 

  const empNumber = parseInt(empNumberInput, 10); 
  if (isNaN(empNumber) || empNumber < 1 || empNumber > payroll.length) { 
    alert("Invalid Employee Number. Please enter a number between 1 and " + payroll.length);
    return false;
  }

 
  const empIndex = empNumber - 1; 
  const employee = payroll[empIndex];


  const confirmationDialog = document.getElementById("dlgConfirmEdit");
  document.getElementById("edtmsg").textContent = `Are you sure you want to edit the details of Employee No. ${empNumber}?`;
  confirmationDialog.showModal();

  confirmationDialog.addEventListener("close", () => {
    if (confirmationDialog.returnValue === 'confirm') {
      const name = document.getElementById("name").value.trim();
      const daysworkedInput = document.getElementById("daysworked").value.trim();
      const dailyrateInput = document.getElementById("dailyrate").value.trim();
      const deductionInput = document.getElementById("deduction").value.trim();

      if (!name || !daysworkedInput || !dailyrateInput || !deductionInput) {
        alert("All fields are required.");
        return;
      }

      
      employee.name = name; 
      employee.daysworked = parseFloat(daysworkedInput);
      employee.dailyrate = parseFloat(dailyrateInput);
      employee.deduction = parseFloat(deductionInput);
      employee.grosspay = (employee.daysworked * employee.dailyrate).toFixed(2);
      employee.netpay = (employee.grosspay - employee.deduction).toFixed(2);

      showEmployees();  
      document.getElementById("delemployee").value = ''; 
    }
  });
});

function showEmployees() {
  let tb = "";
  let tgpay = 0.0, tded = 0.0, tnetpay = 0.0;
  let lno = 1;

  payroll.forEach((emp) => {
    tb += `<tr>
      <td style="text-align:right">${lno}</td>
      <td>${emp.name}</td>
      <td class="ndata">${emp.daysworked.toFixed(2)}</td>
      <td class="ndata">${emp.dailyrate.toFixed(2)}</td>
      <td class="ndata">${emp.grosspay}</td>
      <td class="ndata">${emp.deduction.toFixed(2)}</td>
      <td class="ndata">${emp.netpay}</td>
    </tr>`;
    tgpay += parseFloat(emp.grosspay);
    tded += parseFloat(emp.deduction);
    tnetpay += parseFloat(emp.netpay);
    lno++;
  });

  document.getElementById("tablebody").innerHTML = tb;
  document.getElementById("tGrossPay").textContent = tgpay.toFixed(2);
  document.getElementById("tDeduction").textContent = tded.toFixed(2);
  document.getElementById("tNetPay").textContent = tnetpay.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => { 
  addEmployees(); 
  showEmployees();

  dlgConfirmCancel = document.getElementById("dlgConfirmCancel");
  document.getElementById("btndelete").addEventListener("click",()=>{
    let x = document.getElementById("delemployee").value *1 - 1;
    if ((x >= 0) && (x<payroll.length)) {
      document.getElementById("dlgmsg").innerHTML = "Delete the employee " + (x + 1)+" " + payroll[x].name+"?";
      dlgConfirmCancel.showModal();
    }   
  });
  document.getElementById("btndeleteall").addEventListener("click",()=>{
    document.getElementById("dlgmsg").innerHTML = "Delete all records?";
    dlgConfirmCancel.showModal();
  });

  dlgConfirmCancel.addEventListener("close", (e) => {
    var rst = e.target.returnValue;
    if (rst === "confirm") {
      dlgmsg=document.getElementById("dlgmsg").innerHTML;
      if (dlgmsg=="Delete all records?"){
        dlgAreYouSure=document.getElementById("dlgAreYouSure");
        document.getElementById("dlgmsg2").innerHTML ="Are you sure?";
        dlgAreYouSure.showModal();
      } else { 
        var x = document.getElementById("delemployee").value * 1 - 1;
        payroll.splice(x, 1);
        showEmployees();
        document.getElementById("delemployee").value = '';
      }
    }
  });
  dlgAreYouSure=document.getElementById("dlgAreYouSure");
  dlgAreYouSure.addEventListener("close", (e) => {
    var rst = e.target.returnValue;
    if (rst === "yes") {
      payroll=[];
      showEmployees();
    }
  });
});
