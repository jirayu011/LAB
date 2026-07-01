const data = [
    { standard: -18.00 },
    { standard: 0.00 },
    { standard: 10.00  },
    { standard: 15.00},
    { standard: 65.00 },
    { standard: 75.00  },
    { standard: 90.00  },
    { standard: 100.00  }
];

const tbody = document.getElementById("tableBody");

function renderTable(){

    tbody.innerHTML="";

    data.forEach((row,index)=>{

        tbody.innerHTML += `

        <tr>

        <td>${index+1}</td>

        <td>${row.standard.toFixed(2)}</td>

        <td>
            <input type="number"
                step="0.001"
                class=uuc">
        </td>

        <td>
            <input type="number"
                step="0.001"
                class="correction">
        </td>

        <td>
            <input type="number"
                step="0.001"
                class="uncertainty">
        </td>

        <td class="minus">-</td>

        <td class="plus">-</td>

        </tr>

        `;

    });

}

renderTable();

document.getElementById("calculateBtn").onclick=()=>{

    const rows=document.querySelectorAll("tbody tr");

    rows.forEach(row=>{

        const correction=parseFloat(row.querySelector(".correction").value);

        const uncertainty=parseFloat(row.querySelector(".uncertainty").value);

        if(isNaN(correction)||isNaN(uncertainty))
            return;

        const minus=correction-uncertainty;
        const plus=correction+uncertainty;

        const minusCell=row.querySelector(".minus");
        const plusCell=row.querySelector(".plus");

        minusCell.innerHTML=minus.toFixed(2);
        plusCell.innerHTML=plus.toFixed(2);

        minusCell.classList.remove("danger");
        plusCell.classList.remove("danger");

        if(minus<-1){

            minusCell.classList.add("danger");

        }

        if(plus>1){

            plusCell.classList.add("danger");

        }

    });

}

document.getElementById("resetBtn").onclick=()=>{

    renderTable();

}
document.getElementById("calculateBtn").addEventListener("click", calculate);

document.getElementById("resetBtn").addEventListener("click", () => {
    renderTable();

    // ผูก Event ใหม่หลังจาก render
    document.getElementById("calculateBtn").addEventListener("click", calculate);
});
function calculate() {

    const rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {

        const correction = parseFloat(row.querySelector(".correction").value);
        const uncertainty = parseFloat(row.querySelector(".uncertainty").value);

        const minusCell = row.querySelector(".minus");
        const plusCell = row.querySelector(".plus");

        if (isNaN(correction) || isNaN(uncertainty)) {
            minusCell.textContent = "-";
            plusCell.textContent = "-";
            minusCell.classList.remove("danger");
            plusCell.classList.remove("danger");
            return;
        }

        const minus = correction - uncertainty;
        const plus = correction + uncertainty;

        minusCell.textContent = minus.toFixed(2);
        plusCell.textContent = plus.toFixed(2);

        minusCell.classList.remove("danger");
        plusCell.classList.remove("danger");

        if (minus < -2) {
            minusCell.classList.add("danger");
        }

        if (plus > 2) {
            plusCell.classList.add("danger");
        }

    });
    

}
document.querySelectorAll(".correction, .uncertainty").forEach(input => {
    input.addEventListener("input", calculate);
});
