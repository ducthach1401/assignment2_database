async function home() {
    const url = API_URL + '/v1/clients/'
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    await createTableClient(data);
}

async function find() {
    const name = document.getElementById('search').value;
    if (name == ''){
        console.log(name);
        home();
        return;
    }
    const url = API_URL + '/v1/client?name=' + name;
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    await createTableClient(data);
}

async function createTableClient(data){
    const home  = document.getElementById('home');
    home.innerHTML ='';
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerHTML = 'STT';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = 'ID Client';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = 'CMND/CCCD';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = 'Name';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = 'Phone';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = 'Email';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = 'Username';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = 'Point';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = 'Type';
    tr.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = 'Information';
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
                td = document.createElement('td');
                td.innerHTML = client[i];
                tr.appendChild(td);
            }

            td = document.createElement('td');
            button = document.createElement('button');
            button.innerHTML = 'Details';
            button.setAttribute('id', client.Client_ID)
            button.setAttribute('class', 'btn btn-outline-primary btn-table');
            button.setAttribute('onclick', 'order_room(this.id)');
            td.appendChild(button);
            tr.appendChild(td);
            table.appendChild(tr);
        }
        home.append(table);
    }
}

async function order_room (id) {
    const url = API_URL + '/v1/client/' + id;
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    let data = await response.json();
    let home = document.getElementById('home');
    home.innerHTML = '';
    let header = ["STT", "ID Order", "Date Order", "Number of customers", "Check in", "Check out", "Status", "Total money"];
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    for (let i of header){
        let th = document.createElement('th');
        th.innerHTML = i;
        tr.appendChild(th);
    }
    table.appendChild(tr);
    if (data.message == 'Success'){
        let stt = 0;
        for (let client of data.data){
            tr = document.createElement('tr');
            let td = document.createElement('td');
            td.innerHTML = ++stt;
            tr.appendChild(td);
            for (let i in client){
                if ((i == 'Date_order') || (i == 'Check_in') || (i == 'Check_out')){
                    const d = new Date(client[i]);
                    client[i] = [('0' + d.getDate()).slice(-2), ('0' + (d.getMonth() + 1)).slice(-2), d.getFullYear()].join('/');
                    if (i == 'Date_order'){
                        client[i] += ' ' + [('0' + d.getHours()).slice(-2), ('0' + d.getMinutes()).slice(-2), ('0' + d.getSeconds()).slice(-2)].join(':');
                    }
                }
                td = document.createElement('td');
                td.innerHTML = client[i];   
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }
    const button = document.createElement('button');
    button.setAttribute('class', 'btn btn-outline-primary return-home');
    button.setAttribute('onclick', 'return_home();');
    button.innerHTML = 'Return Home';
    home.appendChild(table);
    home.appendChild(button);
}