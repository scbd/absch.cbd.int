export default {
    render(h) {
        return h('span', null);
    },

    mounted() {
        var ngContent = this.$slots.default

        var comp = new Vue({ render() { return ngContent } });
        comp.$mount()

        const $compile = this.$ngInjector.get('$compile');
        const $rootScope = this.$ngInjector.get('$rootScope');
        const $scope = $rootScope.$new(true);

        Object.keys(this.$attrs).forEach(key => {

            $scope[key] = this.$attrs[key];

            this.$watch(`$attrs.${key}`, (v) => {
                $scope.$apply(() => {

                    if ($scope[key] === v) return;

                    console.log('vue => ng', v);
                    $scope[key] = v;
                });
            });

            $scope.$watch(`${key}`, (v) => {

                if (this.$attrs[key] === v) return;

                console.log('ng => vue', v);
                this.$emit(`update:${key}`, v)
            });
        })

        const bindFn = $compile(comp.$el);
        const ngElement = bindFn($scope);
        const parent = this.$el.parentElement;
        parent.removeChild(this.$el);
        parent.appendChild(ngElement[0])
    }
}