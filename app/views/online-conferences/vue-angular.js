import { camelCase } from "lodash";
const angular = window.angular;

export default {
    render(h) {
        return h('span', null);
    },
    mounted() {

        const $parentScope = angular.element(this.$el).parents('.ng-scope:first')?.scope() 
                          || this.$ngInjector.get('$rootScope');

        const $scope = $parentScope.$new(true);
        this.$scope  = $scope;

        Object.keys(this.$attrs).forEach(attrKey => {

            const propKey = camelCase(attrKey);

            console.log(`vue(ng): initial set vue => ng (${propKey}):`, this.$attrs[attrKey]);

            $scope[propKey] = this.$attrs[attrKey];


            // From Vue => Angular
            this.$watch(`$attrs.${attrKey}`, (v) => {

                if($scope.$$destroyed) return;

                safeApply($scope, () => {

                    if ($scope[propKey] === v) return;

                    console.log(`vue(ng): vue => ng (${propKey})`, v);
                    $scope[propKey] = v;
                });
            });

            // From Angular => Vue
            $scope.$watch(`${propKey}`, (v) => {

                if (this.$attrs[attrKey] === v) return;

                console.log(`vue(ng): ng => vue (${propKey})`, v);
                this.$emit(`update:${propKey}`, v)
            });
        })

        const $compile    = this.$ngInjector.get('$compile');
        const domElement  = vNodeToDomElement(this.$slots.default); // convert default slot to domElement
        const bindFn      = $compile(domElement);
        const[ngElement]  = bindFn($scope); //Bind to scope

        //Replace this component wrapper (this.$el) in the dom with the angular one (ngElement) 
        this.$el.parentElement.replaceChild(ngElement, this.$el);
    },
    beforeDestroy() {
        
        const { $scope } = this;

        console.log('vue(ng): beforeDestroy', $scope)
        
        if($scope) {
            delete this.$scope;
            $scope.$destroy()
        }
    }
}

function safeApply($scope, fn)
{
    var phase = $scope.$root.$$phase;

    if (phase == '$apply' || phase == '$digest') {
        fn();
    } else {
        $scope.$apply(fn);
    }
};

function vNodeToDomElement(vnode) {

    const comp = new Vue({ render: ()=>vnode }); // create a dummy component that return the vnode from the render fn

    comp.$mount() // Mount as an orphan component

    const domElement = comp.$el; // Save the native DOM Element converted from VNode;

    comp.$destroy();

    return domElement;
}