const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/messages' : 'https://api.guestm.app/api/v1/messages';

export function getLocation() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }, () => {      
      resolve(fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(location => {
          return {
            lat: location.latitude,
            lng: location.longitude
          };
        }));
    });
  });
}

export function sendMessage(message) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(message)
  }).then(res => res.json());
}