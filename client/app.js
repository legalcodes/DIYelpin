angular.module('yelpin', ['ui.router', 'yelpin.postList'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('signin', {
      templateUrl: 'Authentication/signin.html',
      url: '/signin',
      controller: 'signinController',
    })
    .state('signup', {
      templateUrl: 'Authentication/signup.html',
      url: '/signup',
      controller: 'signUpController',
    })
    .state('createPost', {
      templateUrl: 'CreatePost/createPost.html',
      url: '/createPost',
      controller: 'createPostController',
    })
    .state('postList', {
      templateUrl: 'PostList/postList.html',
      url: '/postList',
      controller: 'postListController',
    });

  $urlRouterProvider.otherwise('/postList');

});