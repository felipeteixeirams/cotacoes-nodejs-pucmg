console.log('Javascript no frontend')

const cotacoesForm = document.querySelector('form')
const mainMensage = document.querySelector('h3')
const price = document.querySelector('#price')
const price_open = document.querySelector('#price_open')
const day_hight = document.querySelector('#day_hight')
const day_low = document.querySelector('#day_low')

cotacoesForm.addEventListener('submit', (event) =>{
    mainMensage.innerText = 'Buscando...'
    price.innerHTML = ''
    price_open.innerHTML = ''
    day_hight.innerHTML = ''
    day_low.innerHTML = ''

    event.preventDefault()
    const ativo = document.querySelector('input').value

    if(!ativo){
        mainMensage.innerText = 'O valor de ativo deve ser informado.'
        return;
    }

    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((response) => {
    response.json().then((data) =>{
        if(data.error){
            mainMensage.innerText = `Alguma coisa deu errado`
            price.innerHTML = `${data.error.mensage} | código ${data.error.code}`
        }else{
            mainMensage.innerText = data.symbol
            price.innerHTML = `PRICE: ${data.price}`
            price_open.innerHTML = `OPEN: ${data.price_open}`
            day_hight.innerHTML = `HIGHT: ${data.day_hight}`
            day_low.innerHTML = `LOW: ${data.day_low}`
        }
    })
})
})