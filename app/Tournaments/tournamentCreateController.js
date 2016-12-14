'use strict';

angular.module('myApp.tournamentView')

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/createtournament', {
            templateUrl: 'templates/tournament/createTournament.html',
            controller: 'TournamentCreateCtrl',
            controllerAs: 'tCtrl'
        });
    }])

    .controller('TournamentCreateCtrl', TournamentCreateCtrl);

TournamentCtrl.$inject = ['tournamentFactory'];

function TournamentCreateCtrl(tournamentFactory) {
    var vm = this;

    //**Var declarations**//

    vm.tournament = tournamentFactory.getTournament();
    vm.tournament.name = '';
    vm.tournament.disciplines = [];
    vm.player = {};
    vm.players = tournamentFactory.getPlayers();




    //**Function declarations**//
    vm.createTournament = createTournament;
    vm.addPlayer = addPlayer;
    vm.alerts = alerts;

    //**Functions**//
    function addDiscipline(discipline){
    alert(discipline);
    }

    function createTournament() {

    }

    function addPlayer(player){
        tournamentFactory.addPlayer(player);

        vm.player = {};
    }




};