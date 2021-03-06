'use strict';

angular.module('myApp.tournamentCreateView',['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/createtournament', {
            templateUrl: 'templates/tournament/createTournament.html',
            controller: 'TournamentCreateCtrl',
            controllerAs: 'tCtrl',
            resolve: {
                // controller will not be loaded until $waitForSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $waitForSignIn returns a promise so the resolve waits for it to complete
                    return Auth.$requireSignIn();
                }]
            }
        });
    }])

    .controller('TournamentCreateCtrl', TournamentCreateCtrl);

TournamentCreateCtrl.$inject = ['tournamentFactory','currentAuth'];

function TournamentCreateCtrl(tournamentFactory,currentAuth) {
    var vm = this;

    //**Var declarations**//
    vm.tabs = [];
    vm.active = 0;


    vm.tabs.tab1 = true;
    vm.tabs.tab2 = true;
    vm.tabs.tab3 = true;
    vm.tournament = tournamentFactory.getTournament();
    vm.tournament.name = '';
    vm.tournament.disciplines = [];
    vm.player = tournamentFactory.getPlayer();
    vm.players = tournamentFactory.getPlayers();
    vm.team = tournamentFactory.getTeam();
    vm.teams = tournamentFactory.getTeams();


    //**Function declarations**//
    vm.createTournament = createTournament;
    vm.addPlayer = addPlayer;
    vm.addDiscipline = addDiscipline;
    vm.nextAndSave = nextAndSave;
    vm.addTeam = addTeam;

    //**Functions**//
    function addDiscipline(discipline) {
        tournamentFactory.addDiscipline(discipline);
    }

    function createTournament(form) {
        if (form.$valid) {
            vm.tabs.tab1 = false;
            tournamentFactory.createTournament(vm.tournament);
            vm.active = 1;
        }
    }

    function addPlayer(player) {
        if (vm.player != undefined) {
            console.log('hit this');
            tournamentFactory.addPlayer(player);
            vm.player = undefined;
        }

    }
    function addTeam(team){
        console.log('hit this');
        if (vm.team!=undefined){
            tournamentFactory.addTeam(team);
            console.log(team);
            vm.team = undefined;
        }
    }

    function nextAndSave(){
        vm.active = 2;
        vm.tabs.tab2 = false;
        tournamentFactory.savePlayerList(vm.players);
    }


};