/*
** JavaScript File 
** Name : interfaceJenkins.js
** Start by: Alban Meurice
** 08/12/2016
*/

var texte = load('filejenkins.xml')

var tabName = getElementsByTagName('name');

var tabHtml = getElementsById('MainTable');

var addTab = '';

alert('size = ' + tabName.length);

for (var i = 0; i < tabName.length; i++)
{
    if (i === 0)
	alert('it\'s okay');
    addTab.innerHTML += '<tr><td id="text-center-left">' + tabName[i] + '</td></tr>';
}

tabHtml.innerHTML += addTab;