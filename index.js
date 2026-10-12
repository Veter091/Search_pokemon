document.addEventListener('DOMContentLoaded', function() {

    // Нахождение элементов на странице
    const searchContainer = document.querySelector('.search-container')
    const searchInput = document.querySelector('.search-input')
    const searchButton = document.querySelector('.search-button')
    const searchContent = document.querySelector('.search-content')



    // Функция для запроса покемона
    function fetchPokemon(name) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(responce => {
                if (!responce.ok) {
                    searchContent.innerHTML = `
                    <div class="content-error">Ошибка загрузки покемона</div>
                    `
                    throw new Error('Ошибка загрузки покемона')
                }

                return responce.json()
            })
    }


    searchContainer.addEventListener('click', function(e) {
        
        if (!e.target.closest('.search-button')) return 

        let inputValue = searchInput.value.trim()

        if (!inputValue) return 

        fetchPokemon(inputValue)
            .then(result => {
                searchContent.innerHTML = `
                <div class="content-title">${result.name}</div>
                <img class="content-img" src="${result.sprites.front_default}">
                <div class="content-description">Характеристики</div>
                <div class="content-weight">Вес: ${result.weight / 10} кг</div>
                <div class="content-height">Рост: ${result.height / 10} м</div>
                <div class="content-id">ID: ${result.id}</div>
                <div class="content-type">Типы: ${result.types.map(elem => elem.type.name).join(', ')}</div>
                `
                console.log(result)
            })
            .catch(error => console.error('Ошибка', error))

        
    })


})