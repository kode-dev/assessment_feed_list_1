function getBaseUrl() {
  return 'http://localhost:3000/';
}

function fetchResponse(request) {
  return fetch(request)
    .then(response => response.json())
    .catch(error => error);
}

class CaseApi {
  static getCaseList() {
    const request = new Request(`${getBaseUrl()}feed_items`, {
      method: 'GET',
      credentials: 'include',
    });
    return fetchResponse(request);
  }

  static getUpToDateCaseList(begin, end, limit = 20) {
    const request = new Request(`${getBaseUrl()}feed_items?limit=${limit}&begin=${begin}&end=${end}`, {
      method: 'GET',
      credentials: 'include',
    });
    return fetchResponse(request);
  }

  static postCase(report) {
    const request = new Request(`${getBaseUrl()}feed_items`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(report),
    });
    return fetchResponse(request);
  }
}

export default CaseApi;
