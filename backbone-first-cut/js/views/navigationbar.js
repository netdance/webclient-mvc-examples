App.Views.NavigationBar = Backbone.View.extend({
    events: {
        'click .navbar-brand': 'onBrandClick',
        'click #productNavLink': 'onProductClick',
        'click #categoryNavLink': 'onCategoryClick'
    },
    el: '#topnav',
    onBrandClick: function () {
        App.browser.navigate('/home', {
            trigger: true
        });
    },
    onProductClick: function () {
        App.browser.navigate('/products', {
            trigger: true
        });
    },
    onCategoryClick: function () {
        App.browser.navigate('/categories', {
            trigger: true
        });
    }
});
