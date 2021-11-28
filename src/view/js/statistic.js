async function statistic() {
    const url = API_URL + '/v1/clients/';
    const payload = {
        branch: document.getElementById('branch').value,
        year: document.getElementById('year').value
    }
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    console.log(data);
    await createTableClient(data);
}

async function createBranch() {
    const url = API_URL + '/v1/branch/';
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    if (data.message == 'Success'){
        for (let branch of data.data){
            let option = document.createElement('option');
            option.value = branch.Branch_ID;
            option.innerHTML = branch.Branch_ID;
            document.getElementById('branch').appendChild(option);
        }
    }
}

async function createTableClient(data){
    const home  = document.getElementById('table');
    home.innerHTML ='';
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerHTML = 'STT';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = 'Tháng';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = 'Tổng số lượt khách';
    tr.appendChild(th);

    table.appendChild(tr);
    let stt = 0;
    if (data.message == 'Success') {
        for (let client of data.data){
            stt ++;
            tr = document.createElement('tr');
            let td = document.createElement('td');
            td.innerHTML = stt;
            tr.appendChild(td);
            for (let i in client){
                console.log(client[i]);
                td = document.createElement('td');
                td.innerHTML = client[i];
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        home.append(table);
    }
}