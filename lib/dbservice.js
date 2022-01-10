export class dbservice{

    GetItems(){
        let list = JSON.parse(localStorage.getItem('items'));
        
        return list;


    }

    AddItem(name){
        let list = JSON.parse(localStorage.getItem('items'));

        list.push(name);

        localStorage.setItem('items', JSON.stringify(list));

    }
    DeleteItem(name){
        let list = JSON.parse(localStorage.getItem('items'));
        
        var index = list.indexOf(name);
        if (index !== -1) {
            $scope.items.splice(index, 1);
        }

        localStorage.setItem('items', JSON.stringify(list));


    }
}


// function Read(){
//     $http.get('db.json').then(function (datafromjson){
//         data = datafromjson;
//         console.log(data);
//     });
