function getBaseUrl() {
  if (process.env.NODE_ENV === 'development') {
    return "http://localhost:3000/"
  } else if (process.env.NODE_ENV === 'production') {
    return "https://kode-review-server.herokuapp.com/"
  } else {
    return "https://api.kodereview.io/"
  }
}

function fetchResponse(request) {
  return fetch(request).then(response => {
    return response.json();
  }).catch(error => {
    return error;
  });
}

class CaseApi {
    static getCaseList() {
        const request = new Request(getBaseUrl() + `feed_items`, {
            method: 'GET',
            credentials: 'include'
        })
        return fetchResponse(request)
    }
}

export default CaseApi;