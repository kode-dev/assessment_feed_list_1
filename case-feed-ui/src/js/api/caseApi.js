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
  };

  static getUpToDateCaseList(begin) {
    const request = new Request(`${getBaseUrl()}feed_items?begin=${begin}`, {
      method: 'GET',
      credentials: 'include',
    });
    return fetchResponse(request);
  }
}

export default CaseApi;
