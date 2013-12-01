App.Views.MainAnchor = Backbone.View.extend({
    $child: null,
    landing: null,  // special case for cached landing page
    el: '#mainAnchorPoint',
    intialize: function() {
        console.log('initializing mainanchor');
        this.bindAll(this, 'render', 'showLanding');
    },
    render: function(options) {
        console.log('rendering main anchor');
        if (options.$child) {
            if (this.$child === this.landing) {
                this.landing.$el.hide();
            } else if (this.$child) {
                this.$child.trigger('change');
                this.$child.remove();
            }
            this.$child = options.$child;
            if (this.$child === this.landing) {
                this.landing.$el.show();
            } else {
                this.$child.insert();
            }
        }
        return this;
    },
    showLanding: function() {
        if (!this.landing) {
            this.landing = new App.Views.Landing({
                $container: this.$el
            });
            this.landing.render();
        }
        this.render({
            $child: this.landing
        });
    }
});