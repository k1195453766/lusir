import config from './Config';

const sync = {
    // sync方法的名字必须和所存数据的key完全相同
    // 方法接受的参数为一整个object，所有参数从object中解构取出
    // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
    issue(params) {
        let { id, resolve, reject, syncParams: { extraFetchOptions, someFlag } } = params;

        fetch(`${config.baseUrl}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': extraFetchOptions.token
            },
            // body: 'id=' + id,
            ...extraFetchOptions,
        }).then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
            if (json && json.results) {
                storage.save({
                    key: 'issue',
                    id,
                    data: json.results
                });

                if (someFlag) {
                    // 根据syncParams中的额外参数做对应处理
                }

                // 成功则调用resolve
                resolve && resolve(json.results);
            }
            else {
                // 失败则调用reject
                reject && reject(new Error('data parse error'));
            }
        }).catch(err => {
            console.warn(err);
            reject && reject(err);
        });
    }
}

export default sync;