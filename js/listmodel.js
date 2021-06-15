var contentList = [
    { 'content_title': 'Belle Epoque', 'img_src': '/modeles/pixels/belle-epoque.png', 'target_dir': '' },
    { 'content_title': 'Croisillon Azur', 'img_src': '/modeles/pixels/croisillon-azur.png', 'target_dir': '' },
    { 'content_title': 'La Rochelle Rouge', 'img_src': '/modeles/pixels/echoppe.png', 'target_dir': '' },

];

var folders = [
    { 'title': 'Carreaux 20px 20px', 'img_src': '/modeles/pixels/belle-epoque.png' },
    { 'title': 'Frise 20px 10px', 'img_src': '/modeles/pixels/croisillon-azur.png' },
    { 'title': 'Angle 15px 15px', 'img_src': '/modeles/pixels/echoppe.png' }
]

var both = [
    { 'title': 'Belle Epoque', 'img_grid': '/modeles/belle-epoque.png', 'img_pixel': '/modeles/pixels/belle-epoque.png' },
    { 'title': 'Croisillon Azur', 'img_grid': '/modeles/croisillon-azur.png', 'img_pixel': '/modeles/pixels/croisillon-azur.png' },
    { 'title': 'La Rochelle Rouge', 'img_grid': '/modeles/la-rochelle-rouge.png', 'img_pixel': '/modeles/pixels/la-rochelle-rouge.png' },
    { 'title': 'Angle Echoppe', 'img_grid': '/modeles/echoppe.png', 'img_pixel': '/modeles/pixels/echoppe.png' },
    { 'title': 'Moselle', 'img_grid': '/modeles/moselle.png', 'img_pixel': '/modeles/pixels/moselle.png' }
]

var htmlStr = ''; // declare' a variable which will hold the html for list
for (var j = 0; j < folders.length; j++) {
    htmlStr += "<folder><img class='mine' src='" + folders[j].img_src + "'/>" + folders[j].title + "</folder>";
    for (var i = 0; i < contentList.length; i++) // create a loop to loop through contentList
    {

        htmlStr += "<ul><img class='mine' src='" + contentList[i].img_src + "'/>" + contentList[i].content_title + "</ul>";
    }
}




document.getElementById('container').innerHTML = htmlStr;