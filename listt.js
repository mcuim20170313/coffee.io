var a = 0;
var b = 0;
$(function () {
    //$('#input1').datepicker({
    //    dateFormat: 'yymmdd'
    //});
    //$('#input2').datepicker({
    //    dateFormat: 'yymmdd'
    //});

    var today = new Date();
    var tomorrow = new Date(24 * 6 * 60 * 1000);

    $('#input2').datepicker();
    $('#input1').datepicker({
        //minDate: 0, //從今天後日期才可選
        minDate: tomorrow, //從明天日期才可選
        onSelect: function (dat, inst) {
            $('#input2').datepicker('option', 'minDate', dat);
        }
    });

});
$(document).ready(function () {
    const config = {
        apiKey: "AIzaSyCJm2bz1AvJNnYaLn5qz0J0PsLBQObbQbQ",
        authDomain: "test-bfe7d.firebaseapp.com",
        databaseURL: "https://test-bfe7d.firebaseio.com",
        projectId: "test-bfe7d",
        storageBucket: "test-bfe7d.appspot.com",
        messagingSenderId: "402530968567"

    };
    firebase.initializeApp(config);


    //const dbRefObjecta = firebase.database().ref().child("myCoffee/"+title);
    //按鈕
    var searchUserInfoBtn = document.getElementById("searchUserInfoBtn");


    const dbRefObjecta = firebase.database().ref().child("myCoffee/");
    //alert=(preObject.innerText=JSON.stringify(snap.val(),null,3));
      
           dbRefObjecta.once('value', function (snapshot) {
            var data = snapshot.val();
            var list = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key.trim().length > 0) {
                        list.push({
                            key: key
                        })
                    }
                }
            }
               //-----------------------------------
         
            //alert(list[0].key);
            //alert(list[1].key);
            //alert(list[2].key);

            

            // refresh the UI
               //refreshUI(list);
            print(list);
           }




        );

        function refreshUI(listt,list) {
            
            for (var ii = 0; ii < listt.length; ii++) {
              //  if(list[ii].st == sessionStorage.getItem("test")){
                    var num = document.getElementById("mytable").rows.length;
                    var Tr = document.getElementById("mytable").insertRow(num);
                    Td = Tr.insertCell(Tr.cells.length);
                    Td.innerHTML = b;
                    Td = Tr.insertCell(Tr.cells.length);
                    Td.innerHTML = listt[ii].name;
                    Td = Tr.insertCell(Tr.cells.length);
                    Td.innerHTML = listt[ii].da;
                    Td = Tr.insertCell(Tr.cells.length);
                    Td.innerHTML = listt[ii].st;
                    Td = Tr.insertCell(Tr.cells.length);
                    Td.innerHTML = listt[ii].sty;
                    Td = Tr.insertCell(Tr.cells.length);
                    Td.innerHTML = listt[ii].cas;
              //  }
            }
        }

        function print(list)
        {
            
            for (i = 0; i<list.length; i++) {
                b = list[i].key;
                a++;
                const dbRefObjecta = firebase.database().ref().child("myCoffee/" + list[i].key);
                //alert=(preObject.innerText=JSON.stringify(snap.val(),null,3));

                dbRefObjecta.once('value', function (snapshot) {
                    var dataa = snapshot.val();
            var listt = [];
                    for (var keyy in dataa) {
                        if (dataa.hasOwnProperty(keyy)) {
                            coffeeNo = dataa[keyy].coffeeNo ? dataa[keyy].coffeeNo : '';
                            date = dataa[keyy].date ? dataa[keyy].date : '';
                            store = dataa[keyy].store ? dataa[keyy].store : '';
                            quantity = dataa[keyy].quantity ? dataa[keyy].quantity : '';
                            cashier = dataa[keyy].cashier ? dataa[keyy].cashier : '';
                            if (coffeeNo.trim().length > 0) {
                                listt.push({
                                    name: coffeeNo,
                                    da: date,
                                    st: store,
                                    sty: quantity,
                                    cas: cashier,
                                    key: keyy
                                })
                            }
                        }
                    }
                    // refresh the UI

                    for (var ii = 0; ii < listt.length; ii++) {
                        if (listt[ii].st == sessionStorage.getItem("test")) {
                            if (parseInt(sessionStorage.getItem("No1")) <= parseInt(listt[ii].da) && parseInt(listt[ii].da) <= parseInt(sessionStorage.getItem("No2"))) {
                            var num = document.getElementById("mytable").rows.length;
                            var Tr = document.getElementById("mytable").insertRow(num);
                            Td = Tr.insertCell(Tr.cells.length);
                            Td.innerHTML = listt[ii].key;
                            Td = Tr.insertCell(Tr.cells.length);
                            Td.innerHTML = listt[ii].name;
                            Td = Tr.insertCell(Tr.cells.length);
                            Td.innerHTML = listt[ii].da;
                            Td = Tr.insertCell(Tr.cells.length);
                            Td.innerHTML = listt[ii].st;
                            Td = Tr.insertCell(Tr.cells.length);
                            Td.innerHTML = listt[ii].sty;
                            Td = Tr.insertCell(Tr.cells.length);
                            Td.innerHTML = listt[ii].cas;
                            }
                          }
                    }

                    //refreshUI(listt,list);
                });

            }

        }



})


function sea() {
    var start = document.getElementById("input1").value;
    var end = document.getElementById("input2").value;
    sessionStorage.setItem("No1", start);
    sessionStorage.setItem("No2", end);
    window.location.reload();
}