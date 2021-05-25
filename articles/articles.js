$('#NavigationBottom span span').hide()

$('#NavigationBottom span').click(() => {
    $('#NavigationBottom span span').show()
})


function getRandomDarkColor() {
    var letters = '0123456A';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

for (article = 0; article < $('.article').length; article++) {
    $('.article .brief')[article].style.backgroundImage = `linear-gradient( ${getRandomDarkColor()}, black)`

}

function getRandomLightColor() {
    var letters = '456BCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}


for (quarter = 0; quarter < $('.article').length; quarter++) {
    $('.quarter')[quarter].style.backgroundColor = getRandomLightColor()

}

$('.detail').hide()

if (window.innerWidth > 940) {


    $('.article .brief').click((e) => {
        const clas = $(e.currentTarget.parentNode).attr('class')

        if (clas == 'article major') {
            $(e.currentTarget.parentNode.children[1]).show()

            $('.brief').hide()
        }
    })
}
else {
    $('.article .brief').click((e) => {
        const clas = $(e.currentTarget.parentNode).attr('class')

        if (clas == 'article minor') {
            $(e.currentTarget.parentNode.children[1]).show()

            $('.brief').hide()

        }

        else if (clas == 'article major') {
            $(e.currentTarget.parentNode.children[1]).show()

            $('.brief').hide()
        }
    })
}

$('.Comment').click((e) => {
    $('.comment span').css('display', 'flex')
})



$('.back').click(() => {
    $('.detail').hide()
    $('.brief').show()

})

$('.showcomments').click((e) => {
    const articlenumber = e.currentTarget.parentNode.parentNode.parentNode.id

    let commentdisplay = $('#' + articlenumber + ' .comments')

    commentdisplay.show()
})

$('.CommentContent').on('keydown', (e) => {
    if (event.key == 'Enter') {
        const articlenumber = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.id

        let comment = document.querySelector('.' + e.currentTarget.classList[1]).value

        
        document.querySelector('#' + articlenumber + ' #displaycomments').innerHTML += `<div> ${comment} </div>`
        
        var commentdiv = document.querySelector(`#${articlenumber} #displaycomments`);
        commentdiv.scrollTop = commentdiv.scrollHeight;
        
        comment = {
            content: comment,
            id: e.currentTarget.classList[1]
        }
        
        
        fetch('/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment),
        })
        
        console.log(comment)
        document.querySelector('#' + articlenumber + ' .CommentContent').value = ''

    }
})

$('.CommentButton').click((e) => {
    const articlenumber = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.id

    console.log(articlenumber)
    console.log(e)

    let comment = document.querySelector('#' + articlenumber + ' .CommentContent').value

    console.log(comment)

    document.querySelector('#' + articlenumber + ' #displaycomments').innerHTML += `<div> ${comment} </div>`

    var commentdiv = document.querySelector(`#${articlenumber} #displaycomments`);
    commentdiv.scrollTop = commentdiv.scrollHeight;

    comment = {
        content: comment,
        id: e.target.id
    }


    fetch('/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment),
    })

    document.querySelector('#' + articlenumber + ' .CommentContent').value = ''


})




$('.commentsection ~ *').click(() => {
    $('.comments').hide()
})

$('#NavigationBottom ~ *').click(() => {
    $('#NavigationBottom span span').hide()
})


$('.article:first-child').addClass('major')
$('.article:first-child').removeClass('minor')
let articles = document.getElementsByClassName('article')

// $('.article #brief #content:first-child').addClass('major')
// $('.article #brief #content:first-child').removeClass('minor')
let articlenumber = articles.length
let i = 0;

if (window.innerWidth > 1220 + 20) {
    $(window).on('wheel', (e) => {

        const scroll = e.originalEvent.deltaY
        if (scroll > 0) {
            if (i < articlenumber - 1 || i == articlenumber && i > 0) {
                ++i
                $(articles[i]).addClass('major')
                $(articles[i]).removeClass('minor')

                $(articles[i - 1]).removeClass('major')
                $(articles[i - 1]).addClass('minor')
                $(articles[i - 1]).addClass('scrolled')
            }
        }

        if (scroll < 0) {
            if (i < articlenumber + 2 && i > 0) {
                --i
                $(articles[i + 1]).removeClass('major')
                $(articles[i + 1]).addClass('minor')
                // $(articles[i + 1]).addClass('toscroll')

                $(articles[i]).addClass('major')
                $(articles[i]).removeClass('minor')
                $(articles[i + 1]).removeClass('scrolled')
                $(articles[i]).removeClass('scrolled')
            }
        }
    })

}