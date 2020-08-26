// 1, 获取code
{   
    let uri = "https://github.com/login/oauth/authorize";
    let client_id = "xxx";
    let redirect_uri="http%3A%2F%2Flocalhost%3A8000";
    let scope="read%3Auser";
    let state="abc123";

    let url = `${uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;
    console.log(url);
}

// 2, code换取access_token
{
    let uri = "https://github.com/login/oauth/access_token";
    let client_id = "xxx";
    let client_secret = "xxx";
    let code = "xxx";
    let redirect_uri = "http%3A%2F%2Flocalhost%3A8000";
    let state = "abc123";

    let requestUri = `${uri}?client_id=${client_id}&code=${code}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&state=${state}`;

    let xhr = new XMLHttpRequest;
    xhr.open("POST", requestUri, true);
    xhr.send(null);
    xhr.addEventListener("readystatechange", event => {
        if (xhr.readyState == 4) {
            console.log(event.responseText);
        }
    });
}

// 3, 换取access_token 
//access_token=xxx&expires_in=28800&refresh_token=r1.xxx&refresh_token_expires_in=xxx&scope=&token_type=bearer
{
    let uri = "https://github.com/login/oauth/access_token";
    let client_id = "xxx";
    let client_secret = "xxx";
    let code = "xxx";
    let redirect_uri = "http%3A%2F%2Flocalhost%3A8000";
    let state = "abc123";

    let requestUri = `${uri}?client_id=${client_id}&code=${code}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&state=${state}`;

    let xhr = new XMLHttpRequest;
    xhr.open("POST", requestUri, true);
    xhr.send(null);
    xhr.addEventListener("readystatechange", event => {
        if (xhr.readyState == 4) {
            console.log(event.responseText);
        }
    });
}

// 4, 利用access_token获取用户信息
{
    let uri = "https://api.github.com/user";
    let access_token = "xxx";

    let xhr = new XMLHttpRequest;
    xhr.open("GET", uri, true);
    xhr.setRequestHeader(`Authorization`, `token ${access_token}`);
    xhr.send(null);
    xhr.addEventListener("readystatechange", (event) => {
        if (xhr.readyState == 4) {
            console.log(xhr.responseText);
        }
    });
}