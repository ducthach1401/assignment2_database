const API_URL = "http://localhost:8080";

async function return_home(){
    window.location.href = '/'
}

async function logout () {
    const url = API_URL + '/v1/logout/'
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    Swal.fire({
        title: data.message,
        icon: 'success'
    })
    setTimeout(() => {
        window.location.href = '/';
    }, 1000)
}