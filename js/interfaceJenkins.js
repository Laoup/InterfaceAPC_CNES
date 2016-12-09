/*
** JavaScript File 
** Name : interfaceJenkins.js
** Start by: Alban Meurice
** 08/12/2016
*/

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://apceuclidjks2.in2p3.fr/jenkins/api/xml');
xhr.send(null);

if (xhr.status == 200)
{
    alert('C\'est OK');
    var tabName = xhr.responseXML.getElementsByTagName('name');

    var tabHtml = getElementsById('MainTable');

    var addTab = '';
    
    for (var i = 0; i < tabName.length; i++)
    {
	addTab.innerHTML += '<tr><td id="text-center-left">' + tabName[i] + '</td></tr>';
    }

    tabHtml.innerHTML += addTab;
}
else
{
    alert('C\'est pas OK' + xhr.status);
    var pageHtml = document.getElementsByTagName('body');

    pageHtml.innerHTML += '<div><p>An erros is occured during loading xml Jenkins File</p></div>';
}
