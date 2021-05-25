let navigationbuttons = document.querySelector('#NavigationBarShow i, #NavigationBottom i, #navigationdefault i, #Navigation div i').innerText

$('#NavigationBarShow i, #NavigationBottom i, #navigationdefault i, #Navigation div i').css('cursor', 'default')

$('#NavigationBarShow i, #NavigationBottom i, #navigationdefault i, #Navigation div i').css('user-select', 'none')

$('#NavigationBarShow i, #NavigationBottom i, #navigationdefault i, #Navigation div i').click((e) => {
    switch (e.currentTarget.outerText) {
        case 'home':
            location = "/"
            break;

        case 'article':
            location = "/articles"

            break;
        case 'tips_and_updates':
            location = "/suggestions"
            break;

        case 'build':
            location = "/makeyourown"

            break;

        case 'people':
            location = "/friends"

            break;

        case 'info':
            location = "/about"
            break;
    }
})