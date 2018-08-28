// ==UserScript==
// @name yandex-clean-search
// @description Script for automatically complete of user search with filter to ignore spam-sites at Yandex search
// @author Barbaresk
// @version  0.1
// @include https://yandex.ru/*
// @include https://ya.ru/*
// @include https://www.yandex.ru/*
// @include https://www.ya.ru/*
// @include http://yandex.ru/*
// @include http://ya.ru/*
// @include http://www.yandex.ru/*
// @include http://www.ya.ru/*
// ==/UserScript==

//расстрельный список
var hitList = [
  "qaru", //qaru.site - most hated site :)
  "programmerz", //programmerz.ru
  "4answered", //4answered.com
  //"code-examples", //code-examples.net //not worked ('-', '.' - unsupported at Yandex search)
  "askdev", //askdev.info
  "harness", //code.i-harness.com
  "exceptionshub", //exceptionshub.com
  "downloadkb", //downloadkb.com
  "w3cgeek", //w3cgeek.com
  "quabr", //quabr.com
  "cpume", //cpume.com
  "javascriptes", //ru.javascriptes.com
  "codedump", //codedump.io
  "wekeepcoding", //javascript.wekeepcooding.com
  "dskims", //dskims.com
  "howcanfix", //howcanfix.com
  "questionfocus", //questionfocus.com
  "codesd", //codesd.com
  "techforumnetwork", //techforumnetwork.com
  "devhelping", //jquery.devhelping.com
  "kavaoil", //kavaoil.com
  "bighow", //bighow.org
  "codeday", //codeday.me
  //"e-learn", //www.e-learn.cn
  "codewenda", //codewenda.com
  "itdaan", //itdaan.com
];

var pattern = "";

function makePattern(hitList)
{
  var p = "";
  for(var i = 0; i < hitList.length; ++i){
    p += " -\"" + hitList[i] + "\""; //"" - is important (in "" 4answered - is one word)
  }
  return p;
}

function main(pattern) {
  var searchField = document.getElementById('text'); //for main page
  if (searchField == null){
    searchField = document.querySelector('span.input__box input'); //for other pages
  }
  if (searchField == null) {
    searchField = document.querySelector('input.mini-suggest__input'); //for mobile version
  }
  if(searchField != null){
    searchField.onfocus = function() { 
      searchField.value = searchField.value.replace(pattern, ''); 
    }
		searchField.onchange = function() { 
      searchField.value = searchField.value + pattern; 
    }  
  }
}

pattern = makePattern(hitList);
main(pattern);