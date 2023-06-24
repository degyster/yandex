const input = document.querySelector('#input');
const btn = document.querySelector('#btn');
const main = document.querySelector('#main');
const inLocSt = document.querySelector('#inLocSt');

btn.addEventListener('click', async () => {
  main.innerHTML = '';

  const url = 'http://127.0.0.1:3000/';
  const data = {
    text: input.value
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Request failed.');
    }

    const responseData = await response.json();
    const links = responseData.links;

    links.forEach((el) => {
      const element = document.createElement('div');
      element.className = 'element';

      if (isImageURL(el[1])) {
        const image = document.createElement('img');
        image.src = el[1];
        element.appendChild(image);
      } else {
        const link = document.createElement('a');
        link.innerText = el[0];
        link.href = el[1];
        link.target = '_blank'; 
        element.appendChild(link);
      }

      element.addEventListener('click', async () => {
        const link = {
          text: el[1]
        };
        const urlLinks = 'http://127.0.0.1:3000/links';

        try {
          const linkResponse = await fetch(urlLinks, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(link)
          });

          if (!linkResponse.ok) {
            throw new Error('Request failed.');
          }

          const linkData = await linkResponse.json();
          const result = linkData.result;

          localStorage.setItem('data', result);
          inLocSt.innerHTML = localStorage.getItem('data');
        } catch (error) {
          console.error('Error:', error);
        }
      });

      main.appendChild(element);
    });
  } catch (error) {
    console.error('Error:', error);
  }
});

function isImageURL(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}
