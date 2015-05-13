/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    }
};

document.addEventListener("deviceready", onDeviceReady, false);




function onDeviceReady(){
    console.log('device ready');
}

$(document).ready(function() {
});



    function dd(id){

        console.log('loadsubstancedetail');
        console.log(id);

        function navigateHome(){
            console.log('navigateHome');
            $(":mobile-pagecontainer").pagecontainer( "change", "#index" );
        }

    }

Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}

function getRoundedNetWeight(number, weightPerUnit){
    exact = parseInt(number) * parseFloat(weightPerUnit);
    rounded = exact.round(4);
    return rounded
}

function getNetWeight(number, weightPerUnit){
    return parseInt(number) * parseFloat(weightPerUnit)
}

function getPointsFromWeight(weight, transportCat){
    if (transportCat == '1'){
        multiplicator = 50;
    }

    if (transportCat == '2'){
        multiplicator = 3;
    }

    if (transportCat == '3'){
        multiplicator = 1;
    }

    return parseFloat(weight) * multiplicator
}

function readDeclarationAsText() {
    totalNetWeight = 0;
    read = function(){
        $.each( declarationjson, function( key, val ) {
                $.ajax({
                    type: 'GET',
                    url: 'http://10.0.1.4:8000/api/substances/' + val.id + '/?format=json',
                    dataType: 'json',
                    data: {},
                    async: false,
                    success: function(data) { 
                        li = '<li>UN ' + data.un + ' ' + data.description + ', ' + data.class_code + ', ' + data.tunnel_code;
                        li = li + '<br><br> Nettovikt: ' + getRoundedNetWeight(val.number, data.net_weight) + ' KG';
                        $('#declarationlist').append(li);
                        totalNetWeight = totalNetWeight + getNetWeight(val.number, data.net_weight);
                    }
                });
        });
        $('#declarationlist').append('<li>Total Nettovikt: ' + totalNetWeight.toString() + ' KG</li>');
        totalPoints = getPointsFromWeight(totalNetWeight, '2').round(4).toString();
        $('#declarationlist').append('<li>Riskpoäng: ' + totalPoints + '</li>');
        $('#declarationlist').listview().listview('refresh');
    };
    $('#declarationlist').empty();
    read();
  };

function fail(error) {
    console.log('ERROR!');
  console.log(error.code);
}

