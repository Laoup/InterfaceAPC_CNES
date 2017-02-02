function makeDoubleDelegate(function1, function2) {
        return function() {
            if (function1)
                function1();
            if (function2)
                function2();
        }
}

function chgeLogo() {
        var imgs=document.getElementsByTagName("img");
        //imgs[0].setAttribute("src","https://apceucliddev.in2p3.fr/codeenDesign/CODEEN_logo1.png");
        imgs[0].setAttribute("src","https://apceucliddev.in2p3.fr/codeenDesign/CODEEN-small.png");
        var header = document.getElementsByClassName("logo");
        var newOnglet = document.createElement("a");
        imgs = document.createElement("img");
        imgs.setAttribute("src", "https://apceuclidjks2.in2p3.fr/CodeenLight/ressources/CodeenLightLogo.png");
        imgs.setAttribute("id", "jenkins-app-icon");
        imgs.setAttribute("alt", "CodeenLightPage");
        imgs.setAttribute("width", "110");
        imgs.setAttribute("height", "34");
        newOnglet.appendChild(imgs);
        newOnglet.setAttribute("id", "jenkins-home-link");
        newOnglet.setAttribute("href", "https://apceuclidjks2.in2p3.fr/CodeenLight/html/main_page.html");
        header[0].appendChild(newOnglet);
}

window.onload = makeDoubleDelegate(window.onload, chgeLogo);
