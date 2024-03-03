const form = document.getElementById('dealForm');
form.addEventListener('submit', handleSubmit);

const API_KEY = '9b085b866fe0118f8bab474c6b46b39552539e9e'; 
const baseURL = 'https://api.pipedrive.com/v1/deals';
const PARAMS = '?api_token=';
const URL = baseURL + PARAMS + API_KEY;

async function handleSubmit(event) {
    event.preventDefault();
    
    // Собираем данные из формы
    const formData = new FormData(form);
    const dealData = {};
    
    // Преобразуем данные в объект
    formData.forEach((value, key) => {
        dealData[key] = value;
    });

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dealData), // Преобразуем данные в JSON
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Сделка успешно создана в Pipedrive:', responseData);
            // displayIframe();
        } else {
            throw new Error('Ошибка при создании сделки в Pipedrive');
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
    form.reset(); // Очишчаем поля формы после отправки запроса
}

// function displayIframe() {
//     const iframeContainer = document.querySelector('.iframe-container');
//     const iframe = document.createElement('iframe');
//     iframe.src = 'https://app.pipedrive.com';
//     iframe.width = '100%';
//     iframe.height = '600px';
//     iframe.frameborder = '0';
//     iframeContainer.appendChild(iframe);
// }
