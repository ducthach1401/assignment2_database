var stt = 0;
async function createOption () {
    const url = API_URL + '/v1/room';
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    if (data.message == 'Success'){
        for (let i in data.data){
            let option = document.createElement('option');
            option.setAttribute('value', data.data[i].ID_Furniture_Type);
            option.innerHTML = data.data[i].ID_Furniture_Type;
            document.getElementById('furtiune0').append(option);
        }
    }
}

async function createFurniture() {
    let form = document.getElementById('add');
    let label = document.createElement('label');
    let br = document.createElement('br');
    let furtiune = document.getElementById('furtiune0').cloneNode();
    furtiune.setAttribute('id', 'furtiune' + (++stt));
    let input = document.getElementById('quantity0').cloneNode();
    input.setAttribute('id', 'quantity' + stt);
    furtiune.innerHTML = document.getElementById('furtiune0').innerHTML;
    form.appendChild(label);
    form.appendChild(furtiune);
    form.appendChild(input);
    form.appendChild(br);
}

async function submit() {
    let payload = {
        name: document.getElementById('name').value,
        size: document.getElementById('size').value,
        num: document.getElementById('customer').value,
        description: document.getElementById('dec').value
    }
    for (let i in payload){
        if (payload[i] == ''){
            Swal.fire({
                title: "Error!!",
                icon: 'error'
            });
            return;
        }
    }
    payload.size = parseFloat(payload.size);
    payload.num = parseInt(payload.num);

    let fur = {};
    for (let i = 0; i<= stt; i++) {
        let vt = document.getElementById('furtiune' + i).value;
        let quantity = document.getElementById('quantity' + i).value;
        if ((fur[vt] != undefined) || (parseInt(quantity) <= 0) || (isNaN(parseInt(quantity)))){
            Swal.fire({
                title: "Error!!",
                icon: 'error'
            });
            return;
        }
        fur[vt] = parseInt(quantity);
        payload['furniture'] = fur;
    }

    const url = API_URL + '/v1/room';
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    if (data.message == 'Success'){
        Swal.fire({
            title: data.message,
            icon: 'success'
        })
        setTimeout(() => {
            window.location.href = '/room'
        }, 1000);
    }
    else {
        Swal.fire({
            title: data.message,
            icon: 'error'
        })
    }
}