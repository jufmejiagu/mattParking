const Api = {
  /**
  * Return the promise (only json data)
  * @param {url} String with the url petition
  * @param {typeOfPetition} String with the petition type
  * @param {bodyData} Json with the request data
  * @returns {Promise}
  */
  onCallAjaxPromise(url, typeOfPetition, bodyData) {
    const method = typeOfPetition !== undefined ? typeOfPetition : 'GET';
    const data = (bodyData === undefined || bodyData === null) ? null : bodyData;
    const request = {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };
    if (data) {
      request.body = JSON.stringify(data);
    }
    return (
      fetch(`http://localhost:4040${url}`, request)
    );
  },

};

export default Api;
