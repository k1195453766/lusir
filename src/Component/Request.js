

let request = function (method, url, parmse, callback) {

    let req;

    if (method == "get") {
        req = new Request(url, {
            method: 'GET',
            headers: ({
                // 'Content-Type': 'application/json'
            }),
            credentials: "include", //把服务器返回来的cookie当参数传过去
        });
    } else {
        req = new Request(url, {
            method: 'POST',
            headers: ({
                // 'Content-Type': 'application/json'
            }),
            credentials: "include", //把服务器返回来的cookie当参数传过去
            body: JSON.stringify(parmse)
        });
    }

    fetch(req).then((response) => response.json())
        .then((result) => {
            callback(result);//返回json数据
        }).catch((error) => {
            console.log(error);
        }).catch(e => {
            console.log(e);
        });
}

export default request;